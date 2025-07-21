import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../store/hooks';
import {
  registerRequest,
  registerReset,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET,
} from '../../../store/sagas/registrationSaga';

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

// Saga registration state interface
interface SagaRegistrationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  token: string | null;
}

interface SagaRegistrationProps {
  className?: string;
}

export const SagaRegistration: React.FC<SagaRegistrationProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sagaState, setSagaState] = useState<SagaRegistrationState>({
    loading: false,
    success: false,
    error: null,
    token: null,
  });

  const dispatch = useAppDispatch();

  // Listen to Redux actions to update local state
  useEffect(() => {
    const handleAction = (action: any) => {
      switch (action.type) {
        case REGISTER_REQUEST:
          setSagaState((prev) => ({
            ...prev,
            loading: true,
            success: false,
            error: null,
          }));
          break;
        case REGISTER_SUCCESS:
          setSagaState((prev) => ({
            ...prev,
            loading: false,
            success: true,
            error: null,
            token: action.payload.token,
          }));
          setEmail('');
          setPassword('');
          console.log('[DEBUG_LOG] Saga registration token received:', action.payload.token);
          break;
        case REGISTER_FAILURE:
          setSagaState((prev) => ({
            ...prev,
            loading: false,
            success: false,
            error: action.payload.error,
            token: null,
          }));
          break;
        case REGISTER_RESET:
          setSagaState({
            loading: false,
            success: false,
            error: null,
            token: null,
          });
          break;
      }
    };

    // Subscribe to store changes
    const unsubscribe = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.subscribe?.(handleAction);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('[DEBUG_LOG] Saga registration started:', { email });

    // Dispatch the saga action
    dispatch(registerRequest(email, password));
  };

  const handleReset = () => {
    dispatch(registerReset());
    setEmail('');
    setPassword('');
  };

  return (
    <Container className={className}>
      <Title>Register with Redux Saga</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="saga-email">Email Address *</Label>
          <Input
            id="saga-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!sagaState.error}
            placeholder="Enter your email"
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="saga-password">Password *</Label>
          <Input
            id="saga-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={!!sagaState.error}
            placeholder="Enter your password"
            required
          />
        </FormField>

        {sagaState.error && <ErrorMessage>{sagaState.error}</ErrorMessage>}
        {sagaState.success && (
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

        <SubmitButton type="submit" disabled={sagaState.loading}>
          {sagaState.loading && <LoadingSpinner />}
          {sagaState.loading ? 'Registering...' : 'Register'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

SagaRegistration.displayName = 'SagaRegistration';
