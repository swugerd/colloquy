import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import auth from './auth/slice';

export const store = configureStore({
  reducer: {
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
