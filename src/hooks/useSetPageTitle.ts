import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTitle } from '../redux/mobile/slice';
const useSetPageTitle = (title: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = title;
    if (window.innerWidth <= 1150) {
      dispatch(setTitle(document.title));
    }
  }, []);
};

export default useSetPageTitle;
