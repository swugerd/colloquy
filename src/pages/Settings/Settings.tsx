import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Settings.module.scss';

const Settings: React.FC = () => {
  useSetPageTitle('Настройки');
  return <div>Settings</div>;
};

export default Settings;
