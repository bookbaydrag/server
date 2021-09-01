import { configureStore } from '@reduxjs/toolkit';
import { cleanupReducer } from './cleanup';

const store = configureStore({
  reducer: {
    cleanup: cleanupReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
