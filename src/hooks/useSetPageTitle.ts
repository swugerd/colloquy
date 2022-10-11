import { useEffect } from 'react';
const useSetPageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export default useSetPageTitle;
