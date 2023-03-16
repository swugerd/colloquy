import { useAppDispatch } from './../redux/store';
import { selectModal } from './../redux/modal/selector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsForwardModalOpen, setIsUploadFilesModalOpen } from '../redux/modal/slice';

const useOnClickOutside = (ref: any, handler: (event: MouseEvent | KeyboardEvent) => void) => {
  const { modal } = useSelector(selectModal);
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler(event);
    }
  };
  const listener = (event: any) => {
    if (
      (event.target as Element).closest('.react-select') ||
      (event.target as Element).classList.contains('react-select')
    ) {
      return;
    }
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    if (modal.openModalButtons.includes(event.target.dataset.modalbutton)) {
      return;
    }
    // переписать хук таким образом, чтобы при при открытой модалке с репостом можно было открыть модалку файлов и вернуться обратно к модалке с репостом (чтобы при клике вне блока закрывалась только модалка файлов)
    handler(event);
  };
  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
