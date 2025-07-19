import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcher.css';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-switcher ${className || ''}`}
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span className="theme-switcher__icon">{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className="theme-switcher__text">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );
};
