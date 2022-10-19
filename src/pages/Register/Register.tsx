import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FirstStep from '../../components/RegFormSteps/FirstStep';
import SecondStep from '../../components/RegFormSteps/SecondStep';
import ThirdStep from '../../components/RegFormSteps/ThirdStep';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { setIsAuth } from '../../redux/auth/slice';
import s from './Register.module.scss';

const Register: React.FC = () => {
  // Добавить форму
  useSetPageTitle('Регистрация');
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const steps = [<FirstStep />, <SecondStep />, <ThirdStep />];
  const titles = ['Начёнм с основ', 'Расскажите о себе', 'Загрузим аватар'];
  const regHandler = () => {
    setIndex(index + 1);
    if (index === 2) dispatch(setIsAuth(true));
  };
  return (
    <div className={s['wrapper']}>
      <div className={s['login']}>
        <h2 className={s['title']}>Регистрация</h2>
        <div className={s['indicator-block']}>
          <h5 className={s['indicator-title']}>{titles[index]}</h5>
          <div className={s['indicator']}></div>
        </div>
        {steps[index]}
        <Button
          className={'reg-btn'}
          text={index !== 2 ? 'Следующий шаг' : 'Регистрация'}
          link={index === 2 ? '/feed' : ''}
          onClick={regHandler}
        />
        {index !== 0 ? (
          <button className={s['back']} onClick={() => setIndex(index - 1)}>
            Назад
          </button>
        ) : (
          ''
        )}
      </div>
      <Link className={s['link']} to="/">
        На главную
      </Link>
    </div>
  );
};

export default Register;
