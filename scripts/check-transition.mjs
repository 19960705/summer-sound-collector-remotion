import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const inputProps={sound:false};
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE;
const composition=await selectComposition({serveUrl,id:'AutumnPostOffice',inputProps,browserExecutable});
await mkdir('out/transition-check',{recursive:true});
for(const frame of [750,780,810,840,855,863,864,865,870]) {
 await renderStill({serveUrl,composition,inputProps,browserExecutable,frame,scale:.6,output:`out/transition-check/${frame}.png`});
}
// The assembled object must persist unchanged across the scene handoff at 28.8s.
const a=await readFile('out/transition-check/863.png');
const b=await readFile('out/transition-check/864.png');
assert.ok(a.equals(b),'Mailbox scene handoff introduced a visual discontinuity');
await writeFile('out/transition-check/result.json',JSON.stringify({boundarySeconds:28.8,frames:[863,864],pixelIdentical:true},null,2)+'\n');
console.log('PASS: frame 863 and frame 864 are identical across the mailbox handoff.');
