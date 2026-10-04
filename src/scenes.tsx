import React from 'react';
import {C, Branch, Envelope, Mailbox, MapleLeaf, PaperPlane, Stamp, WaxSeal} from './art';
import {mix, ramp, range, rand} from './timing';

export const Greeting = ({t}:{t:number}) => <g transform={`translate(0 ${-850*ramp(t,2.5,2.95)})`}>
  <rect x="445" y="80" width="390" height="550" fill="url(#terracotta)" filter="url(#paint)"/>
  <path d="M475 103 H805 V607 H475Z" fill="none" stroke={C.cream} strokeWidth="2" strokeDasharray="8 7"/>
  <Envelope x={643} y={286} s={1.55} angle={-13+Math.sin(t)*2}/>
  <Envelope x={651} y={451} s={1.35} angle={12+Math.sin(t+1)*3} fill={C.blush}/>
  <MapleLeaf x={744} y={163} s={.42} angle={20} fill={C.wine}/>
  <text x="102" y="373" fontFamily="Gaegu" fontSize="38" fill={C.rust}>DEAR YOU</text>
  <text x="640" y="395" textAnchor="middle" fontFamily="Mr De Haviland" fontSize="190" textLength="590" lengthAdjust="spacingAndGlyphs" fill={C.ink}>a letter.</text>
  <text x="1000" y="372" fontFamily="Gaegu" fontSize="32" fill={C.rust}>FROM AUTUMN</text>
</g>;

export const LeafCard = ({t}:{t:number}) => <g transform={`translate(0 ${mix(730,0,ramp(t,0,.38))-ramp(t,1.7,2.12)*770})`}>
  <rect x="341" y="179" width="598" height="361" fill="url(#parchment)" filter="url(#paint)"/>
  <path d="M366 204 H913 V515 H366Z" stroke={C.ochre} fill="none" strokeWidth="2"/>
  <text x="389" y="423" fill={C.wine} fontFamily="Zen Kurenaido" fontSize="93">秋</text>
  <MapleLeaf x={640} y={345} s={1.27} angle={-14+Math.sin(t*2)*5}/>
  <MapleLeaf x={800} y={376} s={.85} angle={31} fill={C.wine}/>
  <text x="392" y="479" fontFamily="Gaegu" fontSize="20" fill={C.ink} letterSpacing="3">PRESSED MEMORIES</text>
</g>;

export const PostalRoute = ({t}:{t:number}) => <g transform={`translate(640 ${360+mix(800,0,ramp(t,0,.4))}) scale(${1+ramp(t,2.65,3.04)*2.5})`} opacity={1-ramp(t,2.83,3.03)}>
  <rect x="-300" y="-175" width="600" height="350" rx="10" fill="url(#burgundy)" filter="url(#paint)"/>
  <path d="M-246 87 C-181 10 -193 -126 -58 -79 S116 135 217 -72" fill="none" stroke={C.cream} strokeWidth="3" pathLength="1" strokeDasharray=".012 .018" opacity={ramp(t,.3,1.5)}/>
  {[[-246,87],[-58,-79],[87,45],[217,-72]].map(([x,y],i)=><g key={i} opacity={ramp(t,.2+i*.2,.6+i*.2)}><Envelope x={x} y={y} s={.29} angle={-12+i*9}/><circle cx={x} cy={y+35} r="4" fill={C.cream}/></g>)}
  <text x="-260" y="-130" fill={C.cream} fontFamily="Gaegu" fontSize="24" letterSpacing="5">A LETTER'S JOURNEY</text>
</g>;

export const Airmail = ({t}:{t:number}) => <g>
  <g transform={`translate(640 360) scale(1 ${ramp(t,0,.3)}) translate(-640 -360)`}>
    <rect x="-20" y="168" width="1320" height="390" fill="url(#airmail)" filter="url(#paint)"/>
    {range(16).map(i=>{const x=((rand(i+7)*1550+t*(36+rand(i)*33))%1570)-160,y=230+rand(i+63)*250+Math.sin(t*1.2+i)*19;return <PaperPlane key={i} x={x} y={y} s={.35+rand(i+6)*.54} fill={i%3===0?C.ochre:i%3===1?C.cream:C.blush} angle={Math.sin(t*.8+i)*12}/>;})}
    {range(9).map(i=><path key={i} d={`M${rand(i+31)*1100} ${240+rand(i+11)*230} q90 -65 190 0 t130 -10`} fill="none" stroke={C.cream} strokeWidth="1.3" strokeDasharray="8 12" opacity=".23"/>)}
  </g>
  <text x="60" y="129" fill={C.wine} fontFamily="Gaegu" fontSize="31" letterSpacing="8">VIA AIR MAIL</text>
  <g stroke={C.rust} strokeWidth="12">{range(7).map(i=><path key={i} d={`M${932+i*44} 591 l25 24`}/>)}</g>
