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

- node >=10

## Installation

```shell
npm i react-toggle-dark-mode
```

or with Yarn:

```shell
yarn add react-toggle-dark-mode
```

## Usage

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const App = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={120}
    />
  );
};
```

## API

### DarkModeSwitch

#### Props

| Name                | Type                         | Default Value                   | Description                               |
| ------------------- | ---------------------------- | ------------------------------- | ----------------------------------------- |
| onChange            | \(checked: boolean\) => void |                                 | Event that triggers when icon is clicked. |
| checked             | boolean                      | false                           | Current icon state.                       |
| style               | Object                       |                                 | CSS properties object.                    |
| size                | number                       | 24                              | SVG size.                                 |
| animationProperties | Object                       | defaultProperties \(see below\) | Override default animation properties.    |
| moonColor           | string                       | white                           | Color of the moon.                        |
| sunColor            | string                       | black                           | Color of the sun.                         |

### Default Animation Properties

```javascript
const defaultProperties = {
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
