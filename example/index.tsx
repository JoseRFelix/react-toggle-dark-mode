import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client'; 
import { DarkModeSwitch, ThemeMode } from '../.';

export const customColors = {
  halfSunLeftFill: '#3790f0',
  halfSunLeftStroke: '#185ba3',
  halfSunRightFill: '#c957fa',
  halfSunRightStroke: '#661887',
  halfSunLeftBeamStroke: '#3bb81f',
  halfSunRightBeamStroke: '#f58caf',
  sunFill: '#ffbc33',
  sunStroke: '#784713',
  sunBeamStroke: '#5c190c',
  moonFill: '#ffdb9e',
  moonStroke: '#f0cd51',
};

const App = () => {
  const [themeMode, setThemeMode] = React.useState(ThemeMode.System);

  const cycleThemeMode = (themeMode: ThemeMode) => {
    setThemeMode(themeMode);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5em',
        background: themeMode === ThemeMode.Dark ? '#1b242c' : '#eee',
        transition: '0.2s background',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2em',
        }}
      >
        <h1 style={{color: themeMode === ThemeMode.Dark ? '#eee' : '#1b242c'}}>Default</h1>
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          size={200}
        />
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
          size={30}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2em',
        }}
      >
        <h1 style={{color: themeMode === ThemeMode.Dark ? '#eee' : '#1b242c'}}>Customised</h1>
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          colors={customColors}
          size={200}
        />
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          colors={customColors}
          size={120}
        />
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          colors={customColors}
          size={80}
        />
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          themeMode={themeMode}
          onChange={cycleThemeMode}
          colors={customColors}
          size={30}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
