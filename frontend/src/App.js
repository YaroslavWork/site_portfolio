import React, { useEffect } from 'react';

import './App.css';

import { useEducationData } from './features/hooks/index.hooks';
import { useSystemTheme } from './hooks/useSystemTheme';
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  const systemTheme = useSystemTheme();

  const activeTheme = systemTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  return (
    <>
    <HomePage />
    </>
  );
}

export default App;
