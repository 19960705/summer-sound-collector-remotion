import React from 'react';
import {range, rand} from './timing';

export const C = {paper:'#faf9ef', mint:'#59d8b9', aqua:'#14cbb8', blue:'#228cbd', navy:'#28284b', coral:'#ed9098', yellow:'#f4d657'};

export const Definitions = () => <defs>
  <linearGradient id="mint" x1="0" y1="0" x2=".3" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#b7ead0"/><stop offset=".5" stopColor="#79e2c4"/><stop offset="1" stopColor="#1dc9b7"/></linearGradient>
  <linearGradient id="sea"><stop stopColor="#bbece1"/><stop offset=".38" stopColor="#76c6e2"/><stop offset="1" stopColor="#173996"/></linearGradient>
  <linearGradient id="night" x1="0" y1="0" x2=".75" y2="1"><stop stopColor="#7ce5de"/><stop offset=".45" stopColor="#7cb6dd"/><stop offset="1" stopColor="#31219a"/></linearGradient>
  <linearGradient id="pink" x2=".1" y2="1"><stop stopColor="#f9ddc6"/><stop offset=".45" stopColor="#f3a4ad"/><stop offset="1" stopColor="#df6c91"/></linearGradient>
  <linearGradient id="petal" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#168dcc"/><stop offset=".45" stopColor="#65d9e6"/><stop offset=".78" stopColor="#e3f4b3"/><stop offset="1" stopColor="#fff27b"/></linearGradient>
  <linearGradient id="badge" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#51e6bb"/><stop offset=".6" stopColor="#67d6d7"/><stop offset="1" stopColor="#7db7df"/></linearGradient>
  <linearGradient id="gold" x2=".2" y2="1"><stop stopColor="#f9e986"/><stop offset=".6" stopColor="#f4d44e"/><stop offset="1" stopColor="#e3af1e"/></linearGradient>
  <linearGradient id="reflection" x2="0" y2="1"><stop stopColor="white" stopOpacity=".25"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
  <linearGradient id="reflectionFade" x1="0" y1="535" x2="0" y2="670" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity=".2"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
  <radialGradient id="halo"><stop stopColor="#84e8ce" stopOpacity=".5"/><stop offset="1" stopColor="#c6f4dd" stopOpacity="0"/></radialGradient>
  <radialGradient id="sunwash"><stop stopColor="#fff0bf" stopOpacity=".55"/><stop offset="1" stopColor="#fff0bf" stopOpacity="0"/></radialGradient>
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
  <mask id="reflectMask"><rect x="0" y="535" width="1280" height="185" fill="url(#reflectionFade)"/></mask>
  <clipPath id="lotusCardClip"><rect x="350" y="180" width="578" height="351"/></clipPath>
  <clipPath id="endcardWaterline"><rect x="0" y="0" width="1280" height="563"/></clipPath>
  <clipPath id="pondClip"><rect x="-20" y="168" width="1320" height="390"/></clipPath>
  <pattern id="speakerGrill" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#af7018" opacity=".65"/></pattern>
</defs>;

export const Star: React.FC<{x?:number;y?:number;r?:number;fill?:string;rotation?:number}> = ({x=0,y=0,r=15,fill=C.paper,rotation=0}) => <path transform={`translate(${x} ${y}) rotate(${rotation})`} d={range(10).map(i=>`${i?'L':'M'}${Math.sin(i*Math.PI/5)*(i%2?r*.4:r)},${-Math.cos(i*Math.PI/5)*(i%2?r*.4:r)}`).join(' ')+'Z'} fill={fill}/>;

