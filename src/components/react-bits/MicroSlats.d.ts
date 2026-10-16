import type { CSSProperties, ReactElement } from 'react';
type SwellPreset = 'swell' | 'tide' | 'storm' | 'signal';
type Rgba = [number, number, number, number];

interface WaveValues {
  scale: number;
  speed: number;
  direction: number;
  chop: number;
  stretch: number;
  glint: number;
  contrast: number;
  perspective: number;
  fog: number;
}

export interface MicroSlatsProps extends Partial<WaveValues> {
  preset?: SwellPreset;
  color?: string;
  glintColor?: string;
  backgroundColor?: string;
  slatWidth?: number;
  slatHeight?: number;
  gap?: number;
  roundness?: number;
  interactive?: boolean;
  cursorStrength?: number;
  cursorSize?: number;
  swirl?: number;
  trail?: number;
  lean?: number;
  intro?: boolean;
  introDuration?: number;
  paused?: boolean;
  maxDpr?: number;
  maxFps?: number;
  className?: string;
  style?: CSSProperties;
}

declare function MicroSlats(props: MicroSlatsProps): ReactElement;
export default MicroSlats;
