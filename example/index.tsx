import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client'; 
import { DarkModeSwitch, ThemeMode, DarkModeSwitchHandle } from '../.';

export const customColors = {
  halfSunLeftFill: '#3790f0',
  halfSunLeftStroke: '#185ba3',
  halfSunLeftBeamStroke: '#3bb81f',
  halfMoonRightFill: '#c957fa',
  halfMoonRightStroke: '#661887',
  halfMoonRightBeamStroke: '#f58caf',
  sunFill: '#ffbc33',
  sunStroke: '#784713',
  sunBeamStroke: '#5c190c',
  moonFill: '#ffdb9e',
  moonStroke: '#f0cd51',
};

const App = () => {
  const [themeMode, setThemeMode] = React.useState(ThemeMode.System);
  const [isSystemThemeModeEnabled, setIsSystemThemeModeEnabled] = React.useState(true);
  const darkModeSwitchRef = React.useRef<DarkModeSwitchHandle>(null);
  
  const cycleThemeMode = (themeMode: ThemeMode) => {
    setThemeMode(themeMode);
  };

  const toggleisSystemThemeModeEnabled = () => {
    if (themeMode === ThemeMode.System) {
      setThemeMode(ThemeMode.Light);
    }
    setIsSystemThemeModeEnabled(prevState => !prevState);
  };

  const triggerClick = () => {
    if (darkModeSwitchRef.current) {
      darkModeSwitchRef.current.click();
    }
  };

  const sizesToDemo = [200, 120, 80, 30]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '15vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
      }}>
        <h1>react-toggle-dark-mode</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
      }}>
        <input
          type="checkbox"
          checked={isSystemThemeModeEnabled}
          onChange={toggleisSystemThemeModeEnabled}
        />
        <label><strong>isSystemThemeModeEnabled</strong></label>
        <button onClick={triggerClick}>Trigger Click</button>
      </div>
        </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '85vh',
          overflow: 'hidden',
        }}>
          <div
            style={{
              width: '50vw',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5em',
              background: '#eee',
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
            <h2 style={{color: '#1b242c'}}>Default</h2>
             {sizesToDemo.map((size) => 
              (<DarkModeSwitch
                key={size}
                ref={darkModeSwitchRef}
                size={size}
                onChange={cycleThemeMode}
                isSystemThemeModeEnabled={isSystemThemeModeEnabled}
                themeMode={themeMode}
              />)
             )}
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
            <h2 style={{color: '#1b242c'}}>Customised</h2>
            {sizesToDemo.map((size) => 
              (<DarkModeSwitch
                key={size}
                ref={darkModeSwitchRef}
                size={size}
                onChange={cycleThemeMode}
                isSystemThemeModeEnabled={isSystemThemeModeEnabled}
                themeMode={themeMode}
                colors={customColors}
              />)
             )}
            </div>
          </div>
          <div
            style={{
              width: '50vw',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5em',
              background: '#1b242c',
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
            <h2 style={{color: '#eee'}}>Default</h2>
            {sizesToDemo.map((size) => 
              (<DarkModeSwitch
                key={size}
                ref={darkModeSwitchRef}
                size={size}
                onChange={cycleThemeMode}
                isSystemThemeModeEnabled={isSystemThemeModeEnabled}
                themeMode={themeMode}
              />)
             )}
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
            <h2 style={{color: '#eee'}}>Customised</h2>
            {sizesToDemo.map((size) => 
              (<DarkModeSwitch
                key={size}
                ref={darkModeSwitchRef}
                size={size}
                onChange={cycleThemeMode}
                isSystemThemeModeEnabled={isSystemThemeModeEnabled}
                themeMode={themeMode}
                colors={customColors}
              />)
             )}
            </div>
          </div>
        </div>
      </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
