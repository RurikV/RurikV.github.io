import type { Preview } from "@storybook/react";
import React from 'react';
import { ThemeContextProvider } from '../src/styles/GlobalStyles';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import '../src/i18n/config';

// Theme decorator to wrap stories with ThemeContextProvider
const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'light';
  
  // Apply theme to the preview iframe's document
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  }
  
  return React.createElement(
    ThemeContextProvider,
    { initialTheme: theme },
    React.createElement(
      LanguageProvider,
      {},
      React.createElement(Story)
    )
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
