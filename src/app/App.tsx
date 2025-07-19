import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../styles/themes.css';
import '../i18n/config';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('app_text')}</p>
      </header>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
