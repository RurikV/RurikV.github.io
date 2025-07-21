import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL, COMMAND_ID, SignUpBody, AuthResult, ErrorCode, RegistrationState } from '../../types/api';

// Initial state
const initialState: RegistrationState = {
  loading: false,
  success: false,
  error: null,
  token: null,
};

// Helper function to parse server errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseServerError = (errorData: any): string => {
  console.log('[DEBUG_LOG] Thunk parsing error:', errorData);

  if (errorData?.errors && Array.isArray(errorData.errors)) {
    const serverErrors = errorData.errors;

    // Check for specific email validation error
    const emailError = serverErrors.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) =>
        err.extensions?.code === ErrorCode.ERR_VALIDATION_ERROR ||
        err.extensions?.code === ErrorCode.ERR_NOT_VALID ||
        err.fieldName === 'email'
    );

    if (emailError) {
      return 'Invalid email address. Please check your email format.';
    }

    // Check for account already exists error
    const accountExistsError = serverErrors.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => err.extensions?.code === ErrorCode.ERR_ACCOUNT_ALREADY_EXIST
    );

    if (accountExistsError) {
      return 'An account with this email already exists.';
    }

    // Check for required field errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requiredFieldError = serverErrors.find((err: any) => err.extensions?.code === ErrorCode.ERR_FIELD_REQUIRED);

    if (requiredFieldError) {
      return `${requiredFieldError.fieldName || 'Field'} is required.`;
    }

    // Check for invalid password error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const passwordError = serverErrors.find((err: any) => err.extensions?.code === ErrorCode.ERR_INVALID_PASSWORD);

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

// Async thunk for registration
export const registerUser = createAsyncThunk<AuthResult, { email: string; password: string }, { rejectValue: string }>(
  'registration/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('[DEBUG_LOG] Thunk registration started:', { email });

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
        console.log('[DEBUG_LOG] Thunk registration error:', data);
        return rejectWithValue(parseServerError(data));
      }

      console.log('[DEBUG_LOG] Thunk registration success:', data);
      return data as AuthResult;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('[DEBUG_LOG] Thunk registration error caught:', error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Registration slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResult>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Registration failed';
        state.token = null;
      });
  },
});

export const { resetRegistration, clearError } = registrationSlice.actions;
export default registrationSlice.reducer;
