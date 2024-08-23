import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch, ThemeMode } from '../.';

const arrayN = (size: number) => {
  return new Array(size).fill(undefined);
}

const App = () => {
  const [themeMode, setThemeMode] = React.useState(ThemeMode.System);
  const [exampleAmount, setExampleAmount] = React.useState(0);

  const cycleThemeMode = (themeMode: ThemeMode) => {
    setThemeMode(themeMode);
  };

  const addExample = () => {
    setExampleAmount(prevValue => prevValue + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: themeMode === ThemeMode.Dark ? '#1b242c' : 'white', // TODO: fix this
        transition: '0.2s background',
      }}
    >
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        themeMode={themeMode}
        onChange={cycleThemeMode}
        size={120}
      />
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        themeMode={themeMode}
        onChange={cycleThemeMode}
        size={80}
      />
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        themeMode={themeMode}
        onChange={cycleThemeMode}
        moonColor="red"
        size={30}
      />
      {arrayN(exampleAmount).map(() => (
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          size={Math.floor(Math.random() * 60) + 1}
        />
      ))}
      <button onClick={addExample}>Add example</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
