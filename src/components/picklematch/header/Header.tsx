import React, { FC, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { HeaderProps, ProfileFormData, LoginFormData, RegisterFormData } from '../types';
import { Logo } from '../logo/Logo';
import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ProfileForm } from '../../../features/forms/ProfileForm';
import { AuthForm } from '../../../features/forms/AuthForm';

// Keyframe animations
const shimmer = keyframes`
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.12; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

// Styled components
const StyledHeader = styled.header<{ className?: string }>`
  position: sticky;
  top: 0;
  border-bottom: 1px solid;
  z-index: 100;
  padding: 16px 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(20px) saturate(180%);

  background-color: ${(props) => props.theme.colorBgPrimary};
  border-bottom-color: ${(props) => props.theme.colorBorder};
  box-shadow: ${(props) => props.theme.shadow};

  // Enhanced gradient overlay with animated shimmer effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.08;
    pointer-events: none;
    background: linear-gradient(
      135deg,
      rgba(0, 123, 255, 0.15),
      rgba(108, 117, 125, 0.1),
      rgba(255, 193, 7, 0.05),
      rgba(40, 167, 69, 0.08)
    );
    animation: ${shimmer} 8s ease-in-out infinite;
  }

  // Responsive design
  @media (max-width: 1024px) {
    padding: 14px 0;
  }

  @media (max-width: 768px) {
    padding: 12px 0;
  }

  @media (max-width: 640px) {
    padding: 10px 0;
  }

  @media (max-width: 480px) {
    padding: 8px 0;
  }

  @media (max-width: 360px) {
    padding: 6px 0;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  min-height: 60px;

  @media (max-width: 1024px) {
    padding: 0 20px;
    min-height: 56px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    min-height: 52px;
  }

  @media (max-width: 640px) {
    padding: 0 12px;
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
    min-height: 44px;
  }

  @media (max-width: 360px) {
    padding: 0 6px;
    min-height: 40px;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 24px);
  flex-wrap: nowrap;
  flex-shrink: 0;

  // Enhanced glassmorphism effect
  padding: 10px 20px;
  border-radius: 16px;
  backdrop-filter: blur(15px) saturate(150%);
  border: 1px solid;

  background-color: ${(props) => props.theme.colorBgSecondary};
  border-color: ${(props) => props.theme.colorBorder};

  // Advanced transitions with spring physics
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  // Enhanced hover effects with multiple transforms
  &:hover {
    transform: translateY(-2px) scale(1.02);
    backdrop-filter: blur(20px) saturate(180%);

    // Subtle glow effect on hover using box-shadow
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.2), 0 0 40px rgba(108, 117, 125, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  // Subtle pulse animation
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent);
    animation: ${pulse} 3s ease-in-out infinite;
    pointer-events: none; // Prevent blocking interactions with dropdown
  }

  @media (max-width: 1024px) {
    padding: 8px 16px;
    gap: clamp(6px, 1.8vw, 20px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    gap: clamp(4px, 1.5vw, 16px);
    flex-shrink: 0;
    max-width: none;
  }

  @media (max-width: 640px) {
    padding: 4px 8px;
    gap: clamp(3px, 1.2vw, 12px);
    flex-wrap: nowrap;
  }

  @media (max-width: 480px) {
    padding: 3px 6px;
    gap: clamp(2px, 1vw, 8px);
    flex-shrink: 0;
  }

  @media (max-width: 360px) {
    padding: 2px 4px;
    gap: clamp(1px, 0.8vw, 6px);
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const HeaderLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-size: clamp(12px, 1.5vw, 15px);
  padding: clamp(6px, 1vw, 12px) clamp(8px, 1.5vw, 16px);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 0;

  color: ${(props) => props.theme.colorTextSecondary};

  // Enhanced hover effects with multiple animations
  &:hover {
    transform: translateY(-2px) scale(1.05);
    color: ${(props) => props.theme.colorPrimary};
    background-color: ${(props) => props.theme.colorBgTertiary};

    // Multi-layered glow effect
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.3), 0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);

    // Animate the shine effect
    &::before {
      transform: translateX(100%);
    }

    // Subtle border glow
    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
    color: white;
    background-color: ${(props) => props.theme.colorPrimary};

    box-shadow: 0 0 10px rgba(0, 123, 255, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  // Animated shine effect that moves on hover
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: transform 0.6s ease;
    z-index: 1;
    pointer-events: none; // Prevent blocking interactions with dropdown
  }

  // Subtle border glow effect
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 1px solid rgba(0, 123, 255, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  // Ensure text stays above effects
  & > * {
    position: relative;
    z-index: 2;
  }
`;

// Modal/Popup styled components
const ModalOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: ${(props) => (props.isVisible ? 'fadeIn 0.3s ease-out' : 'none')};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.colorBgPrimary || '#ffffff'};
  color: ${(props) => props.theme.colorTextPrimary || '#2c3e50'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 1001;

  &:hover {
    background-color: ${(props) => props.theme.colorBgSecondary || '#f8f9fa'};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Header: FC<HeaderProps> = ({ className }) => {
  const { t } = useLanguage();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    setIsAuthModalOpen(false);
  };

  const handleProfileSubmit = (values: ProfileFormData) => {
    console.log('[DEBUG_LOG] Profile updated from header:', values);
    // Close modal after successful submission
    setIsProfileModalOpen(false);
  };

  const handleLoginSubmit = (values: LoginFormData) => {
    console.log('[DEBUG_LOG] Login submitted from header:', values);
    // Close modal after successful submission
    setIsAuthModalOpen(false);
  };

  const handleRegisterSubmit = (values: RegisterFormData) => {
    console.log('[DEBUG_LOG] Registration submitted from header:', values);
    // Close modal after successful submission
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <StyledHeader className={className}>
        <HeaderContainer>
          <Logo />
          <HeaderNav>
            <HeaderLink href="javascript:void(0)">{t('courts')}</HeaderLink>
            <HeaderLink href="javascript:void(0)">{t('booking')}</HeaderLink>
            <HeaderLink href="javascript:void(0)" onClick={handleProfileClick}>
              {t('profile')}
            </HeaderLink>
            <HeaderLink href="javascript:void(0)" onClick={handleAuthClick}>
              {t('login')}
            </HeaderLink>
            <LanguageSwitcher className="language-switcher--compact" />
            <ThemeSwitcher className="theme-switcher--compact" />
          </HeaderNav>
        </HeaderContainer>
      </StyledHeader>

      {/* Profile Form Modal */}
      <ModalOverlay isVisible={isProfileModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal} aria-label="Close profile form">
            ×
          </CloseButton>
          <ProfileForm onSubmit={handleProfileSubmit} initialValues={{ name: '', about: '' }} />
        </ModalContent>
      </ModalOverlay>

      {/* Auth Form Modal */}
      <ModalOverlay isVisible={isAuthModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal} aria-label="Close auth form">
            ×
          </CloseButton>
          <AuthForm mode="login" onLoginSubmit={handleLoginSubmit} onRegisterSubmit={handleRegisterSubmit} />
        </ModalContent>
      </ModalOverlay>
    </>
  );
};
