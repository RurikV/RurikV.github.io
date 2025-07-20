import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme, lightTheme, darkTheme, themes, ThemeName } from './themes';

// Extend styled-components theme interface
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// Global styles component that replaces themes.scss
const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => props.theme.colorBgPrimary};
    color: ${(props) => props.theme.colorTextPrimary};
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  // Theme-specific body styles using data-theme attribute
  [data-theme="light"] body {
    background-color: ${lightTheme.colorBgPrimary};
    color: ${lightTheme.colorTextPrimary};
  }

  [data-theme="dark"] body {
    background-color: ${darkTheme.colorBgPrimary};
    color: ${darkTheme.colorTextPrimary};
  }

  // Theme utility classes
  .theme-light {
    background-color: ${lightTheme.colorBgPrimary};
    color: ${lightTheme.colorTextPrimary};
  }

  .theme-dark {
    background-color: ${darkTheme.colorBgPrimary};
    color: ${darkTheme.colorTextPrimary};
  }
`;

// Theme context for managing current theme
export const ThemeContext = React.createContext<{
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}>({
  currentTheme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
});

// Custom hook for using theme context
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

// Theme provider component
interface ThemeContextProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeName;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children, initialTheme = 'light' }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeName>(initialTheme);

  const setTheme = React.useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
    // Update data-theme attribute on document element
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // Set initial theme on mount
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const contextValue = React.useMemo(
    () => ({
      currentTheme,
      setTheme,
    }),
    [currentTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themes[currentTheme]}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
