import React from 'react';
import {range} from './timing';

export const C = {paper:'#f5ecdc', ink:'#45332c', rust:'#bc593c', wine:'#752f40', ochre:'#bd884c', blush:'#dbb8a1', cream:'#ffefd0'};

export const Definitions = () => <defs>
  <linearGradient id="terracotta" x2=".25" y2="1"><stop stopColor="#e4bea0"/><stop offset=".5" stopColor="#cd8d63"/><stop offset="1" stopColor="#af4e35"/></linearGradient>
  <linearGradient id="airmail"><stop stopColor="#dec5a6"/><stop offset=".45" stopColor="#b57453"/><stop offset="1" stopColor="#713347"/></linearGradient>
  <linearGradient id="burgundy" x2=".7" y2="1"><stop stopColor="#c17d69"/><stop offset=".5" stopColor="#974654"/><stop offset="1" stopColor="#542b39"/></linearGradient>
  <linearGradient id="mailboxPaint" gradientUnits="userSpaceOnUse" x1="-90" y1="-198" x2="90" y2="168"><stop stopColor="#c17d69"/><stop offset=".5" stopColor="#974654"/><stop offset="1" stopColor="#542b39"/></linearGradient>
  <linearGradient id="parchment" x2=".2" y2="1"><stop stopColor="#f6dfb7"/><stop offset="1" stopColor="#d8ae7a"/></linearGradient>
  <linearGradient id="leaf" x2=".2" y2="1"><stop stopColor="#e4ba79"/><stop offset=".4" stopColor="#c66d39"/><stop offset="1" stopColor="#923a35"/></linearGradient>
  <radialGradient id="halo"><stop stopColor="#ca855c" stopOpacity=".3"/><stop offset="1" stopColor="#ecd7b7" stopOpacity="0"/></radialGradient>
  <radialGradient id="sunwash"><stop stopColor="#d9b078" stopOpacity=".3"/><stop offset="1" stopColor="#ecd7b7" stopOpacity="0"/></radialGradient>
  <filter id="paint" x="-12%" y="-15%" width="124%" height="130%" colorInterpolationFilters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".032" numOctaves="4" seed="12" result="cloud"/>
    <feColorMatrix in="cloud" type="saturate" values="0"/>
    <feComponentTransfer result="wash"><feFuncR type="table" tableValues=".25 .35 .64 .97 1"/><feFuncG type="table" tableValues=".25 .35 .64 .97 1"/><feFuncB type="table" tableValues=".25 .35 .64 .97 1"/><feFuncA type="linear" slope=".6"/></feComponentTransfer>
    <feBlend in="SourceGraphic" in2="wash" mode="screen" result="mottled"/>
    <feComposite in="mottled" in2="SourceGraphic" operator="in" result="colored"/>
    <feTurbulence type="fractalNoise" baseFrequency=".37" numOctaves="3" seed="8" result="grain"/>
    <feDisplacementMap in="colored" in2="grain" scale="7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="rough" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="42"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".055"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
</defs>;

