import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import './LanguageSwitcher.scss';

export interface LanguageSwitcherProps {
  className?: string;
}

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as Language);
  };

  return (
    <div className={`language-switcher ${className || ''}`}>
      <label htmlFor="language-select" className="language-switcher__label">
        {t('language')}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="language-switcher__select"
        aria-label="Select language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.flag} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
