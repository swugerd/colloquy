import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';
const initialState: AuthState = {
  isAuth: localStorage.getItem('jwtToken') ? true : false,
  user: {
    name: '',
    nickname: '',
  },
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
    },
    setUserNickname(state, action: PayloadAction<string>) {
      state.user.nickname = action.payload;
    },
  },
});

export const { setIsAuth, setUserName, setUserNickname } = AuthSlice.actions;

export default AuthSlice.reducer;
