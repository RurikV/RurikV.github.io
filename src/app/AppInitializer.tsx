import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { syncTokenFromStorage } from '../store/slices/authSlice';
import { initializeApp } from '../store/slices/appSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);

  useEffect(() => {
    // Initialize app on first load
    if (!isInitialized) {
      // Sync token from localStorage on app start
      dispatch(syncTokenFromStorage());

      // Mark app as initialized
      dispatch(initializeApp());
    }

    // Set up localStorage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'picklematch_token') {
        dispatch(syncTokenFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch, isInitialized]);

  return <>{children}</>;
};

export default AppInitializer;
