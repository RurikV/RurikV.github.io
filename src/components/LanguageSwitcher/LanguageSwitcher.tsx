import React from 'react';
import styled from 'styled-components';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import {
  responsiveFontSize,
  responsiveGap,
  responsivePadding,
  withResponsiveStyles,
  ProxyComponent,
  ResponsiveProps,
} from '../shared/ResponsiveStyles';

// Enhanced interface with destructuring props support
export interface LanguageSwitcherProps extends ResponsiveProps {
  showLabel?: boolean;
  labelText?: string;
  options?: Array<{ value: Language; label: string; flag: string }>;
  onLanguageChange?: (language: Language) => void;
  children?: React.ReactNode | ((props: LanguageSwitcherRenderProps) => React.ReactNode);
  renderOption?: (option: { value: Language; label: string; flag: string }) => React.ReactNode;
  [key: string]: any; // Allow additional props to be spread
}

// Render props interface
export interface LanguageSwitcherRenderProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  options: Array<{ value: Language; label: string; flag: string }>;
  t: (key: string) => string;
}

const defaultLanguageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
];

// Styled components using shared utilities
const LanguageSwitcherContainer = styled(ProxyComponent).withConfig({
  shouldForwardProp: (prop) =>
    !['showLabel', 'labelText', 'options', 'onLanguageChange', 'renderOption'].includes(prop),
})<LanguageSwitcherProps>`
  display: flex;
  align-items: center;
  ${responsiveGap('4px', '1vw', '8px')}
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  white-space: nowrap;
`;

const LanguageSwitcherLabel = styled.label<ResponsiveProps>`
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => props.theme.colorTextPrimary};
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  flex-shrink: 0;

  @media (max-width: 360px) {
    display: none;
  }
`;

const LanguageSwitcherSelect = styled.select<ResponsiveProps>`
  ${responsivePadding('4px 8px', '0.8vw 1.5vw', '6px 12px')}
  border-radius: 4px;
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(80px, 15vw, 120px);
  max-width: clamp(120px, 20vw, 160px);
  border: 1px solid;
  min-height: 44px;
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
    ${responsivePadding('4px', '1vw', '8px')}
    background-color: ${(props) => props.theme.colorBgPrimary};
    color: ${(props) => props.theme.colorTextPrimary};
    ${responsiveFontSize('12px', '1.4vw', '14px')}
  }
`;

// Enhanced component with multiple React patterns
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  showLabel = true,
  labelText,
  options = defaultLanguageOptions,
  onLanguageChange,
  children,
  renderOption,
  className,
  compact,
  ...restProps // JSX spread attributes pattern
}) => {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as Language;
    changeLanguage(newLanguage);
    onLanguageChange?.(newLanguage); // Optional callback
  };

  // Render props pattern - if children is a function
  if (typeof children === 'function') {
    return (
      <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
        {children({ language, changeLanguage, options, t })}
      </LanguageSwitcherContainer>
    );
  }

  // Array as children pattern
  if (Array.isArray(children)) {
    return (
      <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
        {children.map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </LanguageSwitcherContainer>
    );
  }

  // Children pass-through pattern
  if (children) {
    return (
      <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
        {children}
      </LanguageSwitcherContainer>
    );
  }

  // Default rendering with conditional rendering pattern
  return (
    <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
      {/* Conditional rendering for label */}
      {showLabel && (
        <LanguageSwitcherLabel htmlFor="language-select" compact={compact}>
          {labelText || t('language')}:
        </LanguageSwitcherLabel>
      )}

      <LanguageSwitcherSelect
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        aria-label="Select language"
        compact={compact}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {/* Custom render option pattern */}
            {renderOption ? renderOption(option) : `${option.flag} ${option.label}`}
          </option>
        ))}
      </LanguageSwitcherSelect>
    </LanguageSwitcherContainer>
  );
};

// Higher-order component pattern
export const ResponsiveLanguageSwitcher = withResponsiveStyles(LanguageSwitcher);

// Style component pattern - pre-configured variants
export const CompactLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'compact'>> = (props) => (
  <LanguageSwitcher {...props} compact />
);

export const MinimalLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'showLabel'>> = (props) => (
  <LanguageSwitcher {...props} showLabel={false} />
);
