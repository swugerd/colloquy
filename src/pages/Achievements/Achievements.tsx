import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Achievements.module.scss';

const Achievements: React.FC = () => {
  useSetPageTitle('Достижения');
  return <div>Achievements</div>;
};

export default Achievements;
