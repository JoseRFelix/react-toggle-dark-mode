import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DarkModeSwitch } from '../src';

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
    setToggleAmount((prevValue) => prevValue + 1);
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
      {arrayN(toggleAmount).map((_, index) => (
        <DarkModeSwitch
          key={index}
          style={{ marginBottom: '2rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={Math.floor(Math.random() * 20) + 20}
        />
      ))}
      <button onClick={addToggle}>Add toggle</button>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Unable to find root element');
}

createRoot(rootElement).render(<App />);
