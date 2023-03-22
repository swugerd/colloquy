import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';
const initialState: AuthState = {
  isAuth: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
