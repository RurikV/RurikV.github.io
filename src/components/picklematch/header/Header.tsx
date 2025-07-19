import React, { FC } from 'react';
import cn from 'clsx';
import { HeaderProps } from '../types';
import { Logo } from '../logo/Logo';
import './Header.css';

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('picklematch-header', className)}>
      <div className="picklematch-header-container">
        <Logo />
        <nav className="picklematch-header-nav">
          <a href="#courts" className="picklematch-header-link">Courts</a>
          <a href="#booking" className="picklematch-header-link">Booking</a>
          <a href="#profile" className="picklematch-header-link">Profile</a>
        </nav>
      </div>
    </header>
  );
};