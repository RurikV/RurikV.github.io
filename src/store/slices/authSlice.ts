import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  about?: string;
}

interface AuthState {
  token: string | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

// Helper functions for localStorage
const getTokenFromStorage = (): string | null => {
  return storage.get('picklematch_token');
};

const setTokenToStorage = (token: string | null): void => {
  if (token) {
    storage.set('picklematch_token', token);
  } else {
    storage.remove('picklematch_token');
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
    role: isAdmin ? UserRole.Admin : UserRole.User,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${hash}`,
    about: isAdmin
      ? 'Administrator with full access to manage courts and games.'
      : 'Regular user who can book courts and play games.',
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
    updateProfile: (state, action: PayloadAction<{ name: string; about: string; isAdmin: boolean }>) => {
      if (state.profile) {
        state.profile.name = action.payload.name;
        state.profile.about = action.payload.about;
        state.profile.role = action.payload.isAdmin ? UserRole.Admin : UserRole.User;
      }
    },
  },
});

export const { login, logout, syncTokenFromStorage, updateProfile } = authSlice.actions;
export default authSlice.reducer;
