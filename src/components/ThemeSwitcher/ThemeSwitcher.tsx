import React from 'react';
import { styled, css } from 'styled-components';
import { useTheme } from '../../styles/GlobalStyles';
import {
  responsiveFontSize,
  responsiveGap,
  responsivePadding,
  StyledButton,
  ResponsiveProps,
} from '../shared/ResponsiveStyles';

export interface ThemeSwitcherProps extends ResponsiveProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

// Default theme configurations
const defaultIcons = { light: '🌙', dark: '☀️' };
const defaultTexts = { light: 'Dark', dark: 'Light' };

// Styled components using shared utilities
const StyledThemeSwitcher = styled(StyledButton).withConfig({
  shouldForwardProp: (prop) => !['onThemeChange'].includes(prop),
})<ThemeSwitcherProps>`
  display: flex;
  align-items: center;
  ${responsiveGap('4px', '1vw', '8px')}
  ${responsivePadding('6px 12px', '1.2vw 2vw', '8px 16px')}
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    color: white;
    background-color: ${(props) => props.theme.colorPrimary};
  }
`;

const ThemeSwitcherIcon = styled.span<ResponsiveProps>`
  ${responsiveFontSize('14px', '1.6vw', '16px')}
  line-height: 1;
  flex-shrink: 0;
`;

const ThemeSwitcherText = styled.span<ResponsiveProps>`
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  line-height: 1;
  white-space: nowrap;

  ${css`
    @media (max-width: 360px) {
      display: none;
    }
  `}
`;

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, className, compact }) => {
  const { currentTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const icon = defaultIcons[currentTheme];
  const text = defaultTexts[currentTheme];

  return (
    <StyledThemeSwitcher
      onClick={toggleTheme}
      className={className}
      compact={compact}
      type="button"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      <ThemeSwitcherIcon compact={compact}>{icon}</ThemeSwitcherIcon>
      <ThemeSwitcherText compact={compact}>{text}</ThemeSwitcherText>
    </StyledThemeSwitcher>
  );
};
