import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer, { syncTokenFromStorage } from './slices/authSlice';
import appReducer from './slices/appSlice';
import cartReducer from './slices/cartSlice';
import courtsReducer from './slices/courtsSlice';
import locationsReducer from './slices/locationsSlice';
import gameTypesReducer from './slices/gameTypesSlice';
import registrationReducer from './slices/registrationSlice';
import { api } from './api/apiSlice';
import rootSaga from './sagas/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Middleware for localStorage synchronization between tabs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    locations: locationsReducer,
    gameTypes: gameTypesReducer,
    registration: registrationReducer,
    // Add RTK Query API reducer
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(api.middleware)
      .concat(sagaMiddleware)
      .concat(localStorageSyncMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
