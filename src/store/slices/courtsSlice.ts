import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Court {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  availability: {
    date: string;
    timeSlots: string[];
  }[];
}

interface CourtsState {
  courts: Court[];
  loading: boolean;
  error: string | null;
  filters: {
    location: string;
    priceRange: [number, number];
    rating: number;
  };
}

const initialState: CourtsState = {
  courts: [],
  loading: false,
  error: null,
  filters: {
    location: '',
    priceRange: [0, 1000],
    rating: 0,
  },
};

const courtsSlice = createSlice({
  name: 'courts',
  initialState,
  reducers: {
    setCourts: (state, action: PayloadAction<Court[]>) => {
      state.courts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCourt: (state, action: PayloadAction<Court>) => {
      state.courts.push(action.payload);
    },
    updateCourt: (state, action: PayloadAction<Court>) => {
      const index = state.courts.findIndex((court) => court.id === action.payload.id);
      if (index !== -1) {
        state.courts[index] = action.payload;
      }
    },
    removeCourt: (state, action: PayloadAction<string>) => {
      state.courts = state.courts.filter((court) => court.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action: PayloadAction<Partial<CourtsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        priceRange: [0, 1000],
        rating: 0,
      };
    },
  },
});

export const { setCourts, addCourt, updateCourt, removeCourt, setLoading, setError, setFilters, clearFilters } =
  courtsSlice.actions;

export default courtsSlice.reducer;
