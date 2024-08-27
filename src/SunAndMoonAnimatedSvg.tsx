import React from 'react';
import { animated, useSpring } from 'react-spring';
import { SunAndMoonAnimatedSvgProps, ThemeMode } from './types';
import { generateUniqueId } from './utils';

/**
 * Create a sun and moon animated SVG which animated between three different states (Half Sun/Half Moon, Sun and Moon).
 * @returns Animated SVG
 */
export const SunAndMoonAnimatedSvg = ({
  width,
  height,
  style,
  themeMode,
  isSystemThemeModeEnabled,
  colors,
  animationProperties,
}: SunAndMoonAnimatedSvgProps) => {
  // Avoid id collisions in our SVG
  const prefix = 'react-toggle-dark-mode';
  const beamClipPathLeftId = generateUniqueId(`${prefix}-beam-clip-path-left`);
  const beamClipPartRightId = generateUniqueId(
    `${prefix}-beam-clip-path-right`
  );
  const leftSemiCircleMaskId = generateUniqueId(
    `${prefix}-left-semi-circle-mask`
  );
  const rightSemiCircleMaskId = generateUniqueId(
    `${prefix}-right-semi-circle-mask`
  );

  // Colour corrections
  const systemColors = {
    leftSemiCircleFill: colors.halfSunLeftFill,
    leftSemiCircleStroke: colors.halfSunLeftStroke,
    leftBeamStroke: colors.halfSunLeftBeamStroke,

    rightSemiCircleFill: colors.halfMoonRightFill,
    rightSemiCircleStroke: colors.halfMoonRightStroke,
    rightBeamStroke: colors.halfMoonRightBeamStroke,
  };

  const lightColors = {
    leftSemiCircleFill: colors.sunFill,
    leftSemiCircleStroke: colors.sunStroke,
    leftBeamStroke: colors.sunBeamStroke,

    rightSemiCircleFill: colors.sunFill,
    rightSemiCircleStroke: colors.sunStroke,
    rightBeamStroke: colors.sunBeamStroke,
  };

  const darkColors = {
    leftSemiCircleFill: colors.moonFill,
    leftSemiCircleStroke: colors.moonStroke,
    rightSemiCircleFill: colors.moonFill,
    rightSemiCircleStroke: colors.moonStroke,

    // These are unused visually in dark mode but we set them to the theme we're transitionig from to maintain accurate animation colors
    leftBeamStroke: isSystemThemeModeEnabled
    ? systemColors.leftBeamStroke
    : lightColors.leftBeamStroke,
    rightBeamStroke: isSystemThemeModeEnabled
      ? systemColors.rightBeamStroke
      : lightColors.rightBeamStroke,
  };

  let themeColors;

  switch (themeMode) {
    case ThemeMode.System:
      themeColors = systemColors;
      break;

    case ThemeMode.Light:
      themeColors = lightColors;
      break;

    case ThemeMode.Dark:
      themeColors = darkColors;
      break;

    default:
      throw Error(`Unsupported theme mode: ${themeMode}`);
  }

  // Spring animations
  const { svg, circle, lines, mask } = animationProperties[themeMode];

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
  const themeColorsProps = useSpring({
    ...themeColors,
    config: animationProperties.springConfig,
  });

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      style={{
        ...svgProps,
        ...style,
      }}
    >
      <defs>
        <clipPath id={beamClipPathLeftId}>
          <rect x="0" y="0" width="51%" height="100%" />
        </clipPath>
        <clipPath id={beamClipPartRightId}>
          <rect x="50%" y="0" width="50%" height="100%" />
        </clipPath>
      </defs>

      <mask id={leftSemiCircleMaskId}>
        {themeMode !== ThemeMode.Dark && (
          <rect x="0" y="0" width="51%" height="100%" fill="white" />
        )}
        {themeMode === ThemeMode.Dark && (
          <>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
          </>
        )}
        <animated.circle
          r="9"
          fill="black"
          // @ts-ignore
          style={maskProps}
        />
      </mask>
      <mask id={rightSemiCircleMaskId}>
        {themeMode !== ThemeMode.Dark && (
          <rect x="50%" y="0" width="50%" height="100%" fill="white" />
        )}
        {themeMode === ThemeMode.Dark && (
          <>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
          </>
        )}
        <animated.circle
          r="9"
          fill="black"
          // @ts-ignore
          style={maskProps}
        />
      </mask>

      {/* Left semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={themeColorsProps.leftSemiCircleFill}
        stroke={themeColorsProps.leftSemiCircleStroke}
        // @ts-ignore
        style={circleProps}
        mask={`url(#${leftSemiCircleMaskId})`}
      />
      {/* Right semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={themeColorsProps.rightSemiCircleFill}
        stroke={themeColorsProps.rightSemiCircleStroke}
        // @ts-ignore
        style={circleProps}
        mask={`url(#${rightSemiCircleMaskId})`}
      />

      {/* Beam Both sides */}
      <animated.g clipPath={`url(#${beamClipPathLeftId})`} style={linesProps}>
        <animated.line x1="12" y1="1" x2="12" y2="3" stroke={themeColorsProps.leftBeamStroke} />
        <animated.line x1="12" y1="21" x2="12" y2="23" stroke={themeColorsProps.leftBeamStroke} />
      </animated.g>
      <animated.g clipPath={`url(#${beamClipPartRightId})`} style={linesProps}>
        <animated.line x1="12" y1="1" x2="12" y2="3" stroke={themeColorsProps.rightBeamStroke} />
        <animated.line x1="12" y1="21" x2="12" y2="23" stroke={themeColorsProps.rightBeamStroke} />
      </animated.g>

      <animated.g style={linesProps}>
        {/* Beam Left side */}
        <animated.line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
          stroke={themeColorsProps.leftBeamStroke}
        />
        <animated.line x1="1" y1="12" x2="3" y2="12" stroke={themeColorsProps.leftBeamStroke} />
        <animated.line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
          stroke={themeColorsProps.leftBeamStroke}
        />
        {/* Beam Right side */}
        <animated.line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
          stroke={themeColorsProps.rightBeamStroke}
        />
        <animated.line x1="21" y1="12" x2="23" y2="12" stroke={themeColorsProps.rightBeamStroke} />
        <animated.line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
          stroke={themeColorsProps.rightBeamStroke}
        />
      </animated.g>
    </animated.svg>
  );
};
