import { SpringConfig } from 'react-spring';

export enum ThemeMode {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark',
}

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;

type CircleProperties = {
  r: number;
};

type MaskProperties = {
  cx: string;
  cy: string;
};

type SVGProperties = {
  transform: string;
};

type LinesProperties = {
  opacity: number;
};

type ModeProperties = {
  circle: CircleProperties;
  mask: MaskProperties;
  svg: SVGProperties;
  lines: LinesProperties;
};

export interface AnimationProperties {
  [ThemeMode.System]: ModeProperties;
  [ThemeMode.Light]: ModeProperties;
  [ThemeMode.Dark]: ModeProperties;
  springConfig: SpringConfig;
}

export interface ColorOptions {
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
}

export interface Props extends SVGProps {
  onChange: (themeMode: ThemeMode) => void;
  themeMode: ThemeMode;
  style?: React.CSSProperties;
  size?: number | string;
  colors?: ColorOptions;
  animationProperties?: AnimationProperties;
}

export interface SunAndMoonAnimatedSvgProps {
  width: number | string;
  height: number | string;
  style?: React.CSSProperties;
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
};
