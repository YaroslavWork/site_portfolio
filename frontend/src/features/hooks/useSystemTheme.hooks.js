import { useState, useEffect } from 'react';

export const useSystemTheme = () => {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  
  const [theme, setTheme] = useState(
    darkThemeMq.matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    darkThemeMq.addEventListener('change', handleThemeChange);

    return () => {
      darkThemeMq.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return theme;
};