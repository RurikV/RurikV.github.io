import React, { useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL, COMMAND_ID, SignUpBody, AuthResult, ErrorCode } from '../../../types/api';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.hasError ? '#e74c3c' : '#e1e8ed')};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? '#e74c3c' : '#27ae60')};
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styled.span`
  color: #27ae60;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
`;

const SubmitButton = styled.button`
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

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FetchRegistrationProps {
  className?: string;
}

export const FetchRegistration: React.FC<FetchRegistrationProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const parseServerError = (errorData: unknown): string => {
    console.log('[DEBUG_LOG] Fetch parsing error:', errorData);

    if ((errorData as any)?.errors && Array.isArray((errorData as any).errors)) {
      const serverErrors = (errorData as any).errors;

      // Check for specific email validation error
      const emailError = serverErrors.find(
        (err: unknown) =>
          (err as any).extensions?.code === ErrorCode.ERR_VALIDATION_ERROR ||
          (err as any).extensions?.code === ErrorCode.ERR_NOT_VALID ||
          (err as any).fieldName === 'email'
      );

      if (emailError) {
        return 'Invalid email address. Please check your email format.';
      }

      // Check for account already exists error
      const accountExistsError = serverErrors.find(
        (err: unknown) => (err as any).extensions?.code === ErrorCode.ERR_ACCOUNT_ALREADY_EXIST
      );

      if (accountExistsError) {
        return 'An account with this email already exists.';
      }

      // Check for required field errors
      const requiredFieldError = serverErrors.find(
        (err: unknown) => (err as any).extensions?.code === ErrorCode.ERR_FIELD_REQUIRED
      );

      if (requiredFieldError) {
        return `${requiredFieldError.fieldName || 'Field'} is required.`;
      }

      // Check for invalid password error
      const passwordError = serverErrors.find(
        (err: unknown) => (err as any).extensions?.code === ErrorCode.ERR_INVALID_PASSWORD
      );

      if (passwordError) {
        return 'Password must be at least 8 characters and contain letters, numbers, and special characters.';
      }

      // Return first error message if available
      if (serverErrors[0]?.message) {
        return serverErrors[0].message;
      }
    }

    return 'An unexpected error occurred. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('[DEBUG_LOG] Fetch registration started:', { email });

      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          commandId: COMMAND_ID,
        } as SignUpBody),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('[DEBUG_LOG] Fetch registration error:', data);
        setError(parseServerError(data));
        return;
      }

      console.log('[DEBUG_LOG] Fetch registration success:', data);
      const result = data as AuthResult;

      setSuccess(true);
      setEmail('');
      setPassword('');

      // You could store the token in localStorage or dispatch to Redux here
      console.log('[DEBUG_LOG] Registration token received:', result.token);
    } catch (err: unknown) {
      console.log('[DEBUG_LOG] Fetch registration error caught:', err);
      setError((err as any).message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={className}>
      <Title>Register with Fetch API</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="fetch-email">Email Address *</Label>
          <Input
            id="fetch-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!error}
            placeholder="Enter your email"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="fetch-password">Password *</Label>
          <Input
            id="fetch-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={!!error}
            placeholder="Enter your password"
            required
          />
        </FormField>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Registration successful! Token received.</SuccessMessage>}

        <SubmitButton type="submit" disabled={loading}>
          {loading && <LoadingSpinner />}
          {loading ? 'Registering...' : 'Register'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

FetchRegistration.displayName = 'FetchRegistration';
