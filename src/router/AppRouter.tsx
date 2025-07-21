import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header } from '../components/picklematch/header/Header';
import ProfilePage from '../pages/ProfilePage';
import CourtsPage from '../pages/CourtsPage';
import CartPage from '../pages/CartPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { RegistrationDemo } from '../pages/RegistrationDemo';
import { GraphQLDemo } from '../pages/GraphQLDemo';

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

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <AppMain>
          <Routes>
            <Route path="/" element={<Navigate to="/courts" replace />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute requireAuth={true}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/registration_demo" element={<RegistrationDemo />} />
            <Route path="/graphql_demo" element={<GraphQLDemo />} />
            <Route path="*" element={<Navigate to="/courts" replace />} />
          </Routes>
        </AppMain>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
