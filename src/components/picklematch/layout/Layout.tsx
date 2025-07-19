import React, { FC } from 'react';
import { LayoutProps } from '../types';
import { Header } from '../header/Header';
import './Layout.css';

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="picklematch-layout">
      <Header />
      <main className="picklematch-layout-main">
        {children}
      </main>
    </div>
  );
};