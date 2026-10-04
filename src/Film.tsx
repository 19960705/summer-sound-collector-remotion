import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, cancelRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import '@fontsource/gaegu/400.css';
import '@fontsource/mr-de-haviland/400.css';
import '@fontsource/zen-kurenaido/400.css';
import {C, Definitions} from './art';
import {SHOTS} from './timing';
import {Greeting, LeafCard, PostalRoute, Airmail, AutumnTree, Maple, Stamps, Letter, Assembly, Hero, Endcard, Signoff} from './scenes';

const components = [Greeting,LeafCard,PostalRoute,Airmail,AutumnTree,Maple,Stamps,Letter,Assembly,Hero,Endcard,Signoff];

export const Film: React.FC<{sound:boolean}> = ({sound}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=frame/fps;
  const [fontHandle]=useState(()=>delayRender('Loading bundled handwriting fonts'));
  useEffect(()=>{
    Promise.all([
      document.fonts.load('40px "Gaegu"','AUTUMN POST'),
      document.fonts.load('40px "Mr De Haviland"','a letter.'),
      document.fonts.load('40px "Zen Kurenaido"','秋'),
    ]).then(()=>continueRender(fontHandle)).catch(cancelRender);
  },[fontHandle]);
  const index=SHOTS.findIndex(s=>t>=s.start&&t<s.end);
  const i=index<0?SHOTS.length-1:index;
  const Scene=components[i];
  return <AbsoluteFill style={{backgroundColor:C.paper}}>
    <svg width="100%" height="100%" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
      <Definitions/>
      <rect width="1280" height="720" fill={C.paper}/>
      <Scene t={t-SHOTS[i].start}/>
      <rect width="1280" height="720" fill="transparent" filter="url(#paper)" style={{mixBlendMode:'multiply',pointerEvents:'none'}}/>
    </svg>
    {sound && <Audio src={staticFile('audio/letters-in-october.m4a')}/>}
  </AbsoluteFill>;
};
