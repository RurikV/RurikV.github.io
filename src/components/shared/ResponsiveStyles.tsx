import React from 'react';
import { styled, css } from 'styled-components';

// Responsive breakpoints utility
export const breakpoints = {
  mobile: '360px',
  smallMobile: '480px',
  tablet: '640px',
  smallTablet: '768px',
  desktop: '1024px',
} as const;

// Media query utility function
export const media = {
  mobile: (styles: string) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
  smallMobile: (styles: string) => css`
    @media (max-width: ${breakpoints.smallMobile}) {
      ${styles}
    }
  `,
  tablet: (styles: string) => css`
    @media (max-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  smallTablet: (styles: string) => css`
    @media (max-width: ${breakpoints.smallTablet}) {
      ${styles}
    }
  `,
  desktop: (styles: string) => css`
    @media (max-width: ${breakpoints.desktop}) {
      ${styles}
    }
  `,
};

// Responsive font size mixin
export const responsiveFontSize = (base = '14px', vw = '1.4vw', max = '16px') => css`
  font-size: clamp(${base}, ${vw}, ${max});

  ${media.desktop(`font-size: clamp(calc(${base} * 0.9), calc(${vw} * 0.9), calc(${max} * 0.9));`)}
  ${media.smallTablet(`font-size: clamp(calc(${base} * 0.8), calc(${vw} * 0.8), calc(${max} * 0.8));`)}
  ${media.tablet(`font-size: clamp(calc(${base} * 0.7), calc(${vw} * 0.7), calc(${max} * 0.7));`)}
  ${media.smallMobile(`font-size: clamp(calc(${base} * 0.6), calc(${vw} * 0.6), calc(${max} * 0.6));`)}
  ${media.mobile(`font-size: clamp(calc(${base} * 0.5), calc(${vw} * 0.5), calc(${max} * 0.5));`)}
`;

// Responsive gap mixin
export const responsiveGap = (base = '8px', vw = '1vw', max = '12px') => css`
  gap: clamp(${base}, ${vw}, ${max});

  ${media.desktop(`gap: clamp(calc(${base} * 0.9), calc(${vw} * 0.9), calc(${max} * 0.9));`)}
  ${media.smallTablet(`gap: clamp(calc(${base} * 0.8), calc(${vw} * 0.8), calc(${max} * 0.8));`)}
  ${media.tablet(`gap: clamp(calc(${base} * 0.7), calc(${vw} * 0.7), calc(${max} * 0.7));`)}
  ${media.smallMobile(`gap: clamp(calc(${base} * 0.6), calc(${vw} * 0.6), calc(${max} * 0.6));`)}
  ${media.mobile(`gap: clamp(calc(${base} * 0.5), calc(${vw} * 0.5), calc(${max} * 0.5));`)}
`;

// Responsive padding mixin
export const responsivePadding = (base = '8px', vw = '1vw', max = '12px') => css`
  padding: clamp(${base}, ${vw}, ${max});

  ${media.desktop(`padding: clamp(calc(${base} * 0.9), calc(${vw} * 0.9), calc(${max} * 0.9));`)}
  ${media.smallTablet(`padding: clamp(calc(${base} * 0.8), calc(${vw} * 0.8), calc(${max} * 0.8));`)}
  ${media.tablet(`padding: clamp(calc(${base} * 0.7), calc(${vw} * 0.7), calc(${max} * 0.7));`)}
  ${media.smallMobile(`padding: clamp(calc(${base} * 0.6), calc(${vw} * 0.6), calc(${max} * 0.6));`)}
  ${media.mobile(`padding: clamp(calc(${base} * 0.5), calc(${vw} * 0.5), calc(${max} * 0.5));`)}
`;

// Higher-Order Component for responsive styling
export interface ResponsiveProps {
  compact?: boolean;
  className?: string;
}

export const withResponsiveStyles = <P extends object>(Component: React.ComponentType<P>) => {
  const ResponsiveComponent = React.forwardRef<HTMLElement, P & ResponsiveProps>(
    ({ compact, className, ...props }, ref) => {
      const combinedClassName = `${className || ''} ${compact ? 'compact' : ''}`.trim();

      return <Component ref={ref} className={combinedClassName} {...(props as P)} />;
    }
  );

  ResponsiveComponent.displayName = `withResponsiveStyles(${Component.displayName || Component.name})`;

  return ResponsiveComponent;
};

// Proxy component for style composition
export interface ProxyComponentProps extends ResponsiveProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export const ProxyComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['compact'].includes(prop),
})<ProxyComponentProps>`
  ${responsiveFontSize()}
  ${responsiveGap()}
`;

// Style component for common button patterns
export const StyledButton = styled.button<ResponsiveProps>`
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  ${responsivePadding('6px 12px', '0.8vw 1.5vw', '8px 16px')}
  
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
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
`;
