import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Constructor.module.scss';

const Constructor: React.FC = () => {
  useSetPageTitle('Конструктор');
  return <div>Constructor</div>;
};

export default Constructor;
