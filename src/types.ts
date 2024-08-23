import { SpringConfig } from 'react-spring';

export enum ThemeMode {
  System = "System",
  Light = "Light",
  Dark = "Dark",
};

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
};

export interface Props extends SVGProps {
  onChange: (themeMode: ThemeMode) => void;
  themeMode: ThemeMode;
  style?: React.CSSProperties;
  size?: number | string;
  animationProperties?: AnimationProperties;
  moonColor?: string;
  sunColor?: string;
};
