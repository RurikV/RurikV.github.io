# React Components Refactoring Documentation

## Refactored Components

1. **LanguageSwitcher**
2. **ThemeSwitcher** 
3. **AddToCartButton**
4. **Shared Utilities** → `ResponsiveStyles.tsx`

## React Patterns Implemented

### 1. State Hoisting

**Implementation**: AddToCartButton component
```tsx
// State hoisting pattern - use external state if provided, otherwise internal state
const isControlled = value !== undefined;
const [internalCount, setInternalCount] = useState(initialCount);
const currentCount = isControlled ? value : internalCount;

// Usage examples:
// Uncontrolled (internal state)
<AddToCartButton initialCount={0} onCountChange={handleCountChange} />

// Controlled (external state)
<AddToCartButton value={cartCount} onChange={setCartCount} />
```

**Benefits**:
- Flexible state management
- Supports both controlled and uncontrolled patterns
- Easy integration with parent component state

### 2. Controlled Input

**Implementation**: AddToCartButton component
```tsx
// Controlled input pattern
const handleCountChange = useCallback((newCount: number) => {
  const clampedCount = Math.max(minValue, Math.min(maxValue, newCount));
  
  if (isControlled) {
    onChange?.(clampedCount);
  } else {
    setInternalCount(clampedCount);
  }
  
  onCountChange?.(clampedCount);
}, [isControlled, onChange, onCountChange, minValue, maxValue]);

// Controlled input element
<CounterInput
  type="number"
  value={currentCount}
  onChange={(e) => handleInputChange(parseInt(e.target.value, 10))}
  min={minValue}
  max={maxValue}
/>
```

**Benefits**:
- Predictable input behavior
- Validation and constraints
- Seamless integration with forms

### 3. Destructuring Props & JSX Spread Attributes

**Implementation**: All refactored components
```tsx
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
  // Component logic...
  
  return (
    <LanguageSwitcherContainer 
      className={className} 
      compact={compact} 
      {...restProps} // Spread remaining props
    >
      {/* Component content */}
    </LanguageSwitcherContainer>
  );
};
```

**Benefits**:
- Clean prop handling
- Flexible prop forwarding
- Better TypeScript support

### 4. Conditional Rendering

**Implementation**: All components with enhanced patterns
```tsx
// Enhanced conditional rendering in ThemeSwitcher
const shouldShowIcon = showIcon && variant !== 'text-only';
const shouldShowText = showText && variant !== 'icon-only' && variant !== 'minimal';

return (
  <StyledThemeSwitcher {...props}>
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
```

**Benefits**:
- Dynamic UI based on props
- Flexible component variants
- Improved user experience

### 5. Children Types Support

#### Array as Children
```tsx
// Array as children pattern in LanguageSwitcher
if (Array.isArray(children)) {
  return (
    <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
      {children.map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </LanguageSwitcherContainer>
  );
}

// Usage:
<LanguageSwitcher>
  {[<CustomIcon key="icon" />, <CustomText key="text" />]}
</LanguageSwitcher>
```

#### Function as Children (Render Props)
```tsx
// Render props pattern
if (typeof children === 'function') {
  return (
    <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
      {children({ language, changeLanguage, options, t })}
    </LanguageSwitcherContainer>
  );
}

// Usage:
<LanguageSwitcher>
  {({ language, changeLanguage, options }) => (
    <CustomLanguageSelector 
      current={language} 
      onChange={changeLanguage} 
      options={options} 
    />
  )}
</LanguageSwitcher>
```

#### Children Pass-through
```tsx
// Children pass-through pattern
if (children) {
  return (
    <LanguageSwitcherContainer className={className} compact={compact} {...restProps}>
      {children}
    </LanguageSwitcherContainer>
  );
}

// Usage:
<LanguageSwitcher>
  <CustomLanguageComponent />
</LanguageSwitcher>
```

### 6. Proxy Component

**Implementation**: ResponsiveStyles.tsx
```tsx
export const ProxyComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['compact'].includes(prop),
})<ProxyComponentProps>`
  ${responsiveFontSize()}
  ${responsiveGap()}
  
  &.compact {
    ${responsiveFontSize('10px', '1.2vw', '12px')}
    ${responsiveGap('4px', '0.8vw', '8px')}
  }
`;

// Usage in other components:
const LanguageSwitcherContainer = styled(ProxyComponent).withConfig({
  shouldForwardProp: (prop) => !['showLabel', 'labelText', 'options'].includes(prop),
})<LanguageSwitcherProps>`
  display: flex;
  align-items: center;
  // Additional styles...
`;
```

**Benefits**:
- Style composition
- Consistent responsive behavior
- Reduced code duplication

### 7. Style Component

**Implementation**: ResponsiveStyles.tsx and component variants
```tsx
// Base style component
export const StyledButton = styled.button<ResponsiveProps>`
  ${responsiveFontSize('12px', '1.4vw', '14px')}
  ${responsivePadding('6px 12px', '0.8vw 1.5vw', '8px 16px')}
  // Common button styles...
`;

// Style component pattern - pre-configured variants
export const CompactLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'compact'>> = (props) => (
  <LanguageSwitcher {...props} compact />
);

export const MinimalLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'showLabel'>> = (props) => (
  <LanguageSwitcher {...props} showLabel={false} />
);
```

**Benefits**:
- Consistent styling
- Easy variant creation
- Reduced style duplication

### 8. Event Switch

