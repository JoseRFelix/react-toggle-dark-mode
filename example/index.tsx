import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from '../.';

const App = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
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
        checked={isDarkMode}
        onChange={toggleDarkMode}
        moonColor="red"
        size={30}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