export const MapleLeaf = ({x=0,y=0,s=1,angle=0,fill='url(#leaf)'}:{x?:number;y?:number;s?:number;angle?:number;fill?:string}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <path d="M0 -116 L18 -69 L38 -80 L34 -36 L76 -65 L70 -24 L100 -20 L72 5 L81 30 L28 34 L5 59 L-5 59 L-27 34 L-80 30 L-72 5 L-100 -20 L-70 -24 L-76 -65 L-34 -36 L-38 -80 L-18 -69Z" fill={fill} filter="url(#paint)"/>
  <path d="M0 -88 V90 M0 24 L-57 -7 M0 24 L57 -7 M0 4 L-32 -42 M0 4 L32 -42" fill="none" stroke="#f3c797" strokeWidth="2.5" opacity=".7"/>
</g>;

export const Envelope = ({x=0,y=0,s=1,angle=0,fill=C.cream,seal=true}:{x?:number;y?:number;s?:number;angle?:number;fill?:string;seal?:boolean}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <rect x="-92" y="-58" width="184" height="116" rx="3" fill={fill} filter="url(#paint)"/>
  <path d="M-91 56 L0 -8 L91 56 M-91 -57 L0 13 L91 -57" fill="none" stroke={C.ochre} strokeWidth="2" filter="url(#rough)"/>
  {seal && <><circle cy="13" r="14" fill={C.wine}/><path d="M-5 9 L0 19 L6 6" stroke={C.cream} strokeWidth="1.5" fill="none"/></>}
</g>;

export const PaperPlane = ({x=0,y=0,s=1,angle=0,fill=C.cream}:{x?:number;y?:number;s?:number;angle?:number;fill?:string}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <path d="M-62 -31 L65 0 L-54 35 L-23 3Z" fill={fill}/>
  <path d="M-23 3 L65 0 L-34 18 L-32 37 L-13 16" fill={C.blush}/>
  <path d="M-62 -31 L-23 3 L65 0" fill="none" stroke={C.ochre} strokeWidth="1.2"/>
</g>;

export const Stamp = ({x=0,y=0,s=1,angle=0,label='POST',fill=C.wine}:{x?:number;y?:number;s?:number;angle?:number;label?:string;fill?:string}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <rect x="-70" y="-88" width="140" height="176" fill={C.cream} stroke={C.cream} strokeWidth="9" strokeDasharray="4 9"/>
  <rect x="-58" y="-76" width="116" height="152" fill={fill} filter="url(#paint)"/>
  <MapleLeaf y={-9} s={.38} fill={C.cream}/>
  <text y="57" textAnchor="middle" fill={C.cream} fontFamily="Gaegu" fontSize="23">{label}</text>
</g>;

export const Branch = ({x,y,s=1,angle=0,t=0}:{x:number;y:number;s?:number;angle?:number;t?:number}) => <g transform={`translate(${x} ${y}) scale(${s}) rotate(${angle})`}>
  <path d="M0 220 Q-12 48 15 -118 M1 86 Q-87 20 -129 -45 M7 26 Q78 -25 111 -98 M-2 119 Q61 93 105 27" stroke={C.ink} strokeWidth="7" fill="none" filter="url(#rough)"/>
  {[[-133,-51,-35],[-80,5,-65],[14,-123,12],[112,-102,49],[66,-32,35],[104,29,70]].map(([lx,ly,a],i)=><MapleLeaf key={i} x={lx} y={ly} s={.48} angle={a+Math.sin(t*1.5+i)*6} fill={i%2?'url(#leaf)':C.wine}/>)}
</g>;

export const WaxSeal = ({x=0,y=0,s=1,angle=0}:{x?:number;y?:number;s?:number;angle?:number}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <path d={range(40).map(i=>{const a=i*Math.PI/20,r=i%2?77:85;return `${i?'L':'M'}${Math.cos(a)*r} ${Math.sin(a)*r}`;}).join(' ')+'Z'} fill="url(#burgundy)" filter="url(#paint)"/>
  <circle r="63" fill="none" stroke="#d5a183" strokeWidth="2"/>
  <MapleLeaf y={9} s={.42} fill="#ddb494"/>
</g>;

export const Mailbox = ({x,y,s=1,t=0,detail=1,assembly=1}:{x:number;y:number;s?:number;t?:number;detail?:number;assembly?:number}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="175" rx="123" ry="16" fill={C.ink} opacity={.1*assembly}/>
  {/* The same two silhouettes persist through assembly and the finished shot. */}
  <g transform={`translate(0 ${(1-assembly)*80})`}>
    <rect x="-96" y="-98" width="192" height="248" fill="url(#mailboxPaint)" filter="url(#paint)"/>
  </g>
  <g transform={`translate(${-(1-assembly)*170} ${(1-assembly)*100})`}>
    <path d="M-96 -94 V-98 Q-96 -198 0 -198 Q96 -198 96 -98 V-94Z" fill="url(#mailboxPaint)" filter="url(#paint)"/>
  </g>
  <path d="M52 -175 Q96 -157 96 -98 V150 H61 V-103 Q61 -150 52 -175Z" fill={C.ink} opacity={.28*detail}/>
  <rect x="-108" y="147" width="215" height="21" rx="4" fill={C.ink} opacity={detail}/>
  <g opacity={detail}>
    <path d="M-71 -105 H70" stroke={C.ink} strokeWidth="17" strokeLinecap="round"/>
    <path d="M-69 -116 H67" stroke={C.ochre} strokeWidth="4"/>
    <text y="-47" textAnchor="middle" fill={C.cream} fontFamily="Gaegu" fontSize="37" letterSpacing="5">POST</text>
    <rect x="-64" y="-18" width="128" height="132" rx="5" fill="none" stroke={C.ochre} strokeWidth="2"/>
    <rect x="-46" y="2" width="92" height="62" fill={C.cream}/>
    <text y="23" textAnchor="middle" fill={C.wine} fontFamily="Gaegu" fontSize="13">AUTUMN MAIL</text>
    <path d="M-29 37 H29 M-29 46 H18" stroke={C.ochre} strokeWidth="2"/>
    <circle cx="47" cy="84" r="5" fill={C.ochre}/>
    <MapleLeaf x={0} y={-153} s={.19} fill={C.cream}/>
  </g>
  <g transform={`translate(0 ${-143+10*Math.sin(t*1.4)})`} opacity={detail}><Envelope s={.52} angle={-7+Math.sin(t)*3} seal={false}/></g>
</g>;
