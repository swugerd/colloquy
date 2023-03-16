import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Games.module.scss';

const Games: React.FC = () => {
  useSetPageTitle('Игры');
  return <div>Games</div>;
};

export default Games;
