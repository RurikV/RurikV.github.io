// Theme definitions converted from SCSS
export interface Theme {
  // Primary colors
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorSecondary: string;
  colorSuccess: string;
  colorDanger: string;
  colorWarning: string;
  colorInfo: string;

  // Background colors
  colorBgPrimary: string;
  colorBgSecondary: string;
  colorBgTertiary: string;

  // Text colors
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorTextMuted: string;

  // Border colors
  colorBorder: string;
  colorBorderLight: string;

  // Shadows
  shadowSm: string;
  shadow: string;
  shadowLg: string;
}

// Light theme
export const lightTheme: Theme = {
  // Primary colors
  colorPrimary: '#007bff',
  colorPrimaryHover: '#0056b3',
  colorPrimaryActive: '#004085',
  colorSecondary: '#6c757d',
  colorSuccess: '#28a745',
  colorDanger: '#dc3545',
  colorWarning: '#ffc107',
  colorInfo: '#17a2b8',

  // Background colors
  colorBgPrimary: '#ffffff',
  colorBgSecondary: '#f8f9fa',
  colorBgTertiary: '#e9ecef',

  // Text colors
  colorTextPrimary: '#212529',
  colorTextSecondary: '#6c757d',
  colorTextMuted: '#868e96',

  // Border colors
  colorBorder: '#dee2e6',
  colorBorderLight: '#e9ecef',

  // Shadows
  shadowSm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
  shadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  shadowLg: '0 1rem 3rem rgba(0, 0, 0, 0.175)',
};

// Dark theme
export const darkTheme: Theme = {
  // Primary colors
  colorPrimary: '#0d6efd',
  colorPrimaryHover: '#0b5ed7',
  colorPrimaryActive: '#0a58ca',
  colorSecondary: '#6c757d',
  colorSuccess: '#198754',
  colorDanger: '#dc3545',
  colorWarning: '#ffc107',
  colorInfo: '#0dcaf0',

  // Background colors
  colorBgPrimary: '#212529',
  colorBgSecondary: '#343a40',
  colorBgTertiary: '#495057',

  // Text colors
  colorTextPrimary: '#ffffff',
  colorTextSecondary: '#adb5bd',
  colorTextMuted: '#6c757d',

  // Border colors
  colorBorder: '#495057',
  colorBorderLight: '#343a40',

  // Shadows
  shadowSm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.3)',
  shadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.4)',
  shadowLg: '0 1rem 3rem rgba(0, 0, 0, 0.5)',
};

// Theme utilities
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeName = keyof typeof themes;
