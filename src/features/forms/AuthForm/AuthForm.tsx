import React, { useState } from 'react';
import styledComponents from 'styled-components';
import classNames from 'clsx';
import {
  LoginFormData,
  RegisterFormData,
  LoginFormProps,
  RegisterFormProps,
} from '../../../components/picklematch/types';

const FormContainer = styledComponents.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styledComponents.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Title = styledComponents.h2`
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styledComponents.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 14px;
`;

const ModeToggle = styledComponents.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
`;

const ModeButton = styledComponents.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? '#27ae60' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#7f8c8d')};

  &:hover {
    background: ${(props) => (props.active ? '#219a52' : '#e9ecef')};
  }
`;

const FormField = styledComponents.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styledComponents.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styledComponents.input`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #27ae60;
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const ErrorMessage = styledComponents.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styledComponents.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #219a52;
  }

  &:active {
    background: #1e8449;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const PasswordStrengthIndicator = styledComponents.div<{ strength: number }>`
  height: 4px;
  border-radius: 2px;
  margin-top: 4px;
  background: ${(props) => {
    if (props.strength === 0) return '#e1e8ed';
    if (props.strength === 1) return '#e74c3c';
    if (props.strength === 2) return '#f39c12';
    if (props.strength === 3) return '#f1c40f';
    return '#27ae60';
  }};
  transition: background-color 0.2s ease;
`;

const PasswordStrengthText = styledComponents.span<{ strength: number }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${(props) => {
    if (props.strength === 0) return '#7f8c8d';
    if (props.strength === 1) return '#e74c3c';
    if (props.strength === 2) return '#f39c12';
    if (props.strength === 3) return '#f1c40f';
    return '#27ae60';
  }};
`;

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode?: AuthMode;
  onLoginSubmit?: LoginFormProps['onSubmit'];
  onRegisterSubmit?: RegisterFormProps['onSubmit'];
  className?: string;
}

const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthText = (strength: number): string => {
  switch (strength) {
    case 0:
      return 'Enter a password';
    case 1:
      return 'Weak password';
    case 2:
      return 'Fair password';
    case 3:
      return 'Good password';
    case 4:
      return 'Strong password';
    default:
      return '';
  }
};

const validatePassword = (password: string, isRegister: boolean): string | undefined => {
  if (!password) {
    return 'Password is required';
  }
  if (isRegister) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return 'Password must contain both uppercase and lowercase letters';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
  }
  return undefined;
};

const validateForm = (values: RegisterFormData, mode: AuthMode): Partial<RegisterFormData> => {
  const errors: Partial<RegisterFormData> = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password, mode === 'register');
  if (passwordError) errors.password = passwordError;

  if (mode === 'register') {
    if (!values.name?.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  mode: initialMode = 'login',
  onLoginSubmit,
  onRegisterSubmit,
  className,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [values, setValues] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegisterFormData, boolean>>>({});

  const passwordStrength = getPasswordStrength(values.password);

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setTouched({});
  };

  const handleChange = (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [field]: e.target.value };
    setValues(newValues);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof RegisterFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    const fieldErrors = validateForm(values, mode);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(values, mode);
    setErrors(formErrors);

    const touchedFields =
      mode === 'login'
        ? { email: true, password: true }
        : { email: true, password: true, confirmPassword: true, name: true };

    setTouched(touchedFields);

    if (Object.keys(formErrors).length === 0) {
      if (mode === 'login') {
        const loginData: LoginFormData = {
          email: values.email,
          password: values.password,
        };
        console.log('[DEBUG_LOG] Login form submitted:', loginData);
        onLoginSubmit?.(loginData);
      } else {
        const registerData: RegisterFormData = {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          name: values.name,
        };
        console.log('[DEBUG_LOG] Registration form submitted:', registerData);
        onRegisterSubmit?.(registerData);
      }

      // Clear form after successful submission
      setValues({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className={className}>
      <FormHeader>
        <Title>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Title>
        <Subtitle>
          {mode === 'login' ? 'Sign in to your PickleMatch account' : 'Join the PickleMatch community'}
        </Subtitle>
      </FormHeader>

      <ModeToggle>
        <ModeButton type="button" active={mode === 'login'} onClick={() => handleModeChange('login')}>
          Sign In
        </ModeButton>
        <ModeButton type="button" active={mode === 'register'} onClick={() => handleModeChange('register')}>
          Sign Up
        </ModeButton>
      </ModeToggle>

      {mode === 'register' && (
        <FormField>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            className={classNames({ error: touched.name && errors.name })}
            placeholder="Enter your full name"
          />
          {touched.name && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormField>
      )}

      <FormField>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          className={classNames({ error: touched.email && errors.email })}
          placeholder="Enter your email"
        />
        {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          className={classNames({ error: touched.password && errors.password })}
          placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
        />
        {mode === 'register' && values.password && (
          <>
            <PasswordStrengthIndicator strength={passwordStrength} />
            <PasswordStrengthText strength={passwordStrength}>
              {getPasswordStrengthText(passwordStrength)}
            </PasswordStrengthText>
          </>
        )}
        {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormField>

      {mode === 'register' && (
        <FormField>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            className={classNames({ error: touched.confirmPassword && errors.confirmPassword })}
            placeholder="Confirm your password"
          />
          {touched.confirmPassword && errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </FormField>
      )}

      <SubmitButton type="submit">{mode === 'login' ? 'Sign In' : 'Create Account'}</SubmitButton>
    </FormContainer>
  );
};

AuthForm.displayName = 'AuthForm';
