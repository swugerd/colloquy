import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Apps.module.scss';

const Apps: React.FC = () => {
  useSetPageTitle('Приложения');
  return <div>Apps</div>;
};

export default Apps;
