import React from 'react';
import SideContent from '../../components/SideContent/SideContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Notifies.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';

const Notifies: React.FC = () => {
  useSetPageTitle('Уведомления');

  // сделать типы уведомлений

  // доделать адаптив для сайдконтента в музыкке

  //

  const children = [<div className={`${sideContentS['options']}`} key={1}></div>];

  return (
    <>
      <div className={s['notifies']}>
        <h4 className={s['title']}>Уведомления</h4>
      </div>
      <SideContent titles={['Фильтр уведомлений']}>{children}</SideContent>
    </>
  );
};

export default Notifies;
