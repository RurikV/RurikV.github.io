import React, { FC } from 'react';
import cn from 'clsx';
import { LogoProps } from '../types';
import './Logo.css';

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn('picklematch-logo', className)}>
      <div className="picklematch-logo-icon">
        <span className="picklematch-logo-text">PM</span>
      </div>
      <span className="picklematch-logo-name">PickleMatch</span>
    </div>
  );
};
