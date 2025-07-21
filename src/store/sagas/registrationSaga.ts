import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, COMMAND_ID, SignUpBody, AuthResult, ErrorCode } from '../../types/api';

// Action types
export const REGISTER_REQUEST = 'registration/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'registration/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'registration/REGISTER_FAILURE';
export const REGISTER_RESET = 'registration/REGISTER_RESET';

// Action interfaces
export interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
  payload: {
    email: string;
    password: string;
  };
  [extraProps: string]: unknown;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    token: string;
  };
  [extraProps: string]: unknown;
}

export interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: {
    error: string;
  };
  [extraProps: string]: unknown;
}

export interface RegisterResetAction {
  type: typeof REGISTER_RESET;
  [extraProps: string]: unknown;
}

export type RegistrationAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | RegisterResetAction;

// Action creators
export const registerRequest = (email: string, password: string): RegisterRequestAction => ({
  type: REGISTER_REQUEST,
  payload: { email, password },
});

export const registerSuccess = (token: string): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: { token },
});

export const registerFailure = (error: string): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload: { error },
});

export const registerReset = (): RegisterResetAction => ({
  type: REGISTER_RESET,
});

// Helper function to parse server errors
const parseServerError = (errorData: unknown): string => {
  console.log('[DEBUG_LOG] Saga parsing error:', errorData);

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

// API call function
const registerApi = async (email: string, password: string): Promise<AuthResult> => {
  console.log('[DEBUG_LOG] Saga making registration API call:', { email });

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
    console.log('[DEBUG_LOG] Saga API error response:', data);
    throw new Error(parseServerError(data));
  }

  console.log('[DEBUG_LOG] Saga API success response:', data);
  return data as AuthResult;
};

// Registration saga
function* registerSaga(action: RegisterRequestAction) {
  try {
    console.log('[DEBUG_LOG] Registration saga started:', action.payload);

    const { email, password } = action.payload;

    // Call the registration API
    const result: AuthResult = yield call(registerApi, email, password);

    console.log('[DEBUG_LOG] Registration saga success:', result);

    // Dispatch success action
    yield put(registerSuccess(result.token));
  } catch (error: unknown) {
    console.log('[DEBUG_LOG] Registration saga error:', error);

    // Dispatch failure action
    yield put(registerFailure((error as any).message || 'Registration failed'));
  }
}

// Watcher saga
export function* watchRegistration() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}
