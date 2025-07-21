import { configureStore } from '@reduxjs/toolkit';
import authReducer, { syncTokenFromStorage } from './slices/authSlice';
import appReducer from './slices/appSlice';
import cartReducer from './slices/cartSlice';
import courtsReducer from './slices/courtsSlice';

// Middleware for localStorage synchronization between tabs
const localStorageSyncMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  // Listen for storage events to sync token between tabs
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === 'picklematch_token') {
        store.dispatch(syncTokenFromStorage());
      }
    });
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    cart: cartReducer,
    courts: courtsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(localStorageSyncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
