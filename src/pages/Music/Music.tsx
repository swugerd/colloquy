import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Music.module.scss';

const Music: React.FC = () => {
  useSetPageTitle('Музыка');
  return <div>Music</div>;
};

export default Music;
