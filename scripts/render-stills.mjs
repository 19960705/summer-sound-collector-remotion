import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

await mkdir('out/stills',{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const inputProps={sound:false};
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE;
const composition=await selectComposition({serveUrl,id:'SummerSoundCollector',inputProps,browserExecutable});
for(const second of [1,3.7,5.5,9,13.5,16.7,19.6,22,26.5,29.7,32.5,35.8]) {
  await renderStill({serveUrl,composition,inputProps,browserExecutable,output:`out/stills/${String(second).padStart(4,'0')}.png`,frame:Math.round(second*30),scale:.6});
  console.log(`Verified still at ${second}s`);
}
