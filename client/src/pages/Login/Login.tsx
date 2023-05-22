import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Login.module.scss';
import { useAppDispatch } from './../../redux/store';
import Preloader from '../../components/Preloader/Preloader';
import useAuth from './../../hooks/useAuth';

interface INITIAL_DATA_TYPE {
  emailOrLogin: string;
  user_password: string;
}

const Login: React.FC = () => {
  useSetPageTitle('Авторизация');

  const dispatch = useAppDispatch();

  const INITIAL_DATA: INITIAL_DATA_TYPE = {
    emailOrLogin: '',
    user_password: '',
  };

  const [validationMessage, setValidationMessage] = useState('');
  const [regData, setRegData] = useState(INITIAL_DATA);

  const updateFields = (fields: any) => {
    setRegData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { errorMessage, login, isLogLoading } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (const key in regData) {
      if (regData[key as keyof INITIAL_DATA_TYPE].length === 0) {
        setValidationMessage('Заполните все поля');
        return;
      }
    }
    setValidationMessage('');
    login(regData.emailOrLogin, regData.user_password);
  };
  return (
    <div className={s['wrapper']}>
      <div className={s['login']}>
        <h2 className={s['title']}>Войти в аккаунт</h2>
        {isLogLoading ? (
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
            {validationMessage && <div className={s['error']}>{validationMessage}</div>}
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
