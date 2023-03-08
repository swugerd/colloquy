import { ModalOpenButtons } from './../../types/modalOpenButtons';
export interface ModalState {
  uploadFilesModal: {
    isOpen: boolean;
  };
  uploadMediaModal: {
    isOpen: boolean;
  };
  forwardModal: {
    isOpen: boolean;
  };
  moreAccsModal: {
    isOpen: boolean;
    accounts: { id: number; img: string; name: string }[];
  };
  openModalButtons: ModalOpenButtons;
}
