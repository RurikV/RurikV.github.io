import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../styles/themes.scss';
import '../i18n/config';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/picklematch/header/Header';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('app_text')}</p>
      </main>
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
