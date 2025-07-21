// API Base URL
export const API_BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';

// Command ID for registration (can be customized)
export const COMMAND_ID = 'registration-demo-2025';

// Error codes from server
export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_NOT_VALID = 'ERR_NOT_VALID',
  ERR_AUTH = 'ERR_AUTH',
  ERR_NO_FILES = 'ERR_NO_FILES',
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR',
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS',
  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER',
}

// Server error structure
export interface ServerError {
  extensions: {
    code: ErrorCode;
  };
  name: string;
  fieldName?: string;
  stack: string;
  message: string;
}

export interface ServerErrors {
  errors: ServerError[];
}

// Registration request body
export interface SignUpBody {
  email: string;
  password: string;
  commandId: string;
}

// Authentication result
export interface AuthResult {
  token: string;
}

// Sign in request body
export interface SignInBody {
  email: string;
  password: string;
}

// Profile data
export interface Profile {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
  commandId: string;
}

// Update profile request body
export interface UpdateProfileBody {
  name: string;
}

// Change password request body
export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

// Change password result
export interface ChangePasswordResult {
  success: boolean;
}

// Upload result
export interface UploadResult {
  url: string;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ServerErrors;
}

// Registration form data (extends existing RegisterFormData)
export interface RegistrationFormData {
  email: string;
  password: string;
  name?: string; // Optional for this demo
}

// Registration state for different implementations
export interface RegistrationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  token: string | null;
}
