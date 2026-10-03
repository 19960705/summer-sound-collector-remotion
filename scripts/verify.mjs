import {execFileSync} from 'node:child_process';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const target='out/summer-sound-collector.mp4';
if(!existsSync(target)) throw new Error('Render the film first: npm run render');
const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_format','-show_streams','-of','json',target],{encoding:'utf8'}));
const video=info.streams.find(s=>s.codec_type==='video');
const audio=info.streams.find(s=>s.codec_type==='audio');
if(video.width!==1920||video.height!==1080) throw new Error('Expected full HD render');
if(video.r_frame_rate!=='30/1') throw new Error('Expected 30 fps');
// FFprobe calls full-range 8-bit 4:2:0 "yuvj420p"; both are valid H.264 outputs.
if(video.codec_name!=='h264'||!['yuv420p','yuvj420p'].includes(video.pix_fmt)) throw new Error('Expected compatible 8-bit H.264 4:2:0');
if(Math.abs(Number(info.format.duration)-37.1)>.12) throw new Error('Unexpected duration');
if(!audio||audio.codec_name!=='aac') throw new Error('AAC audio missing');
execFileSync('ffmpeg',['-v','error','-xerror','-i',target,'-f','null','-'],{stdio:['ignore','pipe','pipe']});
const report={file:target,width:video.width,height:video.height,fps:video.r_frame_rate,duration:Number(info.format.duration),frames:Number(video.nb_frames),video:video.codec_name,pixelFormat:video.pix_fmt,colorRange:video.color_range,audio:audio.codec_name,fullDecode:'passed',sha256:createHash('sha256').update(readFileSync(target)).digest('hex')};
mkdirSync('out',{recursive:true});
writeFileSync('out/verification.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