export const Lotus: React.FC<{x:number;y:number;s?:number;color?:string;bend?:number}> = ({x,y,s=1,color='url(#mint)',bend=0}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d={`M0 0 C-35 90 ${135+bend} 88 ${80+bend} 176 S-15 252 4 313`} fill="none" stroke={color} strokeWidth="5" filter="url(#paint)"/>
  <g filter="url(#paint)"><path d="M-153 -4 C-156 -33 -83 -46 -29 -42 C3 -55 43 -37 81 -35 C137 -34 159 -20 155 -5 C167 12 119 32 78 31 C23 44 -3 38 -26 32 C-72 40 -126 24 -153 -4Z" fill={color}/></g>
  <g stroke="#ceffdf" opacity=".42" fill="none" strokeWidth="1.2">
    {range(13).map(i=>{const a=i*Math.PI*2/13;const ex=Math.cos(a)*144,ey=Math.sin(a)*36;return <path key={i} d={`M0 0 Q${ex*.5} ${ey*.2} ${ex} ${ey} M${ex*.45} ${ey*.45} l${ex*.11-12} ${ey*.35+4}`}/>;})}
  </g>
</g>;

export const Fish: React.FC<{x:number;y:number;s?:number;angle?:number;fill?:string;tail?:number}> = ({x,y,s=1,angle=0,fill=C.paper,tail=0}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
  <path d="M-47 0 C-28 -4 -22 -13 0 -14 C25 -14 39 -6 39 0 C38 10 16 16 -1 13 C-23 11 -32 2 -47 0Z" fill={fill}/>
  <path d="M-5 -9 C-18 -31 -3 -33 10 -11 M-7 9 C-21 30 -4 35 12 10 M20 -7 Q38 -24 27 -1" fill={fill}/>
  <path transform={`translate(-42 0) rotate(${tail})`} d="M2 0 Q-21 -6 -30 -19 Q-20 -2 -28 17 Q-14 7 2 0Z" fill={fill}/>
</g>;

export const Vinyl: React.FC<{x?:number;y?:number;s?:number;angle?:number;grooves?:boolean}> = ({x=0,y=0,s=1,angle=0,grooves=true}) => <g transform={`translate(${x} ${y}) scale(${s}) rotate(${angle})`}>
  <circle r="119" fill="#222239" filter="url(#paint)"/>
  {grooves && <>{range(10).map(i=><circle key={i} r={40+i*7} fill="none" stroke="#a9a5c2" strokeWidth={i%3===0?1.2:.65} opacity=".72"/>)}<circle r="35" fill="#f18e64"/><circle r="24" fill="#f9e175"/><circle r="6" fill="#fbeeb9"/>
  <path d="M-102 -49 A112 112 0 0 1 -39 -103 M45 100 A110 110 0 0 1 101 47" fill="none" stroke="#eeedfa" strokeWidth="6" opacity=".2"/></>}
  {!grooves && <circle r="15" fill={C.paper}/>}
</g>;

export const Player: React.FC<{x:number;y:number;s?:number;t?:number;detail?:number}> = ({x,y,s=1,t=0,detail=1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-84 -101 L154 -101 L110 194 L-128 194Z" fill="url(#gold)" filter="url(#paint)"/>
  <path d="M154 -101 L194 -100 L151 194 L110 194Z" fill="#e1b32c" filter="url(#paint)"/>
  <path d="M-113 116 L120 116 L110 194 L-128 194Z" fill="#edc139" opacity=".45"/>
  <g opacity={detail}>
    <path d="M94 -100 v-13 h25 v13 M135 -100 v-13 h25 v13" fill="#143b49"/>
    <path d="M35 -73 H137 M47 -53 H132" stroke="#fff6c7" strokeWidth="8"/>
    <path d="M13 -19 H139 L125 79 H-3Z" fill="url(#speakerGrill)" opacity=".4"/>
    <path d="M20 127 H116 L107 182 H11Z" fill="url(#speakerGrill)"/>
    <path d="M-108 123 H6 L-4 183 H-118Z" fill="#fcf6cf" stroke="#fbf0b1" strokeWidth="3"/>
    <text x="-58" y="151" textAnchor="middle" fontFamily="Gaegu" fontSize="9" fill="#82736e">SEEYRUP PLAYER</text>
    <path d="M-103 163 H-16 M-103 169 H-23 M-103 175 H-37" stroke="#b1a389" strokeWidth="1"/>
    <ellipse cx="167" cy="-52" rx="8" ry="13" transform="rotate(12 167 -52)" fill="#152338"/>
    <ellipse cx="159" cy="-11" rx="8" ry="13" transform="rotate(12 159 -11)" fill="#152338"/>
    {range(7).map(i=><Star key={i} x={-90+rand(i+3)*185} y={-10+rand(i+9)*125} r={i===2?18:8} rotation={i*15} fill={i%2?'#f3a0a9':'#b7eadd'}/>)}
  </g>
  <g transform="translate(-27 -86) rotate(25) scale(.87 1.05)"><Vinyl s={1} angle={t*40} grooves={detail>.5}/></g>
</g>;
