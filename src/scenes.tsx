import React from 'react';
import {C, Fish, Lotus, Player, Star, Vinyl} from './art';
import {clamp, mix, ramp, range, rand} from './timing';

export const Greeting = ({t}:{t:number}) => {
  const exit = ramp(t,2.5,2.95);
  return <g transform={`translate(0 ${-850*exit})`}>
    <rect x="470" y="70" width="340" height="560" fill="url(#mint)" filter="url(#paint)"/>
    <ellipse cx="640" cy="350" rx="148" ry="255" fill="none" stroke="#fcfbe8" strokeWidth="4" filter="url(#rough)"/>
    {[{x:638,y:253,color:'#e77286',phase:0},{x:713,y:325,color:'#05cbb6',phase:1}].map(({x,y,color,phase})=><g key={x} transform={`rotate(${Math.sin(t*1.6+phase)*2} ${x} 75)`} filter="url(#paint)">
      <path d={`M${x} 75 V${y}`} stroke={color} strokeWidth="4"/>
      <path d={`M${x-26} ${y} Q${x} ${y-12} ${x+27} ${y} L${x+30} ${y+139} Q${x+40} ${y+162} ${x+42} ${y+168} Q${x} ${y+185} ${x-42} ${y+167} Q${x-29} ${y+142} ${x-26} ${y}Z`} fill={color}/>
      <ellipse cx={x} cy={y+7} rx="28" ry="8" fill="#ffdfd5" opacity=".2"/>
    </g>)}
    <text x="118" y="375" fontFamily="Gaegu" fontSize="50" fill="#eeb1b5" transform="rotate(-3 118 375)">HELLO</text>
    <text x="640" y="391" textAnchor="middle" fontFamily="Mr De Haviland" fontSize="195" textLength="724" lengthAdjust="spacingAndGlyphs" fill="#302367" transform="rotate(-2 640 375)">collector?</text>
    <text x="1000" y="378" fontFamily="Gaegu" fontSize="47" fill="#eeb1b5" transform="rotate(2 1000 378)">ARE YOU</text>
  </g>;
};

export const LotusCard = ({t}:{t:number}) => <g transform={`translate(0 ${mix(730,0,ramp(t,0,.38))-ramp(t,1.7,2.12)*770})`}>
  <path d="M353 192 H921 V530 H353Z" fill="url(#mint)" opacity=".35" filter="url(#paint)"/>
  <path d="M353 295 V193 H920 V294" fill="none" stroke="#c6eed7" strokeWidth="3" filter="url(#rough)"/>
  <text x="390" y="437" fontFamily="Zen Kurenaido" fontSize="91" fill="#09609e">蓮</text>
  <g clipPath="url(#lotusCardClip)">
    <Lotus x={735} y={270} s={.98} bend={Math.sin(t*2)*18}/>
    <Lotus x={630} y={380} s={.8} color="#05b7b1" bend={-30}/>
    <Lotus x={807} y={456} s={.54} color="#a2c957"/>
  </g>
</g>;

export const Constellation = ({t}:{t:number}) => {
  const y = mix(800,0,ramp(t,0,.4));
  const s = 1+ramp(t,2.65,3.04)*2.5;
  const points = [[-220,38],[-5,-37],[133,-76],[97,82],[225,3]];
  return <g transform={`translate(640 ${360+y}) scale(${s})`} opacity={1-ramp(t,2.83,3.03)}>
    <ellipse rx="284" ry="164" fill="url(#night)" filter="url(#paint)"/>
    <ellipse rx="263" ry="146" fill="none" stroke={C.paper} strokeWidth="3" filter="url(#rough)" transform="rotate(-4)"/>
    <path d="M-220 38 L-5 -37 L133 -76 L97 82 L225 3" fill="none" stroke={C.paper} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,.45,2.3)} filter="url(#rough)"/>
    {points.map(([x,y],i)=><g key={i} transform={`translate(${x} ${y}) scale(${.85+.15*Math.sin(t*2+i)})`}><Star r={i===1?29:19} rotation={15*i}/></g>)}
  </g>;
};

