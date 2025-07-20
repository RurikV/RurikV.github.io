import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import {
  responsiveFontSize,
  responsiveGap,
  responsivePadding,
  withResponsiveStyles,
  StyledButton,
  ResponsiveProps,
} from '../../shared/ResponsiveStyles';

// Enhanced interface with state hoisting support
export interface AddToCartButtonProps extends ResponsiveProps {
  // Controlled input props
  value?: number;
  onChange?: (value: number) => void;

  // State hoisting props
  initialCount?: number;
  onCountChange?: (count: number) => void;

  // Event handlers
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;

  // Customization props
  addText?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  variant?: 'default' | 'compact' | 'minimal';

  // Children patterns
  children?: React.ReactNode | ((props: AddToCartRenderProps) => React.ReactNode);
  renderButton?: (props: AddToCartRenderProps) => React.ReactNode;
  renderCounter?: (props: AddToCartRenderProps) => React.ReactNode;

  // Additional props
  count?: number;
}

// Render props interface
export interface AddToCartRenderProps {
  count: number;
  isControlled: boolean;
  canDecrease: boolean;
  canIncrease: boolean;
  handleAdd: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleInputChange: (value: number) => void;
}

// Styled components using shared utilities
const AddToCartContainer = styled.div<ResponsiveProps & { variant?: string }>`
  display: inline-flex;
  align-items: center;
  ${responsiveGap('4px', '0.8vw', '8px')}

  ${(props) =>
    props.variant === 'minimal' &&
    `
    background: transparent;
    border: none;
  `}
`;

const AddButton = styled(StyledButton)<ResponsiveProps & { variant?: string }>`
  ${responsiveFontSize('14px', '1.4vw', '16px')}
  ${responsivePadding('8px 16px', '1vw 2vw', '12px 24px')}
  border-radius: 8px;
  font-weight: 600;
  min-width: 120px;

  background-color: ${(props) => props.theme.colorPrimary};
  color: white;
  border-color: ${(props) => props.theme.colorPrimary};

  &:hover {
    background-color: ${(props) => props.theme.colorPrimary};
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${(props) =>
    props.variant === 'compact' &&
    `
    ${responsiveFontSize('12px', '1.2vw', '14px')}
    ${responsivePadding('6px 12px', '0.8vw 1.5vw', '8px 16px')}
    min-width: 100px;
  `}

  ${(props) =>
    props.variant === 'minimal' &&
    `
    background: transparent;
    color: ${props.theme.colorPrimary};
    border: 1px solid ${props.theme.colorPrimary};
    
    &:hover {
      background-color: ${props.theme.colorPrimary};
      color: white;
    }
  `}
`;

const CounterContainer = styled.div<ResponsiveProps & { variant?: string }>`
  display: flex;
  align-items: center;
  ${responsiveGap('4px', '0.8vw', '8px')}
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorBorder};
  background-color: ${(props) => props.theme.colorBgSecondary};

  ${(props) =>
    props.variant === 'compact' &&
    `
    ${responsiveGap('2px', '0.6vw', '6px')}
    border-radius: 6px;
  `}

  ${(props) =>
    props.variant === 'minimal' &&
    `
    border: none;
    background: transparent;
  `}
`;

const CounterButton = styled.button<ResponsiveProps & { variant?: string }>`
  ${responsiveFontSize('16px', '1.6vw', '18px')}
  ${responsivePadding('8px', '1vw', '12px')}
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.colorTextPrimary};
  font-weight: 600;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.colorBgTertiary};
    color: ${(props) => props.theme.colorPrimary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === 'compact' &&
    `
    ${responsiveFontSize('14px', '1.4vw', '16px')}
    ${responsivePadding('6px', '0.8vw', '10px')}
    min-width: 28px;
    min-height: 28px;
  `}
`;

const CounterInput = styled.input<ResponsiveProps & { variant?: string }>`
  ${responsiveFontSize('16px', '1.6vw', '18px')}
  font-weight: 600;
  color: ${(props) => props.theme.colorTextPrimary};
  background: transparent;
  border: none;
  text-align: center;
  width: 40px;
  outline: none;

  &:focus {
    background-color: ${(props) => props.theme.colorBgTertiary};
    border-radius: 4px;
  }

  ${(props) =>
    props.variant === 'compact' &&
    `
    ${responsiveFontSize('14px', '1.4vw', '16px')}
    width: 32px;
  `}
`;

