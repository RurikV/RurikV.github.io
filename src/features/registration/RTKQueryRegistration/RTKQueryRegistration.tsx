import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useSignUpMutation } from '../../../store/api/apiSlice';

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

interface RTKQueryRegistrationProps {
  className?: string;
}

export const RTKQueryRegistration: React.FC<RTKQueryRegistrationProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Use RTK Query mutation hook
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      console.log('[DEBUG_LOG] RTK Query registration started:', { email });

      const result = await signUp({ email, password }).unwrap();

      console.log('[DEBUG_LOG] RTK Query registration success:', result);

      setSuccess(true);
      setEmail('');
      setPassword('');

      // You could dispatch to Redux auth slice here
      console.log('[DEBUG_LOG] Registration token received:', result.token);
    } catch (err: unknown) {
      console.log('[DEBUG_LOG] RTK Query registration error:', err);
      // Error is handled by RTK Query and available in the error state
    }
  };

  // Get error message from RTK Query error
  const getErrorMessage = (): string | null => {
    if (!error) return null;

    // RTK Query error can be in different formats
    if (typeof error === 'string') {
      return error;
    }

    if ('data' in error && typeof error.data === 'string') {
      return error.data;
    }

    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  };

  const errorMessage = getErrorMessage();

  return (
    <Container className={className}>
      <Title>Register with RTK Query</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="rtk-email">Email Address *</Label>
          <Input
            id="rtk-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!errorMessage}
            placeholder="Enter your email"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="rtk-password">Password *</Label>
          <Input
            id="rtk-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={!!errorMessage}
            placeholder="Enter your password"
            required
          />
        </FormField>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {success && <SuccessMessage>Registration successful! Token received.</SuccessMessage>}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading && <LoadingSpinner />}
          {isLoading ? 'Registering...' : 'Register'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

RTKQueryRegistration.displayName = 'RTKQueryRegistration';