**Implementation**: ThemeSwitcher component
```tsx
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

// Usage:
const themeHandler = createThemeEventHandler({
  onLightTheme: () => console.log('Switched to light theme'),
  onDarkTheme: () => console.log('Switched to dark theme'),
  onThemeToggle: (theme) => analytics.track('theme_change', { theme })
});
```

**Benefits**:
- Centralized event handling
- Easy to extend with new cases
- Clean separation of concerns

### 9. Higher-Order Component

**Implementation**: ResponsiveStyles.tsx
```tsx
export const withResponsiveStyles = <P extends object>(Component: React.ComponentType<P>) => {
  const ResponsiveComponent = React.forwardRef<any, P & ResponsiveProps>(
    ({ compact, className, ...props }, ref) => {
      const combinedClassName = `${className || ''} ${compact ? 'compact' : ''}`.trim();

      return <Component ref={ref} className={combinedClassName} {...(props as P)} />;
    }
  );

  ResponsiveComponent.displayName = `withResponsiveStyles(${Component.displayName || Component.name})`;

  return ResponsiveComponent;
};

// Usage:
export const ResponsiveLanguageSwitcher = withResponsiveStyles(LanguageSwitcher);
export const ResponsiveThemeSwitcher = withResponsiveStyles(ThemeSwitcher);
```

**Benefits**:
- Cross-cutting concerns
- Reusable functionality
- Composition over inheritance

## Code Duplication Reduction

### Before Refactoring
- **Responsive styling**: Each component had 100+ lines of repetitive media queries
- **Theme integration**: Duplicated theme prop handling across components
- **Event handling**: Similar event patterns repeated in each component
- **Styling approach**: Inconsistent use of CSS classes vs styled-components

### After Refactoring
- **Shared utilities**: Created `ResponsiveStyles.tsx` with reusable mixins
- **Consistent patterns**: All components follow the same architectural patterns
- **Reduced LOC**: Eliminated ~300 lines of duplicated responsive styling code
- **Unified styling**: All components use styled-components with shared utilities

### Responsive Styling Utilities
```tsx
// Before: 20+ lines per component for responsive font sizes
@media (max-width: 1024px) {
  font-size: clamp(11px, 1.3vw, 13px);
}
@media (max-width: 768px) {
  font-size: clamp(10px, 1.2vw, 12px);
}
// ... more media queries

// After: 1 line per component
${responsiveFontSize('12px', '1.4vw', '14px')}
```

## State and Context Management Improvements

### Enhanced Context Usage
- **LanguageSwitcher**: Improved integration with `useLanguage` hook
- **ThemeSwitcher**: Enhanced `useTheme` hook integration with callback support
- **State lifting**: Components support both internal and external state management

### Performance Optimizations
- **useCallback**: Memoized event handlers to prevent unnecessary re-renders
- **Controlled components**: Predictable state updates
- **Prop forwarding**: Efficient prop handling with spread operators

## Usage Examples

### Basic Usage
```tsx
// Simple usage with default behavior
<LanguageSwitcher />
<ThemeSwitcher />
<AddToCartButton />
```

### Advanced Usage with Render Props
```tsx
<LanguageSwitcher>
  {({ language, changeLanguage, options, t }) => (
    <CustomDropdown
      value={language}
      onChange={changeLanguage}
      options={options}
      placeholder={t('selectLanguage')}
    />
  )}
</LanguageSwitcher>

<AddToCartButton>
  {({ count, handleAdd, handleIncrease, handleDecrease, canIncrease, canDecrease }) => (
    <CustomCartControls
      count={count}
      onAdd={handleAdd}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      canIncrease={canIncrease}
      canDecrease={canDecrease}
    />
  )}
</AddToCartButton>
```

### Controlled Components
```tsx
const [cartCount, setCartCount] = useState(0);
const [currentLanguage, setCurrentLanguage] = useState('en');

<AddToCartButton 
  value={cartCount} 
  onChange={setCartCount}
  onCountChange={(count) => updateCartInDatabase(count)}
/>

<LanguageSwitcher 
  value={currentLanguage}
  onChange={setCurrentLanguage}
  onLanguageChange={(lang) => saveUserPreference(lang)}
/>
```

### Style Variants
```tsx
// Pre-configured variants
<CompactLanguageSwitcher />
<MinimalLanguageSwitcher />
<CompactThemeSwitcher />
<IconOnlyThemeSwitcher />
<MinimalAddToCartButton />

// Custom variants
<ThemeSwitcher variant="minimal" size="small" />
<AddToCartButton variant="compact" maxValue={10} />
```

## Performance Benefits

1. **Reduced bundle size**: Eliminated duplicate responsive styling code
2. **Better tree shaking**: Modular exports allow for selective imports
3. **Memoization**: useCallback prevents unnecessary re-renders
4. **Efficient re-renders**: Controlled components minimize state updates

## Summary

- ✅ **State hoisting**: Implemented in AddToCartButton
- ✅ **Controlled input**: Full controlled/uncontrolled component support
- ✅ **Destructuring props**: Clean prop handling across all components
- ✅ **JSX spread attributes**: Flexible prop forwarding
- ✅ **Conditional rendering**: Enhanced with multiple rendering strategies
- ✅ **Children types**: Array, function, and pass-through patterns
- ✅ **Render prop**: Comprehensive render prop implementation
- ✅ **Proxy component**: Shared styling and behavior composition
- ✅ **Style component**: Consistent styling with variants
- ✅ **Event switch**: Centralized event handling patterns
- ✅ **Higher-order component**: Cross-cutting concerns implementation
