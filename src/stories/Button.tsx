import React from 'react';
import { styled, css } from 'styled-components';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

// Styled button component
const StyledButton = styled.button<{ primary?: boolean; size?: string; backgroundColor?: string }>`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}

  ${(props) =>
    props.primary
      ? css`
          color: white;
          background-color: #1ea7fd;
        `
      : css`
          color: #333;
          background-color: transparent;
          box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
        `}

  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          font-size: 12px;
          padding: 10px 16px;
        `;
      case 'large':
        return css`
          font-size: 16px;
          padding: 12px 24px;
        `;
      default: // medium
        return css`
          font-size: 14px;
          padding: 11px 20px;
        `;
    }
  }}
`;

/**
 * Primary UI component for user interaction
 */
export function Button({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) {
  return (
    <StyledButton type="button" primary={primary} size={size} backgroundColor={backgroundColor} {...props}>
      {label}
    </StyledButton>
  );
}
