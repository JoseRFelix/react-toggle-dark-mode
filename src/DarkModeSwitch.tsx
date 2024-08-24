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
  halfSunRightFill: '#d4b511',
  halfSunRightStroke: '#d4b511',
  halfSunLeftBeamStroke: '#ccc160',
  halfSunRightBeamStroke: '#5e5e53',
  sunFill: '#ffd700',
  sunStroke: '#444444',
  sunBeamStroke: '#444444',
  moonFill: '#f5f5f5',
  moonStroke: '#bbbbbb',
};

export const DarkModeSwitch = ({
  onChange,
  isSystemModeEnabled = true,
  themeMode = isSystemModeEnabled ? ThemeMode.System : ThemeMode.Light,
  size = 24,
  colors = defaultColors,
  animationProperties = defaultProperties,
  style,
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
        return isSystemModeEnabled ? ThemeMode.System : ThemeMode.Dark;
      default:
        throw Error(`Unsupported theme mode: ${current}`);
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
      isSystemModeEnabled={isSystemModeEnabled}
      {...colors}
      svgProps={svgProps}
      circleProps={circleProps}
      maskProps={maskProps}
      linesProps={linesProps}
    />
  );
};