export const Pond = ({t}:{t:number}) => {
  const opening = ramp(t,0,.3);
  return <g>
    <g transform={`translate(640 360) scale(1 ${opening}) translate(-640 -360)`}>
      <rect x="-18" y="168" width="1316" height="390" fill="url(#sea)" filter="url(#paint)"/>
      <g clipPath="url(#pondClip)">
        {range(23).map(i=>{
          const x=((rand(i+7)*1530+t*(25+rand(i)*28))%1570)-160;
          const y=215+rand(i+63)*260+Math.sin(t*1.2+i)*20;
          return <g key={i} opacity={i%4===0?.75:1} filter="url(#rough)"><Fish x={x} y={y} s={.3+rand(i+6)*.75} fill={i%3===0?'#13519d':i%3===1?'#faffee':'#239cc4'} angle={Math.sin(t*.8+i)*12} tail={Math.sin(t*5+i)*22}/></g>;
        })}
        {range(24).map(i=>{
          const x=rand(i+120)*1400-50,y=200+rand(i+173)*320;
          return <path key={i} d={`M${x} ${y} q${Math.sin(t+i)*48} 20 ${Math.cos(t*.7+i)*25} 65 t${Math.sin(t+i)*45} 76`} fill="none" stroke={i%3?'#f2fbed':'#2379b7'} strokeWidth={1+rand(i)*3} opacity={.15+rand(i+7)*.3} filter="url(#rough)"/>;
        })}
      </g>
    </g>
    <g fill="#8faade" filter="url(#paint)" opacity={opening}>
      {range(3).map(i=><React.Fragment key={i}><circle cx={1100+i*65} cy="117" r="16"/><circle cx={47+i*65} cy="609" r="16"/></React.Fragment>)}
    </g>
  </g>;
};

export const Chimes = ({t}:{t:number}) => <g opacity={ramp(t,0,.13)}>
  <ellipse cx="168" cy="346" rx="170" ry="193" fill="#efc8c8" opacity=".13"/>
  <rect x="915" y="52" width="150" height="531" fill="url(#badge)" filter="url(#paint)"/>
  <g filter="url(#paint)"><ellipse cx="795" cy="573" rx="180" ry="104" fill="url(#sea)"/><ellipse cx="795" cy="567" rx="45" ry="27" fill={C.paper}/></g>
  {range(4).map(i=><g key={i} transform={`rotate(${Math.sin(t*1.7+i*.5)*4} ${112+i*61} -10)`}>
    <path d={`M${112+i*61} -30 Q${97+i*61} 210 ${137+i*65} ${337+i%2*152}`} fill="none" stroke="#347c81" strokeWidth="2" filter="url(#rough)"/>
    {range(6).map(j=>{const u=.2+j*.12;const x=(1-u)**2*(112+i*61)+2*(1-u)*u*(97+i*61)+u*u*(137+i*65);const y=(1-u)**2*(-30)+2*(1-u)*u*210+u*u*(337+i%2*152);return <g key={j} transform={`translate(${x} ${y})`} fill={j%2?'#26b2db':'#1ccfb5'}><circle r="4"/><circle cy="8" r="3"/><circle cy="14" r="4"/></g>;})}
    <path d={`M${136+i*65} ${330+i%2*152} q-4 37 14 51 q17 -5 -14 -51Z`} fill={C.coral} filter="url(#paint)"/>
  </g>)}
  {range(5).map(i=><g key={i} transform={`translate(${921+i*23} 48) rotate(${Math.sin(t+i)*3})`}>
    <path d={`M0 0 Q-32 216 ${i*13-21} ${350+i*31}`} fill="none" stroke="#1a929b" strokeWidth="2"/>
    {range(16).map(j=><g key={j} transform={`translate(${-Math.sin(j*.2)*19+j*j*.13} ${22+j*25}) rotate(${j%2?35:-35})`}><path d="M0 0 Q-20 10 -13 22 Q-2 30 0 0Z" fill="#c4f2bb"/><circle r="2" fill="#eea39e"/></g>)}
  </g>)}
  {range(8).map(i=>{const p=((i/8+t*.19)%1);return <Fish key={i} x={210+p*680} y={690-p*725+Math.sin(p*8)*28} s={.35+rand(i+66)*.45} angle={-35-p*18} tail={Math.sin(t*5+i)*19} fill="#128fb9"/>;})}
  <g fill="#d799b3" filter="url(#paint)">{range(3).map(i=><rect key={i} x="1120" y={39+i*27} width="128" height="12"/>)}{range(3).map(i=><circle key={i+4} cx={295+i*63} cy="620" r="16"/>)}</g>
  <g fill="#f2d0a9" filter="url(#paint)">{range(3).map(i=><circle key={i} cx="1110" cy={300+i*65} r="20"/>)}</g>
</g>;

