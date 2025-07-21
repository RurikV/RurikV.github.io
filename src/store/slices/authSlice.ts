import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  token: string | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

// Helper functions for localStorage
const getTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem('picklematch_token');
  } catch {
    return null;
  }
};

const setTokenToStorage = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem('picklematch_token', token);
    } else {
      localStorage.removeItem('picklematch_token');
    }
  } catch {
    // Handle localStorage errors silently
  }
};

// Generate fake profile based on token
const generateFakeProfile = (token: string): Profile => {
  // Simple hash to determine user type
  const hash = token.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isAdmin = hash % 10 === 0; // 10% chance to be admin

  return {
    id: `user_${hash}`,
    name: isAdmin ? 'Admin User' : 'Regular User',
    email: isAdmin ? 'admin@picklematch.com' : 'user@picklematch.com',
    role: isAdmin ? 'admin' : 'user',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${hash}`,
  };
};

const initialState: AuthState = {
  token: getTokenFromStorage(),
  profile: null,
  isAuthenticated: false,
};

// Set initial profile if token exists
if (initialState.token) {
  initialState.profile = generateFakeProfile(initialState.token);
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      state.token = token;
      state.profile = generateFakeProfile(token);
      state.isAuthenticated = true;
      setTokenToStorage(token);
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.isAuthenticated = false;
      setTokenToStorage(null);
    },
    syncTokenFromStorage: (state) => {
      const token = getTokenFromStorage();
      if (token && token !== state.token) {
        state.token = token;
        state.profile = generateFakeProfile(token);
        state.isAuthenticated = true;
      } else if (!token && state.token) {
        state.token = null;
        state.profile = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, syncTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
