import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GameType {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  equipment: string[];
  rules?: string;
}

interface GameTypesState {
  gameTypes: GameType[];
  loading: boolean;
  error: string | null;
}

// Initial game types data
const initialGameTypes: GameType[] = [
  {
    id: 'tennis',
    name: 'Tennis',
    description: 'Classic racquet sport played on a rectangular court with a net.',
    minPlayers: 2,
    maxPlayers: 4,
    equipment: ['Tennis racquet', 'Tennis balls', 'Appropriate footwear'],
    rules: 'Standard tennis rules apply. Matches can be singles (1v1) or doubles (2v2).',
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    description: 'Fast-growing paddle sport that combines elements of tennis, badminton, and ping-pong.',
    minPlayers: 2,
    maxPlayers: 4,
    equipment: ['Pickleball paddle', 'Pickleball', 'Non-marking court shoes'],
    rules: 'Played on a badminton-sized court with a lower net. Underhand serving only.',
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    description: 'Team sport where two teams hit a ball over a high net using their hands.',
    minPlayers: 6,
    maxPlayers: 12,
    equipment: ['Volleyball', 'Knee pads (optional)', 'Athletic shoes'],
    rules: 'Teams of 6 players each. Maximum of 3 touches per side before sending ball over net.',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    description: 'Racquet sport played with a shuttlecock over a high net.',
    minPlayers: 2,
    maxPlayers: 4,
    equipment: ['Badminton racquet', 'Shuttlecocks', 'Non-marking shoes'],
    rules: 'Can be played as singles or doubles. Rally scoring to 21 points.',
  },
];

const initialState: GameTypesState = {
  gameTypes: initialGameTypes,
  loading: false,
  error: null,
};

const gameTypesSlice = createSlice({
  name: 'gameTypes',
  initialState,
  reducers: {
    // Game type management
    addGameType: (state, action: PayloadAction<GameType>) => {
      state.gameTypes.push(action.payload);
    },
    updateGameType: (state, action: PayloadAction<GameType>) => {
      const index = state.gameTypes.findIndex((gameType) => gameType.id === action.payload.id);
      if (index !== -1) {
        state.gameTypes[index] = action.payload;
      }
    },
    removeGameType: (state, action: PayloadAction<string>) => {
      state.gameTypes = state.gameTypes.filter((gameType) => gameType.id !== action.payload);
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

export const { addGameType, updateGameType, removeGameType, setLoading, setError } = gameTypesSlice.actions;

export default gameTypesSlice.reducer;
