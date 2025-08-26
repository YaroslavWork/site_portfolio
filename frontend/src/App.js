import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={
          <GlobalStateProvider>
            <GlobalKeyboardListener />
              <HomePage />
          </GlobalStateProvider>
        }></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
