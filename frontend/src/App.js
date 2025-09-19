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
import { useSystemLanguage } from './features/hooks/useSystemLanguage';

function choosePossibleLanguages(language) {
  if (language === 'uk' | language === 'ua') {
      return 'ua';
    } else if (language === 'pl') {
      return 'pl';
    } else {
      return 'en';
    }
}

function App() {
  const systemTheme = useSystemTheme();
  const systemLanguage = useSystemLanguage();

  const [theme, setTheme] = useState(systemTheme);
  const [language, setLanguage] = useState(systemLanguage);
  const [isThemeSetManually, setIsThemeSetManually] = useState(false);
  const [isLanguageSetManually, setIsLanguageSetManually] = useState(false);

  // Use useEffect to sync local state with system values
  useEffect(() => {
    changeTheme(systemTheme);
  }, [systemTheme]);

  useEffect(() => {
    changeLanguage(systemLanguage);
  }, [systemLanguage]);

  console.log(`Theme: ${theme}`);
  console.log(`Language: ${language}`);

  function changeTheme(newTheme, isUserAction=false) {
    if (!isUserAction && isLanguageSetManually) return;
    if (isUserAction) {
      if (newTheme === 'default') {
        setTheme(systemTheme);
        setIsThemeSetManually(false);
        return;
      } else {
        setTheme(newTheme);
        setIsThemeSetManually(true);
      }
    }
    setTheme(newTheme);
  }

  function changeLanguage(newLanguage, isUserAction=false) {
    if (!isUserAction && isLanguageSetManually) return;
    if (isUserAction) {
      if (newLanguage === 'default') {
        setLanguage(choosePossibleLanguages(systemLanguage));
        setIsLanguageSetManually(false);
        return;
      } else {
        setLanguage(choosePossibleLanguages(newLanguage));
        setIsLanguageSetManually(true);
      }
    }
    setLanguage(choosePossibleLanguages(newLanguage));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Use a separate useEffect for the language attribute
  useEffect(() => {
    if (language) {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  if (language === null) {
    return <div>Loading language...</div>;
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={
          <GlobalStateProvider>
            <GlobalKeyboardListener />
              <HomePage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>
          </GlobalStateProvider>
        }></Route>
        <Route path="/about_me" element={<AboutMePage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path="/skills" element={<SkillsPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path="/projects" element={<ProjectsPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path="/work_experience" element={<WorkExperiencePage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path="/education" element={<EducationPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path="/contact" element={<ContactPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
        <Route path='/company/:companyCode' element={
          <GlobalStateProvider>
            <GlobalKeyboardListener />
              <CompanyPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>
          </GlobalStateProvider>
        } />
        <Route path="*" element={<NotFoundPage language={language} onChangeLanguage={changeLanguage} onChangeTheme={changeTheme}/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
