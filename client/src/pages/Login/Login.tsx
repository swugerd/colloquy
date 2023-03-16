import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { setIsAuth } from '../../redux/auth/slice';
import s from './Login.module.scss';
import { useAppDispatch } from './../../redux/store';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  useSetPageTitle('Авторизация');
  return (
    <div className={s['wrapper']}>
      <div className={s['login']}>
        <h2 className={s['title']}>Войти в аккаунт</h2>
        <div className={s['input-block']}>
          <label className={s['label']} htmlFor="login">
            Имя аккаунта или почта
          </label>
          <Input
            className={'auth-input'}
            placeholder={''}
            type={'text'}
            inputType={'default'}
            id="login"
          />
        </div>
        <div className={s['input-block']}>
          <label className={s['label']} htmlFor="password">
            Пароль
          </label>
          <Input
            className={'auth-input'}
            placeholder={''}
            type={'password'}
            inputType={'default'}
            id="password"
          />
        </div>
        <Button
          className={'log-btn'}
          text={'Войти'}
          onClick={() => dispatch(setIsAuth(true))}
          link="/feed"
        />
      </div>
      <Link className={s['link']} to="/">
        На главную
      </Link>
    </div>
  );
};

export default Login;
