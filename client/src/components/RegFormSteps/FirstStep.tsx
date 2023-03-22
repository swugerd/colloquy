import React, { useRef } from 'react';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';
import Button from '../UI/Button/Button';

type FirstStepProps = {
  user_nickname: string;
  user_email: string;
  user_password: string;
  updateFields: (fields: any) => void;
  onSubmit: (event: any) => void;
};

const FirstStep: React.FC<FirstStepProps> = ({
  user_nickname,
  user_email,
  user_password,
  updateFields,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="login">
          Имя аккаунта <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Ваш неповторимый никнейм'}
          type={'text'}
          inputType={'default'}
          name={'user_nickname'}
          id="login"
          value={user_nickname}
          setValue={updateFields}
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="email">
          Почта <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'example@mail.ru'}
          type={'email'}
          inputType={'default'}
          id="email"
          name={'user_email'}
          value={user_email}
          setValue={updateFields}
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="password">
          Пароль <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Главное не забыть...'}
          type={'password'}
          inputType={'default'}
          id="password"
          name={'user_password'}
          value={user_password}
          setValue={updateFields}
        />
      </div>
      <Button className={'reg-btn'} text={'Следующий шаг'} />
    </form>
  );
};

export default FirstStep;
