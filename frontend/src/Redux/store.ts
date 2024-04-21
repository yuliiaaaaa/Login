import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { dealsReducer } from './slices/deals.slice';

export const store = configureStore({
  reducer: {
    authReducer,
    dealsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
