import React, { useEffect, useState } from 'react';
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
import { CompanyPage } from './pages/CompanyPage/CompanyPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  const systemTheme = useSystemTheme();

  const [language, setLanguage] = useState('en');

  function changeLanguage(language) {
    setLanguage(language);
  }

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
              <HomePage language={language} />
          </GlobalStateProvider>
        }></Route>
        <Route path="/about_me" element={<AboutMePage language={language}/>} />
        <Route path="/skills" element={<SkillsPage language={language}/>} />
        <Route path="/projects" element={<ProjectsPage language={language}/>} />
        <Route path="/work_experience" element={<WorkExperiencePage language={language}/>} />
        <Route path="/education" element={<EducationPage language={language}/>} />
        <Route path="/contact" element={<ContactPage language={language}/>} />
        <Route path='/company/:companyCode' element={
          <GlobalStateProvider>
            <GlobalKeyboardListener />
              <CompanyPage language={language}/>
          </GlobalStateProvider>
        } />
        <Route path="*" element={<NotFoundPage language={language}/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
