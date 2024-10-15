import { SpringConfig } from 'react-spring';

export enum ThemeMode {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark',
}

type SVGProperties = {
  transform: string;
};

type CircleProperties = {
  r: number;
};

type MaskProperties = {
  cx: string;
  cy: string;
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
  halfSunLeftBeamStroke: string;
  halfMoonRightFill: string;
  halfMoonRightStroke: string;
  halfMoonRightBeamStroke: string;
  sunFill: string;
  sunStroke: string;
  sunBeamStroke: string;
  moonFill: string;
  moonStroke: string;
}

export interface DarkModeSwitchHandle {
  click: () => void;
}

export interface Props {
  onChange: (themeMode: ThemeMode) => void;
  isSystemThemeModeEnabled?: boolean;
  themeMode: ThemeMode;
  style?: React.CSSProperties;
  size?: number | string;
  colors?: Partial<ColorOptions>;
  animationProperties?: AnimationProperties;
}

export interface SunAndMoonAnimatedSvgProps {
  width: number | string;
  height: number | string;
  style?: React.CSSProperties;
  themeMode: ThemeMode;
  isSystemThemeModeEnabled: boolean;
  colors: ColorOptions;
  animationProperties: AnimationProperties;
}
