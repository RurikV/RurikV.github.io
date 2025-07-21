import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
}

const initialState: AppState = {
  isInitialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { initializeApp } = appSlice.actions;
export default appSlice.reducer;