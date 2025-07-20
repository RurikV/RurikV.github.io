import React from 'react';
import { styled } from 'styled-components';
import { useLanguage, Language } from '../../contexts/LanguageContext';

export interface LanguageSwitcherProps {
  className?: string;
}

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
];

// Styled components
const LanguageSwitcherContainer = styled.div<{ className?: string }>`
  display: flex;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
  font-size: clamp(12px, 1.4vw, 14px);
  white-space: nowrap;

  /* Responsive breakpoints matching Header component */
  @media (max-width: 1024px) {
    gap: clamp(3px, 0.9vw, 7px);
    font-size: clamp(11px, 1.3vw, 13px);
  }

  @media (max-width: 768px) {
    gap: clamp(2px, 0.8vw, 6px);
    font-size: clamp(10px, 1.2vw, 12px);
  }

  @media (max-width: 640px) {
    gap: clamp(2px, 0.7vw, 5px);
    font-size: clamp(9px, 1.1vw, 11px);
  }

  @media (max-width: 480px) {
    gap: clamp(1px, 0.6vw, 4px);
    font-size: clamp(8px, 1vw, 10px);
  }

  @media (max-width: 360px) {
    gap: clamp(1px, 0.5vw, 3px);
    font-size: clamp(7px, 0.9vw, 9px);
  }

  /* Compact version for header - now works with responsive design */
  &.language-switcher--compact {
    font-size: clamp(8px, 1.2vw, 12px);
    gap: clamp(2px, 0.8vw, 6px);

    @media (max-width: 480px) {
      font-size: clamp(7px, 0.9vw, 9px);
      gap: clamp(1px, 0.5vw, 3px);
    }
  }
`;

const LanguageSwitcherLabel = styled.label`
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: clamp(12px, 1.4vw, 14px);
  flex-shrink: 0;

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
    display: none; /* Hide label on very small screens to save space */
  }

  .language-switcher--compact & {
    font-size: clamp(8px, 1.2vw, 12px);

    @media (max-width: 480px) {
      font-size: clamp(7px, 0.9vw, 9px);
    }

    @media (max-width: 360px) {
      display: none; /* Hide label in compact mode on very small screens */
    }
  }
`;

const LanguageSwitcherSelect = styled.select`
  padding: clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 12px);
  border-radius: 4px;
  font-size: clamp(12px, 1.4vw, 14px);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(80px, 15vw, 120px);
  max-width: clamp(120px, 20vw, 160px);
  border: 1px solid;
  min-height: 44px; /* Minimum touch target size for accessibility */
  white-space: nowrap;

  background-color: ${(props) => props.theme.colorBgSecondary};
  border-color: ${(props) => props.theme.colorBorder};
  color: ${(props) => props.theme.colorTextPrimary};

  &:hover {
    background-color: ${(props) => props.theme.colorBgTertiary};
    border-color: ${(props) => props.theme.colorPrimary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    border-color: ${(props) => props.theme.colorPrimary};
  }

  option {
    padding: clamp(4px, 1vw, 8px);
    background-color: ${(props) => props.theme.colorBgPrimary};
    color: ${(props) => props.theme.colorTextPrimary};
    font-size: clamp(12px, 1.4vw, 14px);
  }

  /* Responsive breakpoints matching Header component */
  @media (max-width: 1024px) {
    padding: clamp(3px, 0.7vw, 5px) clamp(6px, 1.3vw, 10px);
    font-size: clamp(11px, 1.3vw, 13px);
    min-width: clamp(70px, 14vw, 110px);
    max-width: clamp(110px, 18vw, 140px);
    min-height: 40px;
  }

  @media (max-width: 768px) {
    padding: clamp(2px, 0.6vw, 4px) clamp(4px, 1.2vw, 8px);
    font-size: clamp(10px, 1.2vw, 12px);
    min-width: clamp(60px, 12vw, 100px);
    max-width: clamp(100px, 16vw, 120px);
    min-height: 38px;
  }

  @media (max-width: 640px) {
    padding: clamp(2px, 0.5vw, 3px) clamp(3px, 1vw, 6px);
    font-size: clamp(9px, 1.1vw, 11px);
    min-width: clamp(50px, 10vw, 90px);
    max-width: clamp(90px, 14vw, 110px);
    min-height: 36px;
  }

  @media (max-width: 480px) {
    padding: clamp(1px, 0.4vw, 2px) clamp(2px, 0.8vw, 4px);
    font-size: clamp(8px, 1vw, 10px);
    min-width: clamp(40px, 8vw, 80px);
    max-width: clamp(80px, 12vw, 100px);
    min-height: 34px;
  }

  @media (max-width: 360px) {
    padding: clamp(1px, 0.3vw, 2px) clamp(2px, 0.6vw, 3px);
    font-size: clamp(7px, 0.9vw, 9px);
    min-width: clamp(35px, 6vw, 70px);
    max-width: clamp(70px, 10vw, 90px);
    min-height: 32px;
  }

  /* Compact version for header - now works with responsive design */
  .language-switcher--compact & {
    padding: clamp(2px, 0.6vw, 4px) clamp(4px, 1.2vw, 8px);
    font-size: clamp(8px, 1.2vw, 12px);
    min-width: clamp(60px, 12vw, 100px);
    max-width: clamp(100px, 16vw, 120px);

    @media (max-width: 480px) {
      padding: clamp(1px, 0.3vw, 2px) clamp(2px, 0.6vw, 3px);
      font-size: clamp(7px, 0.9vw, 9px);
      min-width: clamp(35px, 6vw, 70px);
      max-width: clamp(70px, 10vw, 90px);
    }
  }
`;

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as Language);
  };

  return (
    <LanguageSwitcherContainer className={className}>
      <LanguageSwitcherLabel htmlFor="language-select">{t('language')}:</LanguageSwitcherLabel>
      <LanguageSwitcherSelect
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        aria-label="Select language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.flag} {option.label}
          </option>
        ))}
      </LanguageSwitcherSelect>
    </LanguageSwitcherContainer>
  );
};
