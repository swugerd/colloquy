import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Groups.module.scss';

const Groups: React.FC = () => {
  useSetPageTitle('Сообщества');
  return <div>Groups</div>;
};

export default Groups;
