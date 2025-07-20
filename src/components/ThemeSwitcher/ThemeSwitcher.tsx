import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../styles/GlobalStyles';

export interface ThemeSwitcherProps {
  className?: string;
}

// Styled components
const StyledThemeSwitcher = styled.button<{ className?: string }>`
  display: flex;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
  padding: clamp(6px, 1.2vw, 8px) clamp(12px, 2vw, 16px);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  border: 1px solid;
  min-height: 44px; // Minimum touch target size for accessibility
  white-space: nowrap;

  background-color: ${(props) => props.theme.colorBgSecondary};
  border-color: ${(props) => props.theme.colorBorder};
  color: ${(props) => props.theme.colorTextPrimary};

  &:hover {
    transform: translateY(-1px);
    background-color: ${(props) => props.theme.colorBgTertiary};
    border-color: ${(props) => props.theme.colorPrimary};
  }

  &:active {
    transform: translateY(0);
    color: white;
    background-color: ${(props) => props.theme.colorPrimary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  /* Responsive breakpoints matching Header component */
  @media (max-width: 1024px) {
    padding: clamp(5px, 1vw, 7px) clamp(10px, 1.8vw, 14px);
    font-size: clamp(11px, 1.3vw, 13px);
    gap: clamp(3px, 0.9vw, 7px);
  }

  @media (max-width: 768px) {
    padding: clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 12px);
    font-size: clamp(10px, 1.2vw, 12px);
    gap: clamp(2px, 0.8vw, 6px);
    min-height: 40px;
  }

  @media (max-width: 640px) {
    padding: clamp(3px, 0.7vw, 5px) clamp(6px, 1.2vw, 10px);
    font-size: clamp(9px, 1.1vw, 11px);
    gap: clamp(2px, 0.7vw, 5px);
    min-height: 38px;
  }

  @media (max-width: 480px) {
    padding: clamp(2px, 0.6vw, 4px) clamp(4px, 1vw, 8px);
    font-size: clamp(8px, 1vw, 10px);
    gap: clamp(1px, 0.6vw, 4px);
    min-height: 36px;
  }

  @media (max-width: 360px) {
    padding: clamp(2px, 0.5vw, 3px) clamp(3px, 0.8vw, 6px);
    font-size: clamp(7px, 0.9vw, 9px);
    gap: clamp(1px, 0.5vw, 3px);
    min-height: 34px;
  }

  /* Compact version for header - now works with responsive design */
  &.theme-switcher--compact {
    padding: clamp(2px, 0.8vw, 6px) clamp(6px, 1.5vw, 12px);
    font-size: clamp(8px, 1.2vw, 12px);

    @media (max-width: 480px) {
      padding: clamp(1px, 0.5vw, 3px) clamp(3px, 0.8vw, 6px);
      font-size: clamp(7px, 0.9vw, 9px);
    }
  }
`;

const ThemeSwitcherIcon = styled.span`
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    font-size: clamp(13px, 1.5vw, 15px);
  }

  @media (max-width: 768px) {
    font-size: clamp(12px, 1.4vw, 14px);
  }

  @media (max-width: 640px) {
    font-size: clamp(11px, 1.3vw, 13px);
  }

  @media (max-width: 480px) {
    font-size: clamp(10px, 1.2vw, 12px);
  }

  @media (max-width: 360px) {
    font-size: clamp(9px, 1.1vw, 11px);
  }

  .theme-switcher--compact & {
    font-size: clamp(10px, 1.4vw, 14px);

    @media (max-width: 480px) {
      font-size: clamp(9px, 1.1vw, 11px);
    }
  }
`;

const ThemeSwitcherText = styled.span`
  font-size: clamp(12px, 1.4vw, 14px);
  line-height: 1;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: clamp(11px, 1.3vw, 13px);
  }

  @media (max-width: 768px) {
    font-size: clamp(10px, 1.2vw, 12px);
  }

  @media (max-width: 640px) {
    font-size: clamp(9px, 1.1vw, 11px);
  }

  @media (max-width: 480px) {
    font-size: clamp(8px, 1vw, 10px);
  }

  @media (max-width: 360px) {
    display: none; /* Hide text on very small screens to save space */
  }

  .theme-switcher--compact & {
    font-size: clamp(8px, 1.2vw, 12px);

    @media (max-width: 480px) {
      font-size: clamp(7px, 0.9vw, 9px);
    }

    @media (max-width: 360px) {
      display: none; /* Hide text in compact mode on very small screens */
    }
  }
`;

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { currentTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <StyledThemeSwitcher
      onClick={toggleTheme}
      className={className}
      type="button"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      <ThemeSwitcherIcon>{currentTheme === 'light' ? '🌙' : '☀️'}</ThemeSwitcherIcon>
      <ThemeSwitcherText>{currentTheme === 'light' ? 'Dark' : 'Light'}</ThemeSwitcherText>
    </StyledThemeSwitcher>
  );
};
