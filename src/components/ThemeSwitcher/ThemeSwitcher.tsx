import React from 'react';
import { styled, css } from 'styled-components';
import { useTheme } from '../../styles/GlobalStyles';
import {
  responsiveFontSize,
  responsiveGap,
  responsivePadding,
  withResponsiveStyles,
  StyledButton,
  ResponsiveProps,
} from '../shared/ResponsiveStyles';

/**
 * Props interface for the ThemeSwitcher component.
 *
 * Provides comprehensive configuration options for theme switching functionality,
 * including visual customization, content rendering patterns, and responsive behavior.
 * Extends ResponsiveProps to inherit compact and className properties.
 *
 * @extends ResponsiveProps - Inherits compact?: boolean and className?: string
 */
export interface ThemeSwitcherProps extends ResponsiveProps {
  /**
   * Controls whether text label is displayed alongside the theme switcher.
   * When false, only the icon will be shown (if showIcon is true).
   *
   * @default true
   * @example
   * <ThemeSwitcher showText={false} /> // Icon only
   * <ThemeSwitcher showText={true} />  // Icon + text
   */
  showText?: boolean;

  /**
   * Controls whether icon is displayed in the theme switcher.
   * When false, only the text will be shown (if showText is true).
   *
   * @default true
   * @example
   * <ThemeSwitcher showIcon={false} /> // Text only
   * <ThemeSwitcher showIcon={true} />  // Icon + text
   */
  showIcon?: boolean;

  /**
   * Custom text labels for light and dark themes.
   * Overrides the default text labels ('Dark' for light theme, 'Light' for dark theme).
   *
   * @default { light: 'Dark', dark: 'Light' }
   * @example
   * <ThemeSwitcher customText={{ light: 'Night Mode', dark: 'Day Mode' }} />
   */
  customText?: { light: string; dark: string };

  /**
   * Custom icons for light and dark themes.
   * Overrides the default icons ('🌙' for light theme, '☀️' for dark theme).
   *
   * @default { light: '🌙', dark: '☀️' }
   * @example
   * <ThemeSwitcher customIcons={{ light: '🌚', dark: '🌞' }} />
   */
  customIcons?: { light: string; dark: string };

  /**
   * Visual variant of the theme switcher component.
   * - 'default': Standard button with icon and text
   * - 'minimal': Transparent background with reduced padding
   * - 'icon-only': Shows only icon, hides text regardless of showText
   * - 'text-only': Shows only text, hides icon regardless of showIcon
   *
   * @default 'default'
   * @example
   * <ThemeSwitcher variant="minimal" />
   * <ThemeSwitcher variant="icon-only" />
   */
  variant?: 'default' | 'minimal' | 'icon-only' | 'text-only';

  /**
   * Size variant affecting font size, padding, and overall dimensions.
   * - 'small': Compact size for tight spaces (min-height: 32px)
   * - 'medium': Standard size for general use (min-height: 44px)
   * - 'large': Larger size for prominent placement (min-height: 52px)
   *
   * @default 'medium'
   * @example
   * <ThemeSwitcher size="small" />  // Compact version
   * <ThemeSwitcher size="large" />  // Prominent version
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Callback function triggered when theme changes.
   * Useful for parent components to react to theme switches,
   * such as updating local state, analytics tracking, or triggering side effects.
   *
   * @param theme - The new theme that was switched to ('light' or 'dark')
   * @example
   * <ThemeSwitcher onThemeChange={(theme) => console.log(`Switched to ${theme} theme`)} />
   */
  onThemeChange?: (theme: 'light' | 'dark') => void;

  /**
   * Flexible children prop supporting both regular React nodes and render prop pattern.
   * - React.ReactNode: Standard children (JSX elements, strings, etc.)
   * - Function: Render prop pattern providing theme state and controls
   *
   * When used as render prop, provides access to current theme, toggle function,
   * and other theme-related utilities for complete customization.
   *
   * @example
   * // Regular children
   * <ThemeSwitcher>Custom Content</ThemeSwitcher>
   *
   * // Render prop pattern
   * <ThemeSwitcher>
   *   {({ currentTheme, toggleTheme, icon, text }) => (
   *     <div onClick={toggleTheme}>
   *       {icon} {currentTheme} mode
   *     </div>
   *   )}
   * </ThemeSwitcher>
   */
  children?: React.ReactNode | ((props: ThemeSwitcherRenderProps) => React.ReactNode);

