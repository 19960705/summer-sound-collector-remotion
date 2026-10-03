export const FPS = 30;
export const DURATION = 1113;
export const SHOTS = [
  {id: 'greeting', start: 0, end: 2.85},
  {id: 'lotus', start: 2.85, end: 4.8},
  {id: 'constellation', start: 4.8, end: 7.8},
  {id: 'pond', start: 7.8, end: 12.65},
  {id: 'chimes', start: 12.65, end: 15.95},
  {id: 'flower', start: 15.95, end: 18.75},
  {id: 'summer', start: 18.75, end: 20.95},
  {id: 'score', start: 20.95, end: 24.45},
  {id: 'assembly', start: 24.45, end: 28.8},
  {id: 'player', start: 28.8, end: 31.6},
  {id: 'endcard', start: 31.6, end: 34.65},
  {id: 'signoff', start: 34.65, end: 37.1},
] as const;
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {const c = clamp(v); return c*c*(3-2*c);};
export const mix = (a: number, b: number, p: number) => a+(b-a)*p;
export const ramp = (t: number, a: number, b: number) => smooth((t-a)/(b-a));
export const range = (n: number) => Array.from({length:n}, (_,i)=>i);
export const rand = (i: number) => {const v = Math.sin(i*127.1+311.7)*43758.5453; return v-Math.floor(v);};
