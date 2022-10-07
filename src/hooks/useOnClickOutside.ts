import { useEffect } from 'react';

const useOnClickOutside = (ref: any, handler: (event: MouseEvent) => void, button?: any) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
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
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler, button]);
};

export default useOnClickOutside;
