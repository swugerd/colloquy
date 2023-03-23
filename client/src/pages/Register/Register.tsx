import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirstStep from '../../components/RegFormSteps/FirstStep';
import SecondStep from '../../components/RegFormSteps/SecondStep';
import ThirdStep from '../../components/RegFormSteps/ThirdStep';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { setIsAuth } from '../../redux/auth/slice';
import s from './Register.module.scss';
import { useAppDispatch } from './../../redux/store';
import axios, { AxiosError } from 'axios';
import Preloader from '../../components/Preloader/Preloader';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../hooks/useAuth';

interface INITIAL_DATA_TYPE {
  user_nickname: '';
  user_email: string;
  user_password: string;
  user_name: string;
  user_surname: string;
  user_patronymic: string;
  user_birthdate: string;
  user_gender: string;
  city_id: number;
  user_avatar: string;
  user_avatar_cache: string;
}

const Register: React.FC = () => {
  useSetPageTitle('Регистрация');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const INITIAL_DATA: INITIAL_DATA_TYPE = {
    user_nickname: '',
    user_email: '',
    user_password: '',
    user_name: '',
    user_surname: '',
    user_patronymic: '',
    user_birthdate: '',
    user_gender: '',
    city_id: Number(''),
    user_avatar: '',
    user_avatar_cache: '',
  };

  const [regData, setRegData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFields = (fields: any) => {
    setRegData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const [index, setIndex] = useState(0);

  const steps = [
    <FirstStep
      {...regData}
      updateFields={updateFields}
      onSubmit={(event: any) => handleSubmit(event, index)}
    />,
    <SecondStep
      {...regData}
      updateFields={updateFields}
      onSubmit={(event: any) => handleSubmit(event, index)}
    />,
    <ThirdStep
      {...regData}
      updateFields={updateFields}
      onSubmit={(event: any) => handleSubmit(event, index)}
    />,
  ];
  const titles = ['Начнём с основ', 'Расскажите о себе', 'Загрузим аватар'];
  const progress = [33, 66, 100];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    const formData = new FormData();
    if (index < 2) setIndex(index + 1);
    if (index === 2) {
      try {
        setErrorMessage('');
        for (const key in regData) {
          if (key !== 'user_patronymic' && key !== 'city_id') {
            // @ts-ignore
            if (regData[key].length === 0) {
              setErrorMessage('Заполните все обязательные поля');
              return;
            }
          }
          //@ts-ignore
          formData.append(key, regData[key]);
        }
        setIsLoading(true);
        const { data, status } = await axios({
          method: 'post',
          url: 'http://localhost:5000/api/auth/registration',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (status === 201) {
          setIsLoading(false);

          localStorage.setItem('jwtToken', data.token);

          dispatch(setIsAuth(true));

          navigate('/feed');
        }
      } catch (error: any) {
        if (error.response?.data.statusCode === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Ошибка сервера');
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={s['wrapper']}>
      <div className={s['login']}>
        <h2 className={s['title']}>Регистрация</h2>
        <div className={`${s['indicator-block']} ${index === 2 ? s['margin'] : ''}`}>
          <h5 className={s['indicator-title']}>{titles[index]}</h5>
          <div className={s['indicator']}>
            <div className={s['indicator-complete']} style={{ width: `${progress[index]}%` }}></div>
          </div>
        </div>
        {isLoading ? <Preloader className="auth" /> : steps[index]}
        {index !== 0 ? (
          <button className={s['back']} onClick={() => setIndex(index - 1)}>
            Назад
          </button>
        ) : (
          ''
        )}
        {errorMessage && <div className={s['error']}>{errorMessage}</div>}
      </div>
      <Link className={s['link']} to="/">
        На главную
      </Link>
    </div>
  );
};

export default Register;
