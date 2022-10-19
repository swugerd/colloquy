import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Voices.module.scss';

const Voices: React.FC = () => {
  useSetPageTitle('Войсы');
  return <div>Voices</div>;
};

export default Voices;
