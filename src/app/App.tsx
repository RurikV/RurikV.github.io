import React from 'react';
import { styled } from 'styled-components';
import '../i18n/config';
import { ThemeContextProvider } from '../styles/GlobalStyles';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/picklematch/header/Header';
import { CourtBookingApp } from '../components/picklematch/CourtBookingApp';

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

const AppContent: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <AppMain>
        <CourtBookingApp />
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
