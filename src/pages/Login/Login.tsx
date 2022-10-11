import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Login.module.scss';

const Login: React.FC = () => {
  useSetPageTitle('Авторизация');
  return <div>Login</div>;
};

export default Login;
