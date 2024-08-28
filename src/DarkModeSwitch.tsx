import * as React from 'react';
import { Props, AnimationProperties, ColorOptions, ThemeMode } from './types';
import { SunAndMoonAnimatedSvg } from './SunAndMoonAnimatedSvg';

export const defaultColors: ColorOptions = {
  halfSunLeftFill: '#ffca00',
  halfSunLeftStroke: '#ffca00',
  halfSunLeftBeamStroke: '#ffe873',
  halfMoonRightFill: '#44415d',
  halfMoonRightStroke: '#44415d',
  halfMoonRightBeamStroke: '#c0b9c7',
  sunFill: '#ffd700',
  sunStroke: '#444444',
  sunBeamStroke: '#444444',
  moonFill: '#f5f5f5',
  moonStroke: '#bbbbbb',
};

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

export const DarkModeSwitch = ({
  onChange,
  isSystemThemeModeEnabled = true,
  themeMode = isSystemThemeModeEnabled ? ThemeMode.System : ThemeMode.Light,
  size = 24,
  colors,
  animationProperties = defaultProperties,
  style,
}: Props) => {
  const properties = React.useMemo(() => {
    if (animationProperties !== defaultProperties) {
      return Object.assign(defaultProperties, animationProperties);
    }

    return animationProperties;
  }, [animationProperties]);

  const mergedColors = React.useMemo(
    () => ({
      ...defaultColors,
      ...colors,
    }),
    [colors]
  );

  const getNextThemeMode = (current: ThemeMode): ThemeMode => {
    switch (current) {
      case ThemeMode.System:
        return ThemeMode.Dark;
      case ThemeMode.Dark:
        return ThemeMode.Light;
      case ThemeMode.Light:
        return isSystemThemeModeEnabled ? ThemeMode.System : ThemeMode.Dark;
      default:
        throw Error(`Unsupported theme mode: ${current}`);
    }
  };

  const cycle = () => {
    const nextThemeMode = getNextThemeMode(themeMode);
    onChange(nextThemeMode);
  };

  return (
    <button
      onClick={cycle}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
      }}
    >
      <SunAndMoonAnimatedSvg
        width={size}
        height={size}
        style={style}
        themeMode={themeMode}
        isSystemThemeModeEnabled={isSystemThemeModeEnabled}
        colors={mergedColors}
        animationProperties={properties}
      />
    </button>
  );
};
