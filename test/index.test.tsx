import * as React from 'react';
import { useSpring } from '@react-spring/web';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DarkModeSwitch, defaultProperties } from '../src';

vi.mock('@react-spring/web', async () => {
  const actual =
    await vi.importActual<typeof import('@react-spring/web')>('@react-spring/web');
  return {
    ...actual,
    useSpring: vi.fn((props: unknown) => props),
  };
});

describe('DarkModeSwitch', () => {
  it('renders without crashing', () => {
    // Keep this test React-version-agnostic for the CI matrix (16/17/18/19):
    // server rendering avoids client API differences like render/createRoot.
    const html = renderToStaticMarkup(
      <DarkModeSwitch onChange={() => {}} checked={false} />
    );

    expect(html).toContain('<svg');
  });

  it('does not mutate default animation properties when overridden', () => {
    const originalDarkTransform = defaultProperties.dark.svg.transform;
    const originalLightRadius = defaultProperties.light.circle.r;
    const originalTension = defaultProperties.springConfig.tension;

    renderToStaticMarkup(
      <DarkModeSwitch
        onChange={() => {}}
        checked={false}
        animationProperties={{
          dark: { svg: { transform: 'rotate(0deg)' } },
          springConfig: { tension: 1 },
        }}
      />
    );

    expect(defaultProperties.dark.svg.transform).toBe(originalDarkTransform);
    expect(defaultProperties.light.circle.r).toBe(originalLightRadius);
    expect(defaultProperties.springConfig.tension).toBe(originalTension);
  });

  it('merges custom animation properties with defaults', () => {
    const springMock = vi.mocked(useSpring);
    springMock.mockClear();

    renderToStaticMarkup(
      <DarkModeSwitch
        onChange={() => {}}
        checked={true}
        animationProperties={{
          dark: {
            svg: { transform: 'rotate(0deg)' },
            mask: { cx: '42%' },
          },
          springConfig: { tension: 1 },
        }}
      />
    );

    const [svgProps, circleProps, maskProps, linesProps] = springMock.mock.calls.map(
      ([props]) => props as any
    );
    const expectedConfig = {
      ...defaultProperties.springConfig,
      tension: 1,
    };

    expect(springMock).toHaveBeenCalledTimes(4);
    expect(svgProps.transform).toBe('rotate(0deg)');
    expect(svgProps.config).toEqual(expectedConfig);
    expect(circleProps.r).toBe(defaultProperties.dark.circle.r);
    expect(circleProps.config).toEqual(expectedConfig);
    expect(maskProps.cx).toBe('42%');
    expect(maskProps.cy).toBe(defaultProperties.dark.mask.cy);
    expect(linesProps.opacity).toBe(defaultProperties.dark.lines.opacity);
    expect(linesProps.config).toEqual(expectedConfig);
  });

  it('renders switch accessibility attributes by default', () => {
    const html = renderToStaticMarkup(
      <DarkModeSwitch onChange={() => {}} checked={true} />
    );

    expect(html).toContain('role="switch"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('aria-label="Toggle dark mode"');
    expect(html).toContain('tabindex="0"');
  });

  it('supports aria-labelledby without requiring an aria-label', () => {
    const html = renderToStaticMarkup(
      <DarkModeSwitch
        onChange={() => {}}
        checked={false}
        aria-labelledby="dark-mode-switch-label"
      />
    );

    expect(html).toContain('aria-labelledby="dark-mode-switch-label"');
    expect(html).not.toContain('aria-label="Toggle dark mode"');
  });

  it('generates unique mask ids across multiple instances', () => {
    const html = renderToStaticMarkup(
      <>
        <DarkModeSwitch onChange={() => {}} checked={false} />
        <DarkModeSwitch onChange={() => {}} checked={true} />
      </>
    );

    const ids = html.match(/circle-mask-\d+/g) || [];
    const uniqueIds = Array.from(new Set(ids));

    expect(uniqueIds.length).toBe(2);
  });
});