</g>;

export const AutumnTree = ({t}:{t:number}) => <g opacity={ramp(t,0,.13)}>
  <rect x="878" y="80" width="244" height="538" fill="url(#terracotta)" filter="url(#paint)" opacity=".65"/>
  <Branch x={1000} y={280} s={1.15} t={t}/>
  <path d="M840 611 Q1050 566 1190 620" fill="none" stroke={C.blush} strokeWidth="13" filter="url(#rough)"/>
  {range(4).map(i=><Stamp key={i} x={132+i%2*139} y={143+Math.floor(i/2)*272+Math.sin(t+i)*10} s={.55} angle={-13+i*10} label={['01','POST','TO YOU','02'][i]} fill={i%2?C.rust:C.wine}/>)}
  {range(7).map(i=>{const p=(i/7+t*.17)%1;return <PaperPlane key={i} x={255+p*610} y={687-p*695+Math.sin(p*8)*24} s={.4+rand(i+66)*.25} angle={-34} fill={i%2?C.rust:C.ochre}/>;})}
  {range(6).map(i=><MapleLeaf key={i} x={856+rand(i+44)*310} y={155+(t*36+i*68)%460} s={.14+rand(i)*.14} angle={t*25+i*44}/>)}
</g>;

export const Maple = ({t}:{t:number}) => <g>
  <rect x="367" y="91" width="546" height="535" fill="url(#burgundy)" filter="url(#paint)"/>
  <path d="M393 115 H887 V602 H393Z" fill="none" stroke={C.blush} strokeWidth="2" strokeDasharray="5 8"/>
  <MapleLeaf x={644} y={373} s={1.7*ramp(t,0,.45)} angle={-12+t*12}/>
  <text x="640" y="573" textAnchor="middle" fontFamily="Gaegu" fill={C.cream} fontSize="24" letterSpacing="4">A LITTLE PIECE OF OCTOBER</text>
  <Envelope x={236} y={301+Math.sin(t*2)*23} s={.57} angle={-24+t*5}/>
  <Envelope x={1044} y={406+Math.cos(t*2)*23} s={.5} angle={18-t*6}/>
  <MapleLeaf x={197} y={547} s={.37} angle={t*21}/>
  <WaxSeal x={1064} y={152} s={.42} angle={t*9}/>
  {t>2.5 && <MapleLeaf x={mix(1800,-400,ramp(t,2.5,2.95))} y={450} s={7} angle={-22}/>}
</g>;

export const Stamps = ({t}:{t:number}) => <g>
  <ellipse cx="640" cy="355" rx="610" ry="330" fill="url(#sunwash)"/>
  {[
    {x:205,y:229,s:.93,label:'DEAR',a:-9}, {x:617,y:201,s:1.15,label:'AUTUMN',a:8},
    {x:1090,y:261,s:1,label:'POST',a:12}, {x:837,y:472,s:.83,label:'TO YOU',a:6},
    {x:406,y:529,s:.84,label:'OCTOBER',a:-8},
  ].map(({x,y,s,label,a},i)=><Stamp key={label} x={x} y={y+Math.sin(t*1.7+i)*9} s={s*ramp(t,i*.035,.3+i*.035)} label={label} angle={a+Math.sin(t+i)*3} fill={i%2?C.rust:C.wine}/>)}
  {[[126,472],[425,95],[1087,571],[673,597]].map(([x,y],i)=><MapleLeaf key={i} x={x} y={y} s={.19} angle={t*13+i*29} fill={C.ochre}/>)}
</g>;

