import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropdownsState } from './types';
const initialState: DropdownsState = {
  isFmsOpen: false,
  fmsComponentIndex: 0,
  musicComponentIndex: 0,
  isMusicOpen: false,
};

const DropdownsSlice = createSlice({
  name: 'dropdowns',
  initialState,
  reducers: {
    setIsFmsOpen(state, action: PayloadAction<boolean>) {
      state.isFmsOpen = action.payload;
    },
    setIsMusicOpen(state, action: PayloadAction<boolean>) {
      state.isMusicOpen = action.payload;
    },
    setFmsComponentIndex(state, action: PayloadAction<number>) {
      state.fmsComponentIndex = action.payload;
    },
    setIsMusicComponentIndex(state, action: PayloadAction<number>) {
      state.musicComponentIndex = action.payload;
    },
  },
});

export const { setIsFmsOpen, setIsMusicOpen, setFmsComponentIndex, setIsMusicComponentIndex } =
  DropdownsSlice.actions;

export default DropdownsSlice.reducer;