  /**
   * Alternative render prop for custom content rendering.
   * Similar to children render prop but more explicit for render prop pattern.
   * Provides theme state and controls for building completely custom UI.
   *
   * Takes precedence over children when both are provided.
   *
   * @param props - ThemeSwitcherRenderProps containing theme state and controls
   * @example
   * <ThemeSwitcher
   *   renderContent={({ currentTheme, toggleTheme, icon }) => (
   *     <button onClick={toggleTheme} className="my-custom-button">
   *       {icon} Switch to {currentTheme === 'light' ? 'dark' : 'light'}
   *     </button>
   *   )}
   * />
   */
  renderContent?: (props: ThemeSwitcherRenderProps) => React.ReactNode;

  /**
   * Index signature allowing additional props to be passed through to the underlying button element.
   * Useful for extending functionality with custom attributes, event handlers, or styling props
   * without explicitly defining them in the interface.
   *
   * @example
   * <ThemeSwitcher
   *   data-testid="theme-switcher"
   *   onMouseEnter={() => console.log('hover')}
   *   customAttribute="value"
   * />
   */
  [key: string]: unknown;
}

// Render props interface
export interface ThemeSwitcherRenderProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  icon: string;
  text: string;
}

// Default theme configurations
const defaultIcons = { light: '🌙', dark: '☀️' };
const defaultTexts = { light: 'Dark', dark: 'Light' };

// Styled components using shared utilities
const StyledThemeSwitcher = styled(StyledButton).withConfig({
  shouldForwardProp: (prop) =>
    ![
      'showText',
      'showIcon',
      'customText',
      'customIcons',
      'variant',
      'size',
      'onThemeChange',
      'renderContent',
    ].includes(prop),
})<ThemeSwitcherProps>`
  display: flex;
  align-items: center;
  ${responsiveGap('4px', '1vw', '8px')}
  ${responsivePadding('6px 12px', '1.2vw 2vw', '8px 16px')}
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    color: white;
    background-color: ${(props) => props.theme.colorPrimary};
  }

  /* Size variants */
  ${(props) =>
    props.size === 'small' &&
    `
    ${responsiveFontSize('10px', '1.2vw', '12px')}
    ${responsivePadding('4px 8px', '0.8vw 1.5vw', '6px 12px')}
    min-height: 32px;
  `}

  ${(props) =>
    props.size === 'large' &&
    `
    ${responsiveFontSize('16px', '1.8vw', '18px')}
    ${responsivePadding('8px 16px', '1.5vw 2.5vw', '12px 20px')}
    min-height: 52px;
  `}

  /* Variant styles */
  ${(props) =>
    props.variant === 'minimal' &&
    `
    background: transparent;
    border: none;
    padding: ${responsivePadding('4px', '0.8vw', '6px')};
    
    &:hover {
      background-color: ${props.theme.colorBgTertiary};
    }
  `}

  ${(props) =>
    props.variant === 'icon-only' &&
    `
    ${responsivePadding('6px', '1vw', '8px')}
    min-width: auto;
    aspect-ratio: 1;
  `}
`;

const ThemeSwitcherIcon = styled.span<ResponsiveProps & { size?: string }>`
  ${responsiveFontSize('14px', '1.6vw', '16px')}
  line-height: 1;
  flex-shrink: 0;

  ${(props) =>
    props.size === 'small' &&
    `
    ${responsiveFontSize('12px', '1.4vw', '14px')}
  `}

  ${(props) =>
    props.size === 'large' &&
    `
    ${responsiveFontSize('18px', '2vw', '20px')}
  `}
`;

const ThemeSwitcherText = styled.span<ResponsiveProps & { size?: string }>`
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  line-height: 1;
  white-space: nowrap;

  ${(props) =>
    props.size === 'small' &&
    `
    ${responsiveFontSize('10px', '1.2vw', '12px')};
  `}

  ${(props) =>
    props.size === 'large' &&
    `
    ${responsiveFontSize('16px', '1.8vw', '18px')};
  `}

  ${css`
    @media (max-width: 360px) {
      display: none;
    }
  `}
`;

