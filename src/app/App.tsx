import React from 'react';
import '../i18n/config';
import { ThemeContextProvider } from '../styles/GlobalStyles';
import { LanguageProvider } from '../contexts/LanguageContext';
import AppRouter from '../router/AppRouter';

function App() {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </ThemeContextProvider>
  );
}

export default App;
