import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Circles.module.scss';

const Circles: React.FC = () => {
  useSetPageTitle('Кружочки');
  return <div>Circles</div>;
};

export default Circles;