// Enhanced component with conditional rendering patterns
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  showText = true,
  showIcon = true,
  customText = defaultTexts,
  customIcons = defaultIcons,
  variant = 'default',
  size = 'medium',
  onThemeChange,
  children,
  renderContent,
  className,
  compact,
  ...restProps
}) => {
  const { currentTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const icon = customIcons[currentTheme];
  const text = customText[currentTheme];

  const renderProps: ThemeSwitcherRenderProps = {
    currentTheme,
    toggleTheme,
    setTheme,
    icon,
    text,
  };

  // Render props pattern - if children is a function
  if (typeof children === 'function') {
    return (
      <StyledThemeSwitcher
        onClick={toggleTheme}
        className={className}
        compact={compact}
        variant={variant}
        size={size}
        type="button"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        {...restProps}
      >
        {children(renderProps)}
      </StyledThemeSwitcher>
    );
  }

  // Custom render content pattern
  if (renderContent) {
    return (
      <StyledThemeSwitcher
        onClick={toggleTheme}
        className={className}
        compact={compact}
        variant={variant}
        size={size}
        type="button"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        {...restProps}
      >
        {renderContent(renderProps)}
      </StyledThemeSwitcher>
    );
  }

  // Children pass-through pattern
  if (children) {
    return (
      <StyledThemeSwitcher
        onClick={toggleTheme}
        className={className}
        compact={compact}
        variant={variant}
        size={size}
        type="button"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        {...restProps}
      >
        {children}
      </StyledThemeSwitcher>
    );
  }

  // Enhanced conditional rendering based on variant and props
  const shouldShowIcon = showIcon && variant !== 'text-only';
  const shouldShowText = showText && variant !== 'icon-only' && variant !== 'minimal';

  return (
    <StyledThemeSwitcher
      onClick={toggleTheme}
      className={className}
      compact={compact}
      variant={variant}
      size={size}
      type="button"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      {...restProps}
    >
      {/* Conditional rendering for icon */}
      {shouldShowIcon && (
        <ThemeSwitcherIcon compact={compact} size={size}>
          {icon}
        </ThemeSwitcherIcon>
      )}

      {/* Conditional rendering for text */}
      {shouldShowText && (
        <ThemeSwitcherText compact={compact} size={size}>
          {text}
        </ThemeSwitcherText>
      )}
    </StyledThemeSwitcher>
  );
};

// Higher-order component pattern
export const ResponsiveThemeSwitcher = withResponsiveStyles(ThemeSwitcher);

// Style component pattern - pre-configured variants
export const CompactThemeSwitcher: React.FC<Omit<ThemeSwitcherProps, 'compact'>> = (props) => (
  <ThemeSwitcher {...props} compact />
);

export const MinimalThemeSwitcher: React.FC<Omit<ThemeSwitcherProps, 'variant'>> = (props) => (
  <ThemeSwitcher {...props} variant="minimal" />
);

export const IconOnlyThemeSwitcher: React.FC<Omit<ThemeSwitcherProps, 'variant' | 'showText'>> = (props) => (
  <ThemeSwitcher {...props} variant="icon-only" showText={false} />
);

export const TextOnlyThemeSwitcher: React.FC<Omit<ThemeSwitcherProps, 'variant' | 'showIcon'>> = (props) => (
  <ThemeSwitcher {...props} variant="text-only" showIcon={false} />
);

// Event switch pattern for theme management
export const createThemeEventHandler = (
  handlers: {
    onLightTheme?: () => void;
    onDarkTheme?: () => void;
    onThemeToggle?: (theme: 'light' | 'dark') => void;
  } = {}
) => {
  return (theme: 'light' | 'dark') => {
    // Event switch pattern
    switch (theme) {
      case 'light':
        handlers.onLightTheme?.();
        break;
      case 'dark':
        handlers.onDarkTheme?.();
        break;
      default:
        break;
    }
    handlers.onThemeToggle?.(theme);
  };
};