// Enhanced component with state hoisting and controlled input patterns
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  // Controlled input props
  value,
  onChange,

  // State hoisting props
  initialCount = 0,
  onCountChange,

  // Event handlers
  onAdd,
  onIncrease,
  onDecrease,

  // Customization props
  addText = 'Add to Cart',
  minValue = 0,
  maxValue = 99,
  step = 1,
  disabled = false,
  variant = 'default',

  // Children patterns
  children,
  renderButton,
  renderCounter,

  className,
  compact,
  ...restProps
}) => {
  // State hoisting pattern - use external state if provided, otherwise internal state
  const isControlled = value !== undefined;
  const [internalCount, setInternalCount] = useState(initialCount);
  const currentCount = isControlled ? value : internalCount;

  // Controlled input pattern
  const handleCountChange = useCallback(
    (newCount: number) => {
      const clampedCount = Math.max(minValue, Math.min(maxValue, newCount));

      if (isControlled) {
        onChange?.(clampedCount);
      } else {
        setInternalCount(clampedCount);
      }

      onCountChange?.(clampedCount);
    },
    [isControlled, onChange, onCountChange, minValue, maxValue]
  );

  const handleAdd = useCallback(() => {
    handleCountChange(step);
    onAdd?.();
  }, [handleCountChange, step, onAdd]);

  const handleIncrease = useCallback(() => {
    handleCountChange(currentCount + step);
    onIncrease?.();
  }, [handleCountChange, currentCount, step, onIncrease]);

  const handleDecrease = useCallback(() => {
    handleCountChange(currentCount - step);
    onDecrease?.();
  }, [handleCountChange, currentCount, step, onDecrease]);

  const handleInputChange = useCallback(
    (newValue: number) => {
      if (!isNaN(newValue)) {
        handleCountChange(newValue);
      }
    },
    [handleCountChange]
  );

  const canDecrease = currentCount > minValue && !disabled;
  const canIncrease = currentCount < maxValue && !disabled;

  const renderProps: AddToCartRenderProps = {
    count: currentCount,
    isControlled,
    canDecrease,
    canIncrease,
    handleAdd,
    handleIncrease,
    handleDecrease,
    handleInputChange,
  };

  // Render props pattern - if children is a function
  if (typeof children === 'function') {
    return (
      <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
        {children(renderProps)}
      </AddToCartContainer>
    );
  }

  // Custom render patterns
  if (renderButton && currentCount === 0) {
    return (
      <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
        {renderButton(renderProps)}
      </AddToCartContainer>
    );
  }

  if (renderCounter && currentCount > 0) {
    return (
      <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
        {renderCounter(renderProps)}
      </AddToCartContainer>
    );
  }

  // Children pass-through pattern
  if (children) {
    return (
      <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
        {children}
      </AddToCartContainer>
    );
  }

  // Default rendering with conditional rendering pattern
  if (currentCount === 0) {
    return (
      <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
        <AddButton onClick={handleAdd} disabled={disabled} variant={variant} compact={compact} type="button">
          {addText}
        </AddButton>
      </AddToCartContainer>
    );
  }

  return (
    <AddToCartContainer className={className} compact={compact} variant={variant} {...restProps}>
      <CounterContainer variant={variant} compact={compact}>
        <CounterButton
          className="decrease"
          onClick={handleDecrease}
          disabled={!canDecrease}
          variant={variant}
          compact={compact}
          type="button"
          aria-label="Decrease quantity"
        >
          −
        </CounterButton>

        <CounterInput
          type="number"
          value={currentCount}
          onChange={(e) => handleInputChange(parseInt(e.target.value, 10))}
          min={minValue}
          max={maxValue}
          step={step}
          disabled={disabled}
          variant={variant}
          compact={compact}
          aria-label="Quantity"
        />

        <CounterButton
          className="increase"
          onClick={handleIncrease}
          disabled={!canIncrease}
          variant={variant}
          compact={compact}
          type="button"
          aria-label="Increase quantity"
        >
          +
        </CounterButton>
      </CounterContainer>
    </AddToCartContainer>
  );
};

// Higher-order component pattern
export const ResponsiveAddToCartButton = withResponsiveStyles(AddToCartButton);

// Style component pattern - pre-configured variants
export const CompactAddToCartButton: React.FC<Omit<AddToCartButtonProps, 'compact' | 'variant'>> = (props) => (
  <AddToCartButton {...props} compact variant="compact" />
);

export const MinimalAddToCartButton: React.FC<Omit<AddToCartButtonProps, 'variant'>> = (props) => (
  <AddToCartButton {...props} variant="minimal" />
);

// Controlled component wrapper for easier state management
export const ControlledAddToCartButton: React.FC<
  Omit<AddToCartButtonProps, 'value' | 'onChange'> & {
    defaultValue?: number;
    onValueChange?: (value: number) => void;
  }
> = ({ defaultValue = 0, onValueChange, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  return <AddToCartButton {...props} value={value} onChange={handleChange} />;
};
