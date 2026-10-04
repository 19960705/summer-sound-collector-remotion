import React from 'react';
import {Composition} from 'remotion';
import {Film} from './Film';
import {DURATION, FPS} from './timing';

export const Root: React.FC = () => <Composition
  id="AutumnPostOffice"
  component={Film}
  durationInFrames={DURATION}
  fps={FPS}
  width={1920}
  height={1080}
  defaultProps={{sound: true}}
/>;
