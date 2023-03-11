import { ModalOpenButtons } from './../../types/modalOpenButtons';
export interface ModalState {
  uploadFilesModal: {
    isOpen: boolean;
  };
  uploadMediaModal: {
    isOpen: boolean;
    modalType: 'story' | 'audio' | 'photo' | 'video';
  };
  forwardModal: {
    isOpen: boolean;
  };
  moreAccsModal: {
    isOpen: boolean;
    accounts: { id: number; img: string; name: string }[];
  };
  postContentModal: {
    isOpen: boolean;
  };
  createBaseModal: {
    isOpen: boolean;
    modalType: 'conversation' | 'playlist';
  };
  membersModal: {
    isOpen: boolean;
  };
  mediaListModal: {
    isOpen: boolean;
    modalType: 'info' | 'media';
  };
  confirmModal: {
    isOpen: boolean;
    modalType: 'friend' | 'group' | 'pageDelete' | 'passwordEnter';
  };
  openModalButtons: ModalOpenButtons;
}
