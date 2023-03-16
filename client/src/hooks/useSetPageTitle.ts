import { useEffect } from 'react';
import { setTitle } from '../redux/mobile/slice';
import { useAppDispatch } from './../redux/store';
const useSetPageTitle = (title: string, isDynimic?: boolean | string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = title;
    if (window.innerWidth <= 1150) {
      dispatch(setTitle(document.title));
    }
  }, [isDynimic]);
};

export default useSetPageTitle;
