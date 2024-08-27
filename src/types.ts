import { SpringConfig, SpringValue } from 'react-spring';

export enum ThemeMode {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark',
}

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;

// Utility to promote existing type to use SpringValues
type WithSpringValues<T> = {
  [K in keyof T]: T[K] extends infer U
    ? U extends string
      ? SpringValue<U>
      : U extends number
      ? SpringValue<U>
      : U
    : never;
};

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

export interface Props extends SVGProps {
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
  svgProps: WithSpringValues<SVGProperties>;
  circleProps: WithSpringValues<CircleProperties>;
  maskProps: WithSpringValues<MaskProperties>;
  linesProps: WithSpringValues<LinesProperties>;
}
