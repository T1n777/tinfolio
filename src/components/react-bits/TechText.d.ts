import type { CSSProperties, ReactElement } from 'react';
export interface TechTextProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  accentColor?: string;
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  strokeWidth?: number;
  lineStyle?: 'dashed' | 'solid';
  reveal?: 'area' | 'letter' | 'off';
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  sweep?: boolean;
  speed?: number;
  align?: 'left' | 'center' | 'right';
  intro?: 'none' | 'type' | 'assemble' | 'metrics';
  introDuration?: number;
  clickKick?: boolean;
  bounce?: number;
  guides?: boolean;
  className?: string;
  style?: CSSProperties;
}

declare function TechText(props: TechTextProps): ReactElement;
export default TechText;
