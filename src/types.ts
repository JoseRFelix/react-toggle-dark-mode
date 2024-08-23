import { SpringConfig } from 'react-spring';

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
    dark: ModeProperties;
    light: ModeProperties;
    springConfig: SpringConfig;
}

export interface Props extends SVGProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  style?: React.CSSProperties;
  size?: number | string;
  animationProperties?: AnimationProperties;
  moonColor?: string;
  sunColor?: string;
}
