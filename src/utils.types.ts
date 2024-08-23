import { ThemeMode } from 'types';

export interface SunSvgProps {
  width: number | string;
  height: number | string;
  onClick: () => void;
  themeMode: ThemeMode;
  halfSunLeftFill: string;
  halfSunLeftStroke: string;
  halfSunRightFill: string;
  halfSunRightStroke: string;
  halfSunLeftBeamStroke: string;
  halfSunRightBeamStroke: string;
  sunFill: string;
  sunStroke: string;
  sunBeamStroke: string;
  moonFill: string;
  moonStroke: string;
  springSvgContainerProps: any; // TODO
  springCenterCircleProps: any; // TODO
  springLinesProps: any; // TODO
  springMaskedCircleProps: any; // TODO
}
