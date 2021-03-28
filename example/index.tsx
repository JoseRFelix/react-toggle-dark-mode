import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from '../.';

function arrayN(size: number) {
  return new Array(size).fill(undefined);
}

const App = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const [toggleAmount, setToggleAmount] = React.useState(0);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const addToggle = () => {
    setToggleAmount(prevValue => prevValue + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: isDarkMode ? '#1b242c' : 'white',
        transition: '0.2s background',
      }}
    >
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={120}
      />
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={80}
      />
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        moonColor="red"
        size={30}
      />
      {arrayN(toggleAmount).map(() => (
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={Math.floor(Math.random() * 60) + 1}
        />
      ))}
      <button onClick={addToggle}>Add toggle</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