export const Letter = ({t}:{t:number}) => <g transform={`translate(${1280*ramp(t,2.9,3.5)} 0)`}>
  <g transform={`translate(640 360) scale(${ramp(t,0,.3)})`}>
    <rect x="-471" y="-250" width="942" height="500" fill="url(#parchment)" filter="url(#paint)"/>
    <path d="M55 -197 V204" stroke={C.ochre} strokeWidth="2" opacity=".55"/>
    <text x="-407" y="-155" fill={C.wine} fontFamily="Mr De Haviland" fontSize="77">Dear you,</text>
    <text x="-407" y="-65" fill={C.ink} fontFamily="Gaegu" fontSize="30"><tspan x="-407">The leaves are turning.</tspan><tspan x="-407" dy="45">I saved a little autumn</tspan><tspan x="-407" dy="45">just for you.</tspan></text>
    <text x="-220" y="181" fill={C.wine} fontFamily="Mr De Haviland" fontSize="66">With love.</text>
    <Stamp x={347} y={-133} s={.66} label="POST"/>
    {range(3).map(i=><path key={i} d={`M102 ${43+i*49} H391`} stroke={C.ink} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,.5+i*.3,1.05+i*.3)}/>)}
    <MapleLeaf x={-375} y={162} s={.45} angle={-25}/>
  </g>
</g>;

export const Assembly = ({t}:{t:number}) => {
  // Position, zoom and part alignment all settle before the next shot.
  const zoom=ramp(t,.1,3.5),assembly=ramp(t,.65,3.55);
  return <g>
    <ellipse cx="640" cy="382" rx="430" ry="280" fill="url(#halo)" opacity={ramp(t,2.4,3.55)}/>
    <Mailbox x={mix(780,640,zoom)} y={mix(430,382,zoom)} s={mix(4.3,1,zoom)} assembly={assembly} t={0} detail={ramp(t,3.55,4.15)}/>
    <g opacity={ramp(t,3.75,4.3)}><Envelope x={424} y={470} s={.66} angle={-20}/><MapleLeaf x={820} y={500} s={.51} angle={36}/></g>
  </g>;
};

export const Hero = ({t}:{t:number}) => <g>
  <ellipse cx="640" cy="382" rx="430" ry="280" fill="url(#halo)"/>
  <Mailbox x={640} y={382} t={t}/>
  <Envelope x={424} y={470+Math.sin(t*2)*8} s={.66} angle={-20}/>
  <MapleLeaf x={820} y={500} s={.51} angle={36+t*4}/>
</g>;

export const Endcard = ({t}:{t:number}) => <g>
  <path d="M63 34 H1218 V685 H63Z" stroke={C.rust} strokeWidth="3" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(t,0,.55)} filter="url(#rough)"/>
  {range(27).map(i=><React.Fragment key={i}><rect x={78+i*42} y="40" width="18" height="5" fill={i%2?C.wine:C.ochre}/><rect x={78+i*42} y="675" width="18" height="5" fill={i%2?C.wine:C.ochre}/></React.Fragment>)}
  <text x="640" y="142" textAnchor="middle" fontFamily="Gaegu" fontSize="38" fill={C.wine} letterSpacing="5" opacity={ramp(t,.15,.55)}>THE AUTUMN POST OFFICE</text>
  <g transform={`translate(0 ${mix(75,0,ramp(t,0,.5))})`}>
    <Branch x={907} y={394} s={.72} angle={9} t={t}/>
    <Mailbox x={641} y={418} s={.82} t={t+3}/>
    <Envelope x={413} y={531} s={.77} angle={-12}/>
    <MapleLeaf x={1003} y={556} s={.42} angle={54}/>
    <Stamp x={306} y={359} s={.7} angle={-11} label="TO YOU"/>
  </g>
  <text x="640" y="633" textAnchor="middle" fontFamily="Gaegu" fontSize="24" fill={C.ink} letterSpacing="2">A SEASON, SEALED WITH LOVE.</text>
</g>;

export const Signoff = ({t}:{t:number}) => <g opacity={ramp(t,0,.25)}>
  <Envelope x={640} y={348} s={.91} angle={Math.sin(t*1.2)*3}/>
  <WaxSeal x={640} y={360} s={.32}/>
  <text x="640" y="460" textAnchor="middle" fontFamily="Gaegu" fontSize="24" fill={C.wine} letterSpacing="5">UNTIL THE NEXT LETTER</text>
</g>;
