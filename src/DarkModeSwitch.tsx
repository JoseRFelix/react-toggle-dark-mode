import * as React from 'react';
import { useSpring } from 'react-spring';
import { Props, AnimationProperties, ColorOptions, ThemeMode } from './types';
import { SunAndMoonAnimatedSvg } from './SunAndMoonAnimatedSvg';

export const defaultProperties: AnimationProperties = {
  [ThemeMode.System]: {
    svg: {
      transform: 'rotate(0deg)',
    },
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    lines: {
      opacity: 1,
    },
  },
  [ThemeMode.Light]: {
    svg: {
      transform: 'rotate(90deg)',
    },
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    lines: {
      opacity: 1,
    },
  },
  [ThemeMode.Dark]: {
    svg: {
      transform: 'rotate(40deg)',
    },
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '23%',
    },
    lines: {
      opacity: 0,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35, clamp: true },
};

export const defaultColors: ColorOptions = {
  halfSunLeftFill: '#444444',
  halfSunLeftStroke: '#444444',
  halfSunRightFill: '#f8de26',
  halfSunRightStroke: '#f8de26',
  halfSunLeftBeamStroke: '#f8de26',
  halfSunRightBeamStroke: '#444444',
  sunFill: '#f8de26',
  sunStroke: '#444444',
  sunBeamStroke: '#444444',
  moonFill: '#f5f5f5',
  moonStroke: '#bbbbbb',
};

export const DarkModeSwitch = ({
  onChange,
  themeMode = ThemeMode.System,
  size = 24,
  colors = defaultColors,
  animationProperties = defaultProperties,
  style,
  // ...rest
}: Props) => {
  const properties = React.useMemo(() => {
    if (animationProperties !== defaultProperties) {
      return Object.assign(defaultProperties, animationProperties);
    }

    return animationProperties;
  }, [animationProperties]);

  const { svg, circle, lines, mask } = properties[themeMode];

  const svgProps = useSpring({
    ...svg,
    config: animationProperties.springConfig,
  });
  const circleProps = useSpring({
    ...circle,
    config: animationProperties.springConfig,
  });
  const maskProps = useSpring({
    ...mask,
    config: animationProperties.springConfig,
  });
  const linesProps = useSpring({
    ...lines,
    config: animationProperties.springConfig,
  });

  const getNextThemeMode = (current: ThemeMode): ThemeMode => {
    switch (current) {
      case ThemeMode.System:
        return ThemeMode.Dark;
      case ThemeMode.Dark:
        return ThemeMode.Light;
      case ThemeMode.Light:
        return ThemeMode.System;
      default:
        return current; // Fallback case
    }
  };

  const cycle = () => {
    const nextThemeMode = getNextThemeMode(themeMode);
    onChange(nextThemeMode);
  };

  return (
    <SunAndMoonAnimatedSvg
      width={size}
      height={size}
      style={style}
      onClick={cycle}
      themeMode={themeMode}
      {...colors}
      svgProps={svgProps}
      circleProps={circleProps}
      maskProps={maskProps}
      linesProps={linesProps}
    />
  );
};
