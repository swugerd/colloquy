import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileState } from './types';
const initialState: MobileState = {
  title: 'Новости',
  isSidebarShow: false,
  isHeaderShow: false,
};

const MobileSlice = createSlice({
  name: 'mobile',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setIsSidebarShow(state, action: PayloadAction<boolean>) {
      state.isSidebarShow = action.payload;
    },
    setIsHeaderShow(state, action: PayloadAction<boolean>) {
      state.isHeaderShow = action.payload;
    },
  },
});

export const { setTitle, setIsSidebarShow, setIsHeaderShow } = MobileSlice.actions;

export default MobileSlice.reducer;
