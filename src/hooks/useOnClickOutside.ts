import { useEffect } from 'react';

const useOnClickOutside = (
  ref: any,
  handler: (event: MouseEvent | KeyboardEvent) => void,
  button?: any,
) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler(event);
    }
  };
  const listener = (event: MouseEvent) => {
    if (
      (event.target as Element).closest('.react-select') ||
      (event.target as Element).classList.contains('react-select')
    ) {
      return;
    }
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    if (button) {
      if (button.current.contains(event.target)) {
        return;
      }
    }
    handler(event);
  };
  useEffect(() => {
    document.addEventListener('click', listener);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ref, handler, button]);
  return listener;
};

export default useOnClickOutside;
