import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DarkModeSwitch, ThemeMode } from '../src';

describe('DarkModeSwitch', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders and unmounts without crashing', () => {
    const { unmount } = render(
      <DarkModeSwitch onChange={() => {}} themeMode={ThemeMode.System} />
    );
    unmount();
  });
});
