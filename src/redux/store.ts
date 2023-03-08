import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import auth from './auth/slice';
import mobile from './mobile/slice';
import dropdowns from './dropdowns/slice';
import modal from './modal/slice';

export const store = configureStore({
  reducer: {
    auth,
    mobile,
    dropdowns,
    modal,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
