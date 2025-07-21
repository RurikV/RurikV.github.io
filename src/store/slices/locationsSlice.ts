import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Court {
  id: string;
  name: string;
  location: string;
  games: string[];
  pricePerHour: number;
  rating: number;
  description: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  image: string;
  availability: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  courts: Court[];
}

interface LocationsState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

// Initial data from CourtBookingApp
const initialLocations: Location[] = [
  {
    id: 'koorti',
    name: 'Koorti Sports Complex',
    address: 'Koorti tee 1, Nashville, Tennessee',
    coordinates: { lat: 59.437, lng: 24.7536 },
    courts: [
      {
        id: 'koorti-tennis-1',
        name: 'Tennis Court A',
        location: 'Koorti',
        games: ['tennis'],
        pricePerHour: 25,
        rating: 4.5,
        description: 'Professional tennis court with high-quality surface and excellent lighting.',
        amenities: ['Lighting', 'Seating', 'Equipment rental', 'Changing rooms'],
        coordinates: { lat: 59.437, lng: 24.7536 },
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Tennis+Court',
        availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
      },
      {
        id: 'koorti-pickleball-1',
        name: 'Pickleball Court Premium',
        location: 'Koorti',
        games: ['pickleball'],
        pricePerHour: 20,
        rating: 4.8,
        description: 'State-of-the-art pickleball court designed for both beginners and advanced players.',
        amenities: ['Professional net', 'Court lines', 'Equipment rental', 'Storage'],
        coordinates: { lat: 59.4371, lng: 24.7537 },
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Pickleball+Court',
        availability: ['08:00', '09:00', '12:00', '13:00', '17:00', '18:00', '20:00'],
      },
      {
        id: 'koorti-volleyball-1',
        name: 'Volleyball Arena',
        location: 'Koorti',
        games: ['volleyball'],
        pricePerHour: 30,
        rating: 4.3,
        description: 'Indoor volleyball court with professional-grade flooring and adjustable net height.',
        amenities: ['Adjustable net', 'Professional flooring', 'Scoreboard', 'Sound system'],
        coordinates: { lat: 59.4372, lng: 24.7538 },
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Volleyball+Court',
        availability: ['10:00', '11:00', '15:00', '16:00', '19:00', '20:00', '21:00'],
      },
    ],
  },
  {
    id: 'pirita',
    name: 'Pirita Sports Center',
    address: 'Pirita tee 26, Nashville, Tennessee',
    coordinates: { lat: 59.4696, lng: 24.8311 },
    courts: [
      {
        id: 'pirita-tennis-1',
        name: 'Seaside Tennis Court',
        location: 'Pirita',
        games: ['tennis'],
        pricePerHour: 28,
        rating: 4.7,
        description: 'Beautiful tennis court located near the seaside with stunning views.',
        amenities: ['Clay surface', 'Scenic views', 'Parking', 'Refreshments'],
        coordinates: { lat: 59.4696, lng: 24.8311 },
        image: 'https://via.placeholder.com/300x200/8BC34A/ffffff?text=Seaside+Tennis',
        availability: ['07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00'],
      },
      {
        id: 'pirita-pickleball-1',
        name: 'Coastal Pickleball',
        location: 'Pirita',
        games: ['pickleball'],
        pricePerHour: 22,
        rating: 4.6,
        description: 'Modern pickleball facility with ocean breeze and natural lighting.',
        amenities: ['Ocean view', 'Natural lighting', 'Equipment storage', 'Parking'],
        coordinates: { lat: 59.4697, lng: 24.8312 },
        image: 'https://via.placeholder.com/300x200/00BCD4/ffffff?text=Coastal+Pickleball',
        availability: ['08:00', '09:00', '10:00', '15:00', '16:00', '17:00', '18:00'],
      },
    ],
  },
];

const initialState: LocationsState = {
  locations: initialLocations,
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    // Location management
    addLocation: (state, action: PayloadAction<Omit<Location, 'courts'>>) => {
      const newLocation: Location = {
        ...action.payload,
        courts: [],
      };
      state.locations.push(newLocation);
    },
    updateLocation: (state, action: PayloadAction<Omit<Location, 'courts'>>) => {
      const index = state.locations.findIndex((location) => location.id === action.payload.id);
      if (index !== -1) {
        state.locations[index] = {
          ...state.locations[index],
          ...action.payload,
        };
      }
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter((location) => location.id !== action.payload);
    },

    // Court management
    addCourt: (state, action: PayloadAction<{ locationId: string; court: Court }>) => {
      const location = state.locations.find((loc) => loc.id === action.payload.locationId);
      if (location) {
        location.courts.push(action.payload.court);
      }
    },
    updateCourt: (state, action: PayloadAction<{ locationId: string; court: Court }>) => {
      const location = state.locations.find((loc) => loc.id === action.payload.locationId);
      if (location) {
        const courtIndex = location.courts.findIndex((court) => court.id === action.payload.court.id);
        if (courtIndex !== -1) {
          location.courts[courtIndex] = action.payload.court;
        }
      }
    },
    removeCourt: (state, action: PayloadAction<{ locationId: string; courtId: string }>) => {
      const location = state.locations.find((loc) => loc.id === action.payload.locationId);
      if (location) {
        location.courts = location.courts.filter((court) => court.id !== action.payload.courtId);
      }
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addLocation, updateLocation, removeLocation, addCourt, updateCourt, removeCourt, setLoading, setError } =
  locationsSlice.actions;

export default locationsSlice.reducer;
