import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Apps.module.scss';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';

const Apps: React.FC = () => {
  useSetPageTitle('Приложения');
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <NotFoundBlock className={'friends'} text={'В разработке'} />
    </div>
  );
};

export default Apps;
