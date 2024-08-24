import React from 'react';
import { animated } from 'react-spring';
import { SunAndMoonAnimatedSvgProps, ThemeMode } from './types';
import { generateUniqueId } from './utils';

/**
 * Create a sun and moon animated SVG which animated between three different states (Half Sun, Sun and Moon).
 * @returns Animated SVG
 */
export const SunAndMoonAnimatedSvg = ({
  width,
  height,
  style,
  onClick,
  themeMode,
  isSystemModeEnabled,
  halfSunLeftFill,
  halfSunLeftStroke,
  halfSunRightFill,
  halfSunRightStroke,
  halfSunLeftBeamStroke,
  halfSunRightBeamStroke,
  sunFill,
  sunStroke,
  sunBeamStroke,
  moonFill,
  moonStroke,
  svgProps,
  circleProps,
  maskProps,
  linesProps,
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
    leftSemiCircleFill: halfSunLeftFill,
    leftSemiCircleStroke: halfSunLeftStroke,

    rightSemiCircleFill: halfSunRightFill,
    rightSemiCircleStroke: halfSunRightStroke,

    leftBeamStroke: halfSunLeftBeamStroke,
    rightBeamStroke: halfSunRightBeamStroke,
  };

  const lightColors = {
    leftSemiCircleFill: sunFill,
    leftSemiCircleStroke: sunStroke,

    rightSemiCircleFill: sunFill,
    rightSemiCircleStroke: sunStroke,

    leftBeamStroke: sunBeamStroke,
    rightBeamStroke: sunBeamStroke,
  };

  const darkColors = {
    leftSemiCircleFill: moonFill,
    leftSemiCircleStroke: moonStroke,

    // These are unused visually in dark mode but we set them to the theme we're transitionig from to maintain accurate animation colors
    rightSemiCircleFill: isSystemModeEnabled
      ? systemColors.rightSemiCircleFill
      : lightColors.rightSemiCircleFill,
    rightSemiCircleStroke: isSystemModeEnabled
      ? systemColors.rightSemiCircleStroke
      : lightColors.rightSemiCircleStroke,

    leftBeamStroke: isSystemModeEnabled
      ? systemColors.leftBeamStroke
      : lightColors.leftBeamStroke,
    rightBeamStroke: isSystemModeEnabled
      ? systemColors.rightBeamStroke
      : lightColors.rightBeamStroke,
  };

  let colors;

  switch (themeMode) {
    case ThemeMode.System:
      colors = systemColors;
      break;

    case ThemeMode.Light:
      colors = lightColors;
      break;

    case ThemeMode.Dark:
      colors = darkColors;
      break;

    default:
      throw Error(`Unsupported theme mode: ${themeMode}`);
  }

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
      onClick={onClick}
      style={{
        cursor: 'pointer',
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
          // @ts-ignore
          style={maskProps}
          r="9"
          fill="black"
        />
      </mask>
      <mask id={rightSemiCircleMaskId}>
        {/* The second mask covers the right half of the circle */}
        {themeMode !== ThemeMode.Dark && (
          <rect x="50%" y="0" width="50%" height="100%" fill="white" />
        )}
        <animated.circle
          // @ts-ignore
          style={maskProps}
          r="9"
          fill="black"
        />
      </mask>

      {/* Left semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={colors.leftSemiCircleFill}
        stroke={colors.leftSemiCircleStroke}
        // @ts-ignore
        style={circleProps}
        mask={`url(#${leftSemiCircleMaskId})`}
      />
      {/* Right semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={colors.rightSemiCircleFill}
        stroke={colors.rightSemiCircleStroke}
        // @ts-ignore
        style={circleProps}
        mask={`url(#${rightSemiCircleMaskId})`}
      />

      {/* Beam Both sides */}
      <animated.g clipPath={`url(#${beamClipPathLeftId})`} style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" stroke={colors.leftBeamStroke} />
        <line x1="12" y1="21" x2="12" y2="23" stroke={colors.leftBeamStroke} />
      </animated.g>
      <animated.g clipPath={`url(#${beamClipPartRightId})`} style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" stroke={colors.rightBeamStroke} />
        <line x1="12" y1="21" x2="12" y2="23" stroke={colors.rightBeamStroke} />
      </animated.g>

      <animated.g style={linesProps}>
        {/* Beam Left side */}
        <line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
          stroke={colors.leftBeamStroke}
        />
        <line x1="1" y1="12" x2="3" y2="12" stroke={colors.leftBeamStroke} />
        <line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
          stroke={colors.leftBeamStroke}
        />
        {/* Beam Right side */}
        <line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
          stroke={colors.rightBeamStroke}
        />
        <line x1="21" y1="12" x2="23" y2="12" stroke={colors.rightBeamStroke} />
        <line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
          stroke={colors.rightBeamStroke}
        />
      </animated.g>
    </animated.svg>
  );
};
