import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Videos.module.scss';

const Videos: React.FC = () => {
  useSetPageTitle('Видео');
  return <div>Videos</div>;
};

export default Videos;
