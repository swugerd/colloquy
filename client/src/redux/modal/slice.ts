import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './types';
import img from '../../assets/uploads/test/image.png';
const initialState: ModalState = {
  uploadFilesModal: {
    isOpen: false,
  },
  uploadMediaModal: {
    isOpen: false,
    modalType: 'audio',
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
  postContentModal: {
    isOpen: false,
  },
  openModalButtons: [
    'uploadFilesButton',
    'uploadMediaButton',
    'forwardButton',
    'accountButton',
    'postContentButton',
  ],
  createBaseModal: {
    isOpen: false,
    modalType: 'conversation',
  },
  membersModal: {
    isOpen: false,
  },
  mediaListModal: {
    isOpen: false,
    modalType: 'info',
  },
  confirmModal: {
    isOpen: false,
    modalType: 'friend',
  },
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
    setIsPostContentModalOpen(state, action: PayloadAction<boolean>) {
      state.postContentModal.isOpen = action.payload;
    },
    setIsCreateBaseModalOpen(state, action: PayloadAction<boolean>) {
      state.createBaseModal.isOpen = action.payload;
    },
    setCreateBaseModalType(state, action: PayloadAction<'conversation' | 'playlist'>) {
      state.createBaseModal.modalType = action.payload;
    },
    setIsMembersModalOpen(state, action: PayloadAction<boolean>) {
      state.membersModal.isOpen = action.payload;
    },
    setMediaListModalType(state, action: PayloadAction<'info' | 'media'>) {
      state.mediaListModal.modalType = action.payload;
    },
    setIsMediaListModalOpen(state, action: PayloadAction<boolean>) {
      state.mediaListModal.isOpen = action.payload;
    },
    setUploadMediaModalType(state, action: PayloadAction<'story' | 'audio' | 'photo' | 'video'>) {
      state.uploadMediaModal.modalType = action.payload;
    },
    setIsConfirmModalOpen(state, action: PayloadAction<boolean>) {
      state.confirmModal.isOpen = action.payload;
    },
    setConfirmModalType(
      state,
      action: PayloadAction<'friend' | 'group' | 'pageDelete' | 'passwordEnter'>,
    ) {
      state.confirmModal.modalType = action.payload;
    },
  },
});

export const {
  setIsUploadFilesModalOpen,
  setIsUploadMediaModalOpen,
  setIsForwardModalOpen,
  setIsMoreAccsModalOpen,
  setIsPostContentModalOpen,
  setIsCreateBaseModalOpen,
  setCreateBaseModalType,
  setIsMembersModalOpen,
  setIsMediaListModalOpen,
  setMediaListModalType,
  setUploadMediaModalType,
  setConfirmModalType,
  setIsConfirmModalOpen,
} = ModalSlice.actions;

export default ModalSlice.reducer;
