import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Friends.module.scss';

const Friends: React.FC = () => {
  useSetPageTitle('Друзья');
  return <div>Friends</div>;
};

export default Friends;
