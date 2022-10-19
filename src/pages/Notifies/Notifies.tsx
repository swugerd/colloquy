import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Notifies.module.scss';

const Notifies: React.FC = () => {
  useSetPageTitle('Уведомления');
  return <div>Notifies</div>;
};

export default Notifies;
