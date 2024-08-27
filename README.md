<div align="center">
  <h1>React Toggle Dark Mode</h1>
</div>
<p>
  <a href="https://www.npmjs.com/package/react-toggle-dark-mode" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-toggle-dark-mode.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a> 
  <a href="http://makeapullrequest.com" target="_blank">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
  </a>
  <img alt="Bundle size" src="https://badgen.net/bundlephobia/minzip/react-toggle-dark-mode" /> 
</p>

> 🌃 Animated dark mode toggle as seen in blogs!

![Interactive sun and moon transition](./docs/demo.gif)

## Prerequisites

- node >=20

## Installation

```shell
npm i react-toggle-dark-mode
```

or with Yarn:

```shell
yarn add react-toggle-dark-mode
```

## Usage

### 3-state (System, Light, Dark)

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch, ThemeMode } from 'react-toggle-dark-mode';

const App = () => {
  const [themeMode, setThemeMode] = React.useState(ThemeMode.System);

  const cycleThemeMode = (themeMode: ThemeMode) => {
    setThemeMode(themeMode);
  };

  return (
    <DarkModeSwitch
      onChange={cycleThemeMode}
      isSystemThemeModeEnabled={true}
      themeMode={themeMode}
      size={120}
    />
  );
};
```

### 2-state (Light, Dark)

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch, ThemeMode } from 'react-toggle-dark-mode';

const App = () => {
  const [themeMode, setThemeMode] = React.useState(ThemeMode.Light);

  const toggleThemeMode = (themeMode: ThemeMode) => {
    toggleThemeMode(themeMode);
  };

  return (
    <DarkModeSwitch
      onChange={toggleThemeMode}
      isSystemThemeModeEnabled={false}
      themeMode={themeMode}
      size={120}
    />
  );
};
```

## API

### DarkModeSwitch

#### Props

| Name                      | Type                             | Default Value                                            | Description                                   |
| ------------------------- | -------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| onChange                  | \(themeMode: ThemeMode\) => void |                                                          | Event that triggers when icon is clicked.     |
| isSystemThemeModeEnabled  | boolean                          | true                                                     | If the system theme mode is enabled.          |
| themeMode                 | ThemeMode                        | ThemeMode.System (or ThemeMode.Light if System disabled) | Current theme mode.                           |
| style                     | Object                           |                                                          | Custom SVG styling \(CSS properties object\). |
| size                      | number                           | 24                                                       | SVG size.                                     |
| colors                    | Partial<ColorOptions>            | defaultColors \(see below\)                              | Override default colors.                      |
| animationProperties       | AnimationProperties              | defaultProperties \(see below\)                          | Override default animation properties.        |

### Default Colors
```javascript
const defaultColors: ColorOptions = {
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
```

### Default Animation Properties

```javascript
const defaultProperties: AnimationProperties = {
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
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jfelix.info"><img src="https://avatars1.githubusercontent.com/u/21092519?s=460&u=55be9996a2652c79880c62ad50d06e17639456e8&v=4" width="100px;" alt=""/><br /><sub><b>Jose Felix</b></sub></a><br /><a href="https://github.com/JoseRFelix/react-toggle-dark-mode/commits?author=JoseRFelix" title="Code">💻</a> <a href="https://github.com/JoseRFelix/react-toggle-dark-mode/commits?author=JoseRFelix" title="Documentation">📖</a> <a href="https://github.com/JoseRFelix/react-toggle-dark-mode/commits?author=JoseRFelix" title="Tests">⚠️</a></td>    
  </tr>  
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## Show your support

Give a ⭐️ if this project helped you!
