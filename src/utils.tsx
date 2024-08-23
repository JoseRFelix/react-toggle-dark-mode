import React from 'react';
import { animated } from 'react-spring';
import { SunSvgProps } from 'utils.types';
import { ThemeMode } from './types';

/**
 * Generate a unique id to avoid ID collisions.
 */
let generateUniqueIdCounter = 0;
const generateUniqueId = (prefix: string) => {
  generateUniqueIdCounter += 1;
  return `${prefix}-${generateUniqueIdCounter}`;
};

/**
 * Created a sun and moon animated SVG which animated between three different states (Half Sun, Sun and Moon).
 * @returns Animated SVG
 */
export const sunAndMoonAnimatedSvg = ({
  width,
  height,
  onClick,
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
  springSvgContainerProps,
  springCenterCircleProps,
  springLinesProps,
  springMaskedCircleProps,
  themeMode,
}: SunSvgProps) => {
  // Avoid id collisions in our SVG
  const prefix = 'react-toggle-dark-mode';
  const beamClipPathLeftId = generateUniqueId(`${prefix}-beam-clip-path-left`);
  const beamClipPartRightId = generateUniqueId(`${prefix}-beam-clip-path-right`);
  const leftSemiCircleMaskId = generateUniqueId(`${prefix}-left-semi-circle-mask`);
  const rightSemiCircleMaskId = generateUniqueId(`${prefix}-right-semi-circle-mask`);

  // Colour corrections
  let leftSemiCircleFill;
  let leftSemiCircleStroke;

  let rightSemiCircleFill;
  let rightSemiCircleStroke;

  let leftBeamStroke;
  let rightBeamStroke;

  switch (themeMode) {
    case ThemeMode.System:
      leftSemiCircleFill = halfSunLeftFill;
      leftSemiCircleStroke = halfSunLeftStroke;
      rightSemiCircleFill = halfSunRightFill;
      rightSemiCircleStroke = halfSunRightStroke;
      leftBeamStroke = halfSunLeftBeamStroke;
      rightBeamStroke = halfSunRightBeamStroke;
      break;

    case ThemeMode.Light:
      leftSemiCircleFill = sunFill;
      leftSemiCircleStroke = sunStroke;
      rightSemiCircleFill = sunFill;
      rightSemiCircleStroke = sunStroke;
      leftBeamStroke = sunBeamStroke;
      rightBeamStroke = sunBeamStroke;
      break;

    case ThemeMode.Dark:
      leftSemiCircleFill = moonFill;
      leftSemiCircleStroke = moonStroke;
      break;

    default:
      break;
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
        ...springSvgContainerProps,
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
            <animated.circle
              // @ts-ignore
              style={springMaskedCircleProps}
              r="9"
              fill="black"
            />
          </>
        )}
      </mask>
      <mask id={rightSemiCircleMaskId}>
        {/* The second mask covers the right half of the circle */}
        {themeMode !== ThemeMode.Dark && (
          <rect x="50%" y="0" width="50%" height="100%" fill="white" />
        )}
      </mask>

      {/* Left semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={leftSemiCircleFill}
        stroke={leftSemiCircleStroke}
        // @ts-ignore
        style={springCenterCircleProps}
        mask={`url(#${leftSemiCircleMaskId})`}
      />
      {/* Right semi-circle */}
      <animated.circle
        cx="12"
        cy="12"
        r="5"
        fill={rightSemiCircleFill}
        stroke={rightSemiCircleStroke}
        // @ts-ignore
        style={springCenterCircleProps}
        mask={`url(#${rightSemiCircleMaskId})`}
      />

      {/* Beam Both sides */}
      <animated.g
        clipPath={`url(#${beamClipPathLeftId})`}
        style={springLinesProps}
      >
        <line x1="12" y1="1" x2="12" y2="3" stroke={leftBeamStroke} />
        <line x1="12" y1="21" x2="12" y2="23" stroke={leftBeamStroke} />
      </animated.g>
      <animated.g
        clipPath={`url(#${beamClipPartRightId})`}
        style={springLinesProps}
      >
        <line x1="12" y1="1" x2="12" y2="3" stroke={rightBeamStroke} />
        <line x1="12" y1="21" x2="12" y2="23" stroke={rightBeamStroke} />
      </animated.g>

      <animated.g style={springLinesProps}>
        {/* Beam Left side */}
        <line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
          stroke={leftBeamStroke}
        />
        <line x1="1" y1="12" x2="3" y2="12" stroke={leftBeamStroke} />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={leftBeamStroke} />
        {/* Beam Right side */}
        <line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
          stroke={rightBeamStroke}
        />
        <line x1="21" y1="12" x2="23" y2="12" stroke={rightBeamStroke} />
        <line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
          stroke={rightBeamStroke}
        />
      </animated.g>
    </animated.svg>
  );
};
