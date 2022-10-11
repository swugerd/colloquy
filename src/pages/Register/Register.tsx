import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Register.module.scss';

const Register: React.FC = () => {
  useSetPageTitle('Регистрация');
  return <div>Register</div>;
};

export default Register;
