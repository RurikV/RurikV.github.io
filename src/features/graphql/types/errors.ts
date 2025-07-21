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
  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER',
}

export interface ServerError {
  extensions: {
    code: ErrorCode;
    fieldName?: string;
    stacktrace: string;
  };
  name: string;
  message: string;
}

export interface ServerErrorResponse {
  errors: ServerError[];
}

export const getErrorMessage = (error: ServerError): string => {
  switch (error.extensions.code) {
    case ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD:
      return 'Incorrect email or password';
    case ErrorCode.ERR_ACCOUNT_ALREADY_EXIST:
      return 'Account already exists';
    case ErrorCode.ERR_FIELD_REQUIRED:
      return error.extensions.fieldName
        ? `${error.extensions.fieldName} is required`
        : 'Required field is missing';
    case ErrorCode.ERR_INCORRECT_PASSWORD:
      return 'Incorrect password';
    case ErrorCode.ERR_INVALID_PASSWORD:
      return 'Password must be at least 8 characters and contain letters, numbers, and special characters';
    case ErrorCode.ERR_NOT_VALID:
      return 'Invalid data provided';
    case ErrorCode.ERR_AUTH:
      return 'Authentication failed. Please login again';
    case ErrorCode.ERR_NO_FILES:
      return 'No files provided';
    case ErrorCode.ERR_NOT_ALLOWED:
      return 'You do not have permission to perform this action';
    case ErrorCode.ERR_NOT_FOUND:
      return 'Resource not found';
    case ErrorCode.ERR_VALIDATION_ERROR:
      return 'Validation error. Please check your input';
    case ErrorCode.ERR_INTERNAL_SERVER:
      return 'Internal server error. Please try again later';
    default:
      return error.message || 'An unknown error occurred';
  }
};

export const handleGraphQLErrors = (errors: any[]): string => {
  if (!errors || errors.length === 0) {
    return 'Unknown error occurred';
  }

  const serverErrors = errors as ServerError[];
  const errorMessages = serverErrors.map(getErrorMessage);
  return errorMessages.join(', ');
};