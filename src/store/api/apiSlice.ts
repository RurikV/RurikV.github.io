import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_BASE_URL,
  COMMAND_ID,
  SignUpBody,
  AuthResult,
  SignInBody,
  Profile,
  UpdateProfileBody,
  ChangePasswordBody,
  ChangePasswordResult,
  UploadResult,
  ErrorCode,
} from '../../types/api';

// Helper function to parse server errors
const parseServerError = (error: any): string => {
  if (error?.data?.errors && Array.isArray(error.data.errors)) {
    const serverErrors = error.data.errors;

    // Check for specific email validation error
    const emailError = serverErrors.find(
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
      (err: any) => err.extensions?.code === ErrorCode.ERR_ACCOUNT_ALREADY_EXIST
    );

    if (accountExistsError) {
      return 'An account with this email already exists.';
    }

    // Check for required field errors
    const requiredFieldError = serverErrors.find((err: any) => err.extensions?.code === ErrorCode.ERR_FIELD_REQUIRED);

    if (requiredFieldError) {
      return `${requiredFieldError.fieldName || 'Field'} is required.`;
    }

    // Check for invalid password error
    const passwordError = serverErrors.find((err: any) => err.extensions?.code === ErrorCode.ERR_INVALID_PASSWORD);

    if (passwordError) {
      return 'Password must be at least 8 characters and contain letters, numbers, and special characters.';
    }

    // Return first error message if available
    if (serverErrors[0]?.message) {
      return serverErrors[0].message;
    }
  }

  // Fallback error messages
  if (error?.status === 400) {
    return 'Invalid request. Please check your input.';
  }

  if (error?.status === 500) {
    return 'Server error. Please try again later.';
  }

  return 'An unexpected error occurred. Please try again.';
};

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add authorization header if token exists
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Profile'],
  endpoints: (builder) => ({
    // Registration endpoint
    signUp: builder.mutation<AuthResult, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: {
          email,
          password,
          commandId: COMMAND_ID,
        } as SignUpBody,
      }),
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query signup error:', response);
        return parseServerError(response);
      },
      invalidatesTags: ['Auth'],
    }),

    // Sign in endpoint
    signIn: builder.mutation<AuthResult, SignInBody>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query signin error:', response);
        return parseServerError(response);
      },
      invalidatesTags: ['Auth'],
    }),

    // Get profile endpoint
    getProfile: builder.query<Profile, void>({
      query: () => '/profile',
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query get profile error:', response);
        return parseServerError(response);
      },
      providesTags: ['Profile'],
    }),

    // Update profile endpoint
    updateProfile: builder.mutation<Profile, UpdateProfileBody>({
      query: (body) => ({
        url: '/profile',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query update profile error:', response);
        return parseServerError(response);
      },
      invalidatesTags: ['Profile'],
    }),

    // Change password endpoint
    changePassword: builder.mutation<ChangePasswordResult, ChangePasswordBody>({
      query: (body) => ({
        url: '/profile/change-password',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query change password error:', response);
        return parseServerError(response);
      },
    }),

    // Upload file endpoint
    uploadFile: builder.mutation<UploadResult, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      transformErrorResponse: (response) => {
        console.log('[DEBUG_LOG] RTK Query upload error:', response);
        return parseServerError(response);
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useSignUpMutation,
  useSignInMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadFileMutation,
} = api;
