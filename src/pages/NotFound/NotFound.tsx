import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './NotFound.module.scss';

const NotFound: React.FC = () => {
  useSetPageTitle('Страница не найдена!');

  return <div>NotFound</div>;
};

export default NotFound;
