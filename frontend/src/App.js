import React, { useEffect } from 'react';

import './App.css';

import { useSystemTheme } from './features/hooks/useSystemTheme.hooks';
import { HomePage } from './pages/HomePage/HomePage';

import { GlobalStateProvider } from './features/hooks/globalStateContext';
import GlobalKeyboardListener from './features/hooks/globalKeyboardListener';

function App() {
  const systemTheme = useSystemTheme();

  const activeTheme = systemTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  return (
    <>
    <GlobalStateProvider>
      <GlobalKeyboardListener />
        <HomePage />
    </GlobalStateProvider>
    </>
  );
}

export default App;
