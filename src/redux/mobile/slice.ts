import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileState } from './types';
const initialState: MobileState = {
  title: '',
  isSidebarShow: false,
  isHeaderShow: false,
  hasArrowButton: false,
  infoName: '',
  backText: '',
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
    setHasArrowButton(state, action: PayloadAction<boolean>) {
      state.hasArrowButton = action.payload;
    },
    setIsInfoName(state, action: PayloadAction<string>) {
      state.infoName = action.payload;
    },
    setHasBackButton(state, action: PayloadAction<string>) {
      state.backText = action.payload;
    },
  },
});

export const {
  setTitle,
  setIsSidebarShow,
  setIsHeaderShow,
  setHasArrowButton,
  setIsInfoName,
  setHasBackButton,
} = MobileSlice.actions;

export default MobileSlice.reducer;
