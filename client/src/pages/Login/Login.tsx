import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { setIsAuth } from '../../redux/auth/slice';
import s from './Login.module.scss';
import { useAppDispatch } from './../../redux/store';
import axios from 'axios';
import Preloader from '../../components/Preloader/Preloader';

interface INITIAL_DATA_TYPE {
  emailOrLogin: string;
  user_password: string;
}

const Login: React.FC = () => {
  useSetPageTitle('Авторизация');
  const INITIAL_DATA: INITIAL_DATA_TYPE = {
    emailOrLogin: '',
    user_password: '',
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [regData, setRegData] = useState(INITIAL_DATA);

  const updateFields = (fields: any) => {
    setRegData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (const key in regData) {
      if (regData[key as keyof INITIAL_DATA_TYPE].length === 0) {
        setErrorMessage('Заполните все поля');
        return;
      }
    }
    try {
      setErrorMessage('');
      setIsLoading(true);
      const { data, status } = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/login',
        data: JSON.stringify(regData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (status === 201) {
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка сервера');
      }
      setIsLoading(false);
    }
  };
  return (
    <div className={s['wrapper']}>
      <div className={s['login']}>
        <h2 className={s['title']}>Войти в аккаунт</h2>
        {isLoading ? (
          <Preloader className={'login'} />
        ) : (
          <form onSubmit={handleSubmit}>
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
                value={regData.emailOrLogin}
                setValue={updateFields}
                name={'emailOrLogin'}
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
                value={regData.user_password}
                setValue={updateFields}
                name={'user_password'}
              />
            </div>
            <Button className={'log-btn'} text={'Войти'} />
            {errorMessage && <div className={s['error']}>{errorMessage}</div>}
          </form>
        )}
      </div>
      <Link className={s['link']} to="/">
        На главную
      </Link>
    </div>
  );
};

export default Login;
