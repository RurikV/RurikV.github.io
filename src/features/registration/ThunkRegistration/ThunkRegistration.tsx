import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerUser, resetRegistration, clearError } from '../../../store/slices/registrationSlice';

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

interface ThunkRegistrationProps {
  className?: string;
}

export const ThunkRegistration: React.FC<ThunkRegistrationProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { loading, success, error, token } = useAppSelector((state) => state.registration);

  // Clear form when registration is successful
  useEffect(() => {
    if (success) {
      setEmail('');
      setPassword('');
      console.log('[DEBUG_LOG] Registration token received:', token);
    }
  }, [success, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('[DEBUG_LOG] Thunk registration started:', { email });

    // Clear any previous errors
    dispatch(clearError());

    // Dispatch the async thunk
    dispatch(registerUser({ email, password }));
  };

  const handleReset = () => {
    dispatch(resetRegistration());
    setEmail('');
    setPassword('');
  };

  return (
    <Container className={className}>
      <Title>Register with Redux Thunk</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="thunk-email">Email Address *</Label>
          <Input
            id="thunk-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!error}
            placeholder="Enter your email"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="thunk-password">Password *</Label>
          <Input
            id="thunk-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={!!error}
            placeholder="Enter your password"
            required
          />
        </FormField>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && (
          <SuccessMessage>
            Registration successful! Token received.{' '}
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                color: '#27ae60',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </SuccessMessage>
        )}

        <SubmitButton type="submit" disabled={loading}>
          {loading && <LoadingSpinner />}
          {loading ? 'Registering...' : 'Register'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

ThunkRegistration.displayName = 'ThunkRegistration';
