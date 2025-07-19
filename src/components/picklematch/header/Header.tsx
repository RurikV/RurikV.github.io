import React, { FC } from 'react';
import cn from 'clsx';
import { HeaderProps } from '../types';
import { Logo } from '../logo/Logo';
import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../../../contexts/LanguageContext';
import './Header.css';

export const Header: FC<HeaderProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <header className={cn('picklematch-header', className)}>
      <div className="picklematch-header-container">
        <Logo />
        <nav className="picklematch-header-nav">
          <a href="javascript:void(0)" className="picklematch-header-link">
            {t('courts')}
          </a>
          <a href="javascript:void(0)" className="picklematch-header-link">
            {t('booking')}
          </a>
          <a href="javascript:void(0)" className="picklematch-header-link">
            {t('profile')}
          </a>
          <ThemeSwitcher className="theme-switcher--compact" />
          <LanguageSwitcher className="language-switcher--compact" />
        </nav>
      </div>
    </header>
  );
};
