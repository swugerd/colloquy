import React from 'react';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';

const FirstStep: React.FC = () => {
  return (
    <>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="login">
          Имя аккаунта
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Ваш неповторимый никнейм'}
          type={'text'}
          inputType={'default'}
          id="login"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="email">
          Почта
        </label>
        <Input
          className={'auth-input'}
          placeholder={'example@mail.ru'}
          type={'email'}
          inputType={'default'}
          id="email"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="password">
          Пароль
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Главное не забыть...'}
          type={'password'}
          inputType={'default'}
          id="password"
        />
      </div>
    </>
  );
};

export default FirstStep;
