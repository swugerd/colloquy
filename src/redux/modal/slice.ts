import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './types';
import img from '../../assets/uploads/test/image.png';
const initialState: ModalState = {
  uploadFilesModal: {
    isOpen: false,
  },
  uploadMediaModal: {
    isOpen: false,
  },
  forwardModal: {
    isOpen: false,
  },
  moreAccsModal: {
    isOpen: false,
    accounts: [
      { id: 1, img, name: 'Пашок Кубыркин' },
      { id: 2, img, name: 'Овыфлвфы врфыоврыфол' },
      { id: 3, img, name: 'да нет' },
      { id: 4, img, name: 'Жесткий Пашок' },
      { id: 5, img, name: 'Жесткий Пашок' },
      // { id: 6, img, name: 'Жесткий Пашок' },
    ],
  },
  openModalButtons: ['uploadFilesButton', 'uploadMediaButton', 'forwardButton', 'accountButton'],
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsUploadFilesModalOpen(state, action: PayloadAction<boolean>) {
      state.uploadFilesModal.isOpen = action.payload;
    },
    setIsUploadMediaModalOpen(state, action: PayloadAction<boolean>) {
      state.uploadMediaModal.isOpen = action.payload;
    },
    setIsForwardModalOpen(state, action: PayloadAction<boolean>) {
      state.forwardModal.isOpen = action.payload;
    },
    setIsMoreAccsModalOpen(state, action: PayloadAction<boolean>) {
      state.moreAccsModal.isOpen = action.payload;
    },
  },
});

export const {
  setIsUploadFilesModalOpen,
  setIsUploadMediaModalOpen,
  setIsForwardModalOpen,
  setIsMoreAccsModalOpen,
} = ModalSlice.actions;

export default ModalSlice.reducer;
