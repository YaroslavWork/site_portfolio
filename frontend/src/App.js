import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import { useSystemTheme } from './features/hooks/useSystemTheme.hooks';
import { HomePage } from './pages/HomePage/HomePage';

import { GlobalStateProvider } from './features/hooks/globalStateContext';
import GlobalKeyboardListener from './features/hooks/globalKeyboardListener';
import { AboutMePage } from './pages/AboutMePage/AboutMePage';
import { SkillsPage } from './pages/SkillsPage/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { WorkExperiencePage } from './pages/WorkExperiencePage/WorkExperiencePage';
import { EducationPage } from './pages/EducationPage/EducationPage';
import { ContactPage } from './pages/ContactPage/ContactPage';

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
        <Route path="/about_me" element={<AboutMePage/>} />
        <Route path="/skills" element={<SkillsPage/>} />
        <Route path="/projects" element={<ProjectsPage/>} />
        <Route path="/work_experience" element={<WorkExperiencePage/>} />
        <Route path="/education" element={<EducationPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