export const Flower = ({t}:{t:number}) => <g>
  <rect x="375" y="96" width="532" height="530" fill="url(#pink)" filter="url(#paint)"/>
  <path d="M575 620 C559 521 633 418 643 326" fill="none" stroke="#fffbe6" strokeWidth="5" filter="url(#rough)"/>
  <g transform={`translate(642 332) rotate(${t*25}) scale(${.4+.6*ramp(t,0,.55)})`}>
    {range(15).map(i=><g key={i} transform={`rotate(${i*24})`}><path d={`M0 5 C-26 -20 -35 -84 -13 -124 Q0 -148 15 -129 C33 -108 30 -39 0 5Z`} fill="url(#petal)" filter="url(#paint)"/></g>)}
    <circle r="10" fill="#fbffdf"/>
  </g>
  {[{x:252,y:292,a:-55},{x:1010,y:343,a:35}].map(({x,y,a},i)=><g key={i} transform={`translate(${x+Math.sin(t*3+i)*19} ${y+Math.cos(t*2+i)*25}) rotate(${a+t*14}) scale(.72)`}><path d="M0 0 Q-83 -111 -61 -125 Q-35 -124 0 -74 Q31 -117 39 -97 Q45 -67 0 0Z" fill="url(#petal)" filter="url(#paint)"/></g>)}
  <g filter="url(#paint)">
    <circle cx="1180" cy="124" r="30" fill="#b5a0d9"/><circle cx="1077" cy="247" r="20" fill="#50d5bf"/><circle cx="253" cy="441" r="30" fill="#28cfb4"/>
    {range(3).map(i=><React.Fragment key={i}><circle cx="957" cy={173+i*65} r="16" fill="#f7db54"/><circle cx="327" cy={551+i*62} r="16" fill="#edda50"/></React.Fragment>)}
    {range(7).map(i=><rect key={i} x={966+i*27} y="59" width="8" height="18" rx="3" fill="#d7919e"/>)}
    <path d="M36 631 H229" stroke="#d48a98" strokeWidth="13"/>
  </g>
  {/* A passing petal acts as the wipe into the next scene. */}
  {t>2.5 && <path transform={`translate(${mix(1800,-400,ramp(t,2.5,2.95))} 390) rotate(-18) scale(6)`} d="M0 0 Q-83 -111 -61 -125 Q-35 -124 0 -74 Q31 -117 39 -97 Q45 -67 0 0Z" fill="url(#petal)"/>}
</g>;

export const Summer = ({t}:{t:number}) => {
  const badges = [
    {x:190,y:235,rx:65,ry:98,text:'여름',angle:-3},
    {x:643,y:207,rx:68,ry:109,text:'♪',angle:9},
    {x:1116,y:243,rx:100,ry:72,text:'なつ',angle:5},
    {x:876,y:391,rx:65,ry:87,text:'夏',angle:9},
    {x:410,y:548,rx:115,ry:72,text:'SUMMER',angle:-3},
  ];
  return <g><ellipse cx="640" cy="355" rx="630" ry="330" fill="url(#sunwash)"/>
    {badges.map(({x,y,rx,ry,text,angle},i)=><g key={text} transform={`translate(${x} ${y+Math.sin(t*1.7+i)*10}) rotate(${angle+Math.sin(t+i)*3}) scale(${ramp(t,i*.035,.28+i*.035)})`}>
      <ellipse rx={rx} ry={ry} fill="url(#badge)" filter="url(#paint)"/>
      {text==='여름'?<text textAnchor="middle" fill="#f6ffe9" fontSize="48" fontFamily="Gaegu"><tspan x="0" y="-8">여</tspan><tspan x="0" y="39">름</tspan></text>:<text y={text==='♪'?48:21} textAnchor="middle" fill="#f6ffe9" fontSize={text==='♪'?136:text==='SUMMER'?37:65} fontFamily={text==='夏'||text==='なつ'?'Zen Kurenaido':'Gaegu'}>{text}</text>}
    </g>)}
    {[[142,490,47],[890,145,27],[1097,515,35],[491,304,24],[640,645,20],[336,59,16]].map(([x,y,r],i)=><Star key={i} x={x} y={y} r={r} fill="#b3ede0" rotation={t*10+i*23}/>)}
  </g>;
};

export const Score = ({t}:{t:number}) => {
  const exit = ramp(t,2.9,3.5);
  const notes = [[0,0],[1,150],[1,180],[1,210],[3,265],[0,415],[0,444],[0,492],[2,405],[2,735],[2,765],[2,795],[4,70],[4,108],[4,146],[4,557],[4,589]];
  return <g transform={`translate(${exit*1280} 0)`}>
    <ellipse cx="640" cy="360" rx={515*ramp(t,0,.3)} ry="278" fill="url(#mint)" filter="url(#paint)"/>
    <g filter="url(#rough)">{range(5).map(i=><path key={i} d={`M139 ${290+i*38} Q634 ${288+i*38} 1142 ${290+i*38}`} fill="none" stroke="#263b35" strokeWidth="2"/>)}</g>
    {notes.map(([line,pos],i)=><g key={i} transform={`translate(${302+pos+Math.sin(t*2+i*.7)*12} ${290+line*38})`} filter="url(#paint)">
      {i===7?<path d="M0 -19 Q3 -4 15 0 Q3 4 0 19 Q-3 4 -15 0 Q-3 -4 0 -19Z" fill="#ee7e8c"/>:i===8||i>=12&&i<=14?<rect x="-9" y="-9" width="18" height="18" fill="#ed8a92" transform={`rotate(${i===13?45:0})`}/>:<ellipse rx={i===0||i===4?19:13} ry={i===0||i===4?29:14} fill="#ee8c94"/>}
    </g>)}
  </g>;
};

