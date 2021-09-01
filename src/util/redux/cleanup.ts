import { createSlice } from '@reduxjs/toolkit';

export const cleanupSlice = createSlice({
  name: 'cleanup',
  initialState: {
    tokens: {
      count: 0,
      time: 0,
    },
    sessions: {
      count: 0,
      time: 0,
    },
  },
  reducers: {
    writeToTokens: (state) => {
      state.tokens = {
        count: state.tokens.count+1,
        time: Date.now(),
      };
    },
    cleanupTokens: (state) => {
      state.tokens = {
        count: 0,
        time: Date.now(),
      };
    },
    writeToSessions: (state) => {
      state.tokens = {
        count: state.tokens.count+1,
        time: Date.now(),
      };
    },
    cleanupSessions: (state) => {
      state.tokens = {
        count: 0,
        time: Date.now(),
      };
    },
  },
});

export const cleanupReducer = cleanupSlice.reducer;

export const {
  writeToTokens,
  cleanupTokens,
  writeToSessions,
  cleanupSessions,
} = cleanupSlice.actions;
