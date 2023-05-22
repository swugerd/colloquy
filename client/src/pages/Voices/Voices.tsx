import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Voices.module.scss';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';

const Voices: React.FC = () => {
  useSetPageTitle('Войсы');
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <NotFoundBlock className={'friends'} text={'В разработке'} />
    </div>
  );
};

export default Voices;
