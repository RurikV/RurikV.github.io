import React from 'react';
import { Provider } from 'react-redux';
import '../i18n/config';
import { ThemeContextProvider } from '../styles/GlobalStyles';
import { LanguageProvider } from '../contexts/LanguageContext';
import { store } from '../store';
import AppRouter from '../router/AppRouter';
import AppInitializer from './AppInitializer';

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <LanguageProvider>
          <AppInitializer>
            <AppRouter />
          </AppInitializer>
        </LanguageProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
