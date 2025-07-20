import React from 'react';
import { styled, keyframes } from 'styled-components';
import logo from './logo.svg';
import '../i18n/config';
import { ThemeContextProvider } from '../styles/GlobalStyles';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/picklematch/header/Header';

// Keyframe animations
const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppMain = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoSpin} infinite 20s linear;
  }
`;

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <AppContainer>
      <Header />
      <AppMain>
        <AppLogo src={logo} alt="logo" />
        <p>{t('app_text')}</p>
      </AppMain>
    </AppContainer>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeContextProvider>
  );
}

export default App;
