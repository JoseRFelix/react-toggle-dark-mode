import * as React from 'react';
import { useSpring } from 'react-spring';
import { Props, AnimationProperties, ColorOptions, ThemeMode } from './types';
import { sunSvg } from './utils';

export const defaultProperties: AnimationProperties = {
  [ThemeMode.System]: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(0deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  [ThemeMode.Light]: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(0deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  [ThemeMode.Dark]: {
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '23%',
    },
    svg: {
      transform: 'rotate(40deg)',
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
  halfSunLeftBeamStroke: '#444444',
  halfSunRightBeamStroke: '#f8de26',
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
  // moonColor = 'white',
  // sunColor = 'black',
  // style,
  // ...rest
}: Props) => {
  const properties = React.useMemo(() => {
    if (animationProperties !== defaultProperties) {
      return Object.assign(defaultProperties, animationProperties);
    }

    return animationProperties;
  }, [animationProperties]);

  const { svg, circle, lines, mask } = properties[themeMode];

  const svgContainerProps = useSpring({
    ...svg,
    config: animationProperties.springConfig,
  });
  const centerCircleProps = useSpring({
    ...circle,
    config: animationProperties.springConfig,
  });
  const maskedCircleProps = useSpring({
    ...mask,
    config: animationProperties.springConfig,
  });
  const linesProps = useSpring({
    ...lines,
    config: animationProperties.springConfig,
  });

  const getNextThemeMode = (current: ThemeMode): ThemeMode => {
    const values = Object.values(ThemeMode) as ThemeMode[];
    const currentIndex = values.indexOf(current);
    const nextIndex = (currentIndex + 1) % values.length; // Wrap around
    return values[nextIndex];
  };

  const cycle = () => {
    const nextThemeMode = getNextThemeMode(themeMode);
    onChange(nextThemeMode);
  };

  return sunSvg({
    width: size,
    height: size,
    onClick: cycle,
    themeMode,
    ...colors,
    springSvgContainerProps: svgContainerProps,
    springCenterCircleProps: centerCircleProps,
    springLinesProps: linesProps,
    springMaskedCircleProps: maskedCircleProps,
  });

  // return (
  //   <animated.svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width={size}
  //     height={size}
  //     viewBox="0 0 24 24"
  //     color={themeMode === ThemeMode.Light ? sunColor : moonColor}
  //     fill="none"
  //     strokeWidth="2"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     stroke="currentColor"
  //     onClick={cycle}
  //     style={{
  //       cursor: 'pointer',
  //       ...svgContainerProps,
  //       ...style,
  //     }}
  //     {...rest}
  //   >
  //     <mask id={uniqueMaskId}>
  //       {themeMode !== ThemeMode.System && (
  //         <rect x="0" y="0" width="100%" height="100%" fill="white" />
  //       )}
  //       {themeMode === ThemeMode.System && (
  //         <rect x="0" y="0" width="50%" height="100%" fill="white" />
  //       )}
  //       {themeMode !== ThemeMode.System && (
  //         <animated.circle
  //           // @ts-ignore
  //           style={maskedCircleProps}
  //           r="9"
  //           fill="black"
  //         />
  //       )}
  //     </mask>

  //     <mask id="mo-test-1">
  //       <rect x="0" y="0" width="50%" height="100%" fill="white" />
  //     </mask>

  //     <mask id="mo-test-2">
  //       <rect
  //         x="0"
  //         y="0"
  //         width="50%"
  //         height="100%"
  //         fill="white"
  //         transform="scale(-1, 1) translate(-100%, 0)"
  //       />
  //     </mask>

  //     <animated.circle
  //       cx="12"
  //       cy="12"
  //       fill="blue"
  //       // @ts-ignore
  //       style={centerCircleProps}
  //       mask={`url(#mo-test-1)`}
  //     />

  //     <animated.circle
  //       cx="12"
  //       cy="12"
  //       fill="red"
  //       // @ts-ignore
  //       style={centerCircleProps}
  //       mask={`url(#mo-test-2)`}
  //     />

  //     <animated.g stroke="currentColor" style={linesProps}>
  //       <line x1="12" y1="1" x2="12" y2="3" />
  //       <line x1="12" y1="21" x2="12" y2="23" />
  //       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
  //       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
  //       <line x1="1" y1="12" x2="3" y2="12" />
  //       <line x1="21" y1="12" x2="23" y2="12" />
  //       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
  //       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  //     </animated.g>
  //   </animated.svg>
  // );
};
