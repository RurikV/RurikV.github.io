import React, { useState } from 'react';
import styledComponents from 'styled-components';
import { handleGraphQLErrors } from '../types/errors';

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

const Input = styledComponents.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e1e8ed'};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #27ae60;
  }
`;

const ErrorMessage = styledComponents.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styledComponents.span`
  color: #27ae60;
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

const TokenDisplay = styledComponents.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  word-break: break-all;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
`;

const LogoutButton = styledComponents.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c0392b;
  }
`;

interface LoginFormData {
  email: string;
  password: string;
}

interface ServerError {
  extensions: {
    code: string;
    fieldName?: string;
    stacktrace: string;
  };
  name: string;
  message: string;
}

interface ServerErrorResponse {
  errors: ServerError[];
}

const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const GraphQLAuth: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
    
    // Clear general messages
    setGeneralError('');
    setSuccessMessage('');
  };

  const handleServerError = (errorResponse: ServerErrorResponse) => {
    console.log('[DEBUG_LOG] Server error response:', errorResponse);
    
    const newErrors: Partial<LoginFormData> = {};
    let hasGeneralError = false;

    errorResponse.errors.forEach(error => {
      switch (error.extensions.code) {
        case 'ERR_INCORRECT_EMAIL_OR_PASSWORD':
          setGeneralError('Incorrect email or password');
          hasGeneralError = true;
          break;
        case 'ERR_FIELD_REQUIRED':
          if (error.extensions.fieldName) {
            newErrors[error.extensions.fieldName as keyof LoginFormData] = 'This field is required';
          }
          break;
        case 'ERR_AUTH':
          setGeneralError('Authentication failed');
          hasGeneralError = true;
          break;
        default:
          setGeneralError(error.message || 'An error occurred during login');
          hasGeneralError = true;
      }
    });

    if (!hasGeneralError && Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');
    setSuccessMessage('');

    try {
      console.log('[DEBUG_LOG] Attempting login with:', { email: formData.email });

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: {
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      const result = await response.json();
      console.log('[DEBUG_LOG] Login response:', result);

      if (result.errors) {
        handleServerError({ errors: result.errors });
        return;
      }

      if (result.data?.login?.token) {
        const authToken = result.data.login.token;
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        setSuccessMessage(`Successfully logged in as ${result.data.login.user.email}`);
        console.log('[DEBUG_LOG] Login successful, token saved');
        
        // Clear form
        setFormData({ email: '', password: '' });
      } else {
        setGeneralError('Login failed: No token received');
      }
    } catch (error) {
      console.error('[DEBUG_LOG] Login error:', error);
      setGeneralError('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('auth_token');
    setSuccessMessage('Successfully logged out');
    console.log('[DEBUG_LOG] User logged out');
  };

  if (token) {
    return (
      <FormContainer>
        <FormHeader>
          <Title>Authenticated</Title>
          <Subtitle>You are successfully logged in</Subtitle>
        </FormHeader>
        
        <SuccessMessage>Authentication successful!</SuccessMessage>
        
        <TokenDisplay>
          <strong>Token:</strong><br />
          {token}
        </TokenDisplay>
        
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </FormContainer>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <Title>GraphQL Authentication</Title>
        <Subtitle>Login to access protected features</Subtitle>
      </FormHeader>

      {generalError && <ErrorMessage>{generalError}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          hasError={!!errors.email}
          disabled={isLoading}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange('password')}
          hasError={!!errors.password}
          disabled={isLoading}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormField>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </SubmitButton>
    </FormContainer>
  );
};

GraphQLAuth.displayName = 'GraphQLAuth';