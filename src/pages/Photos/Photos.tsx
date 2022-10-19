import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Photos.module.scss';

const Photos: React.FC = () => {
  useSetPageTitle('Фотографии');
  return <div>Photos</div>;
};

export default Photos;