export const Assembly = ({t}:{t:number}) => {
  const first=ramp(t,0,.5), zoom=ramp(t,.9,2.55), land=ramp(t,3.1,4.15);
  const s=mix(6.2,1,zoom);
  const x=mix(-140,600,first), y=mix(430,258,zoom);
  const morph=ramp(t,3.6,4.35);
  return <g>
    <ellipse cx="640" cy="397" rx="430" ry="290" fill="url(#halo)" opacity={morph}/>
    <g opacity={1-morph}>
    <g transform={`translate(${mix(900,706,zoom)} ${mix(475,424,zoom)}) scale(${s}) rotate(${mix(0,-9,land)})`}><rect x="-84" y="-45" width="158" height="167" fill="url(#gold)" filter="url(#paint)"/></g>
    <g transform={`translate(${mix(x,606,zoom)} ${mix(y,272,land)}) rotate(${mix(-25,0,zoom)})`}><Vinyl s={s*.84} angle={t*30} grooves={false}/></g>
    </g>
    <g opacity={morph}><Player x={618} y={339} s={1.01} t={0} detail={0}/></g>
  </g>;
};

export const Hero = ({t}:{t:number}) => <g>
  <ellipse cx="640" cy="397" rx="430" ry="290" fill="url(#halo)"/>
  <g mask="url(#reflectMask)"><g transform="translate(0 1068) scale(1 -1)"><Player x={618} y={339} s={1.01} t={t}/></g></g>
  <Player x={618} y={339+Math.sin(t*2)*3} s={1.01} t={t} detail={ramp(t,0,.45)}/>
</g>;

export const Endcard = ({t}:{t:number}) => <g>
  <path d="M67 33 H1213 Q1217 55 1240 62 V657 Q1218 663 1212 687 H67 Q61 666 39 657 V62 Q61 56 67 33Z" fill="none" stroke="#58b9c0" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,0,.55)} filter="url(#rough)"/>
  <text x="640" y="164" fontFamily="Gaegu" textAnchor="middle" fill="#9cd4d3" fontSize="29" letterSpacing="1" opacity={ramp(t,.15,.55)}>SUMMER SOUND COLLECTOR</text>
  <g clipPath="url(#endcardWaterline)"><g transform={`translate(0 ${mix(75,0,ramp(t,0,.5))})`}>
    <Lotus x={856} y={281} s={1.05} bend={Math.sin(t*1.5)*16}/>
    <Player x={621} y={422} s={.76} t={t+3}/>
    <Lotus x={446} y={440} s={.57} color="#12b5ad"/>
    <Lotus x={796} y={482} s={.43} color="#a6cf6f"/>
    <path d="M136 562 H1127 V692 H136Z" fill="url(#reflection)"/>
    <path d="M230 562 H1090" stroke="#c3e2e1" strokeWidth="2" opacity=".4"/>
  </g></g>
</g>;

export const Signoff = ({t}:{t:number}) => <g transform={`translate(640 359) rotate(${Math.sin(t*1.2)*4}) scale(${mix(.78,1,ramp(t,0,.4))})`} opacity={ramp(t,0,.2)}>
  <g fill="url(#mint)" filter="url(#paint)">
    <path d="M-6 -41 Q24 -44 34 -89 Q29 -35 62 -33 L85 -41 Q48 -19 67 11 L94 24 Q48 12 47 41 L48 63 Q24 35 9 49 L-16 98 Q-2 41 -26 34 L-63 44 Q-34 25 -40 -3 L-72 -32 Q-29 -11 -22 -37 L-43 -63Z"/>
    <circle cx="-52" cy="-66" r="4"/><circle cx="57" cy="-59" r="6"/><ellipse cx="-51" cy="2" rx="4" ry="7"/>
  </g>
  <circle cx="13" cy="0" r="25" fill={C.paper}/>
  <path d="M34 17 L80 49 Q83 54 78 56 L32 22Z" fill={C.paper} stroke="#8ce1d0" strokeWidth="1.5"/>
</g>;
