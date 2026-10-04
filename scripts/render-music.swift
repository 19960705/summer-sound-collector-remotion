import Foundation
import AVFoundation
import AudioToolbox

struct Note: Decodable { let at: Double; let duration: Double; let pitch: UInt8; let velocity: UInt8; let part: Int }
struct Score: Decodable { let duration: Double; let notes: [Note] }
struct Event { let frame: AVAudioFramePosition; let pitch: UInt8; let velocity: UInt8; let part: Int; let on: Bool }
let args = CommandLine.arguments
if args.count != 3 { fatalError("Usage: swift scripts/render-music.swift score.json output.wav") }
let score = try JSONDecoder().decode(Score.self, from: Data(contentsOf: URL(fileURLWithPath: args[1])))
let bank = URL(fileURLWithPath: "/System/Library/Components/CoreAudio.component/Contents/Resources/gs_instruments.dls")
guard FileManager.default.fileExists(atPath: bank.path) else { fatalError("macOS system instrument bank is required to regenerate music. The delivered WAV works on all platforms.") }
let rate = 44100.0
let format = AVAudioFormat(standardFormatWithSampleRate: rate, channels: 2)!
let engine = AVAudioEngine()
let reverb = AVAudioUnitReverb()
engine.attach(reverb)
reverb.loadFactoryPreset(.mediumHall)
reverb.wetDryMix = 14
let mixer = AVAudioMixerNode()
engine.attach(mixer)
engine.connect(mixer, to: reverb, format: format)
engine.connect(reverb, to: engine.mainMixerNode, format: format)
let programs: [UInt8] = [0,12,45,48]
let volumes: [Float] = [0.7,0.62,0.32,0.21]
let pans: [Float] = [-0.18,0.2,0.3,-0.32]
var samplers: [AVAudioUnitSampler] = []
for i in 0..<programs.count {
 let sampler = AVAudioUnitSampler()
 engine.attach(sampler)
 try sampler.loadSoundBankInstrument(at: bank, program: programs[i], bankMSB: UInt8(kAUSampler_DefaultMelodicBankMSB), bankLSB: 0)
 let channel = AVAudioMixerNode()
 engine.attach(channel)
 engine.connect(sampler, to: channel, format: format)
 engine.connect(channel, to: mixer, format: format)
 channel.outputVolume = volumes[i]
 channel.pan = pans[i]
 samplers.append(sampler)
}
var events: [Event] = []
for n in score.notes {
 events.append(Event(frame: Int64(n.at*rate), pitch:n.pitch, velocity:n.velocity, part:n.part, on:true))
 events.append(Event(frame: Int64((n.at+n.duration)*rate), pitch:n.pitch, velocity:0, part:n.part, on:false))
}
events.sort { $0.frame == $1.frame ? (!$0.on && $1.on) : $0.frame < $1.frame }
try engine.enableManualRenderingMode(.offline, format: format, maximumFrameCount: 1024)
try engine.start()
let file = try AVAudioFile(forWriting: URL(fileURLWithPath:args[2]), settings:format.settings)
let buffer = AVAudioPCMBuffer(pcmFormat:format, frameCapacity:1024)!
let end = Int64(score.duration*rate)
var index = 0
var retries = 0
while engine.manualRenderingSampleTime < end {
 let now = engine.manualRenderingSampleTime
 while index < events.count && events[index].frame <= now {
  let e = events[index]
  if e.on { samplers[e.part].startNote(e.pitch, withVelocity:e.velocity, onChannel:0) }
  else { samplers[e.part].stopNote(e.pitch, onChannel:0) }
  index += 1
 }
 let next = index < events.count ? events[index].frame : end
 let count = AVAudioFrameCount(min(Int64(1024), end-now, max(Int64(1),next-now)))
 let status = try engine.renderOffline(count,to:buffer)
 switch status {
 case .success: try file.write(from:buffer); retries = 0
 case .cannotDoInCurrentContext, .insufficientDataFromInputNode:
  retries += 1; if retries > 100 { fatalError("Offline renderer stalled") }
 case .error: fatalError("Offline rendering failed")
 @unknown default: fatalError("Unknown render status")
 }
}
engine.stop()
print("Rendered local score: \(score.notes.count) notes, \(score.duration)s, 44.1kHz stereo")
