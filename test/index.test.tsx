import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DarkModeSwitch, ThemeMode } from '../src';

describe('DarkModeSwitch', () => {
  afterEach(() => {
    cleanup();
  });

  describe('renders and unmounts without crashing', () => {
    it('system theme', () => {
      const { unmount } = render(
        <DarkModeSwitch onChange={() => {}} themeMode={ThemeMode.System} />
      );
      unmount();
    });

    it('light theme', () => {
      const { unmount } = render(
        <DarkModeSwitch onChange={() => {}} themeMode={ThemeMode.Light} />
      );
      unmount();
    });

    it('dark theme', () => {
      const { unmount } = render(
        <DarkModeSwitch onChange={() => {}} themeMode={ThemeMode.Dark} />
      );
      unmount();
    });
  });
});
