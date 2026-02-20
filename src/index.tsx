import * as React from 'react';
import { useSpring, animated } from '@react-spring/web';

export const defaultProperties = {
  dark: {
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
  light: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(90deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
};

let REACT_TOGGLE_DARK_MODE_GLOBAL_ID = 0;
type AnimationProperties = typeof defaultProperties;
type ThemeProperties = AnimationProperties['dark'];
type PartialThemeProperties = {
  circle?: Partial<ThemeProperties['circle']>;
  mask?: Partial<ThemeProperties['mask']>;
  svg?: Partial<ThemeProperties['svg']>;
  lines?: Partial<ThemeProperties['lines']>;
};
type DarkModeSwitchAnimationProperties = {
  dark?: PartialThemeProperties;
  light?: PartialThemeProperties;
  springConfig?: Partial<AnimationProperties['springConfig']>;
};

const mergeThemeProperties = (
  theme: ThemeProperties,
  customTheme?: PartialThemeProperties
): ThemeProperties => ({
  circle: { ...theme.circle, ...customTheme?.circle },
  mask: { ...theme.mask, ...customTheme?.mask },
  svg: { ...theme.svg, ...customTheme?.svg },
  lines: { ...theme.lines, ...customTheme?.lines },
});

const resolveAnimationProperties = (
  animationProperties?: DarkModeSwitchAnimationProperties
): AnimationProperties => {
  if (!animationProperties || animationProperties === defaultProperties) {
    return defaultProperties;
  }

  return {
    dark: mergeThemeProperties(
      defaultProperties.dark,
      animationProperties.dark
    ),
    light: mergeThemeProperties(
      defaultProperties.light,
      animationProperties.light
    ),
    springConfig: {
      ...defaultProperties.springConfig,
      ...animationProperties.springConfig,
    },
  };
};

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'children'
>;
export interface Props extends ButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  style?: React.CSSProperties;
  size?: number | string;
  animationProperties?: DarkModeSwitchAnimationProperties;
  moonColor?: string;
  sunColor?: string;
}

export const DarkModeSwitch: React.FC<Props> = ({
  onChange,
  checked = false,
  size = 24,
  animationProperties,
  moonColor = 'white',
  sunColor = 'black',
  style,
  onClick: onClickProp,
  role,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}) => {
  const [id] = React.useState(() => {
    REACT_TOGGLE_DARK_MODE_GLOBAL_ID += 1;
    return REACT_TOGGLE_DARK_MODE_GLOBAL_ID;
  });

  const properties = React.useMemo(
    () => resolveAnimationProperties(animationProperties),
    [animationProperties]
  );

  const { circle, svg, lines, mask } = properties[checked ? 'dark' : 'light'];
  const { springConfig } = properties;

  const svgContainerProps = useSpring({
    ...svg,
    config: springConfig,
  });
  const centerCircleProps = useSpring({
    ...circle,
    config: springConfig,
  });
  const maskedCircleProps = useSpring({
    ...mask,
    config: springConfig,
  });
  const linesProps = useSpring({
    ...lines,
    config: springConfig,
  });

  const toggle = React.useCallback(
    () => onChange(!checked),
    [checked, onChange]
  );
  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClickProp?.(event);

      if (!event.defaultPrevented) {
        toggle();
      }
    },
    [onClickProp, toggle]
  );

  const uniqueMaskId = `circle-mask-${id}`;

  return (
    <button
      type="button"
      role={role ?? 'switch'}
      aria-checked={checked}
      aria-label={ariaLabelledBy ? undefined : ariaLabel ?? 'Toggle dark mode'}
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex ?? 0}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: 0,
        border: 0,
        background: 'transparent',
        lineHeight: 0,
        ...style,
      }}
      {...rest}
    >
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        color={checked ? moonColor : sunColor}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        style={svgContainerProps}
      >
        <mask id={uniqueMaskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            // @ts-ignore
            style={maskedCircleProps}
            r="9"
            fill="black"
          />
        </mask>

        <animated.circle
          cx="12"
          cy="12"
          fill={checked ? moonColor : sunColor}
          style={centerCircleProps}
          mask={`url(#${uniqueMaskId})`}
        />
        <animated.g stroke="currentColor" style={linesProps}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </button>
  );
};
