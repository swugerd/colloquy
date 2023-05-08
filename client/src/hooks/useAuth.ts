import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAppDispatch } from './../redux/store';
import { setIsAuth } from '../redux/auth/slice';
import { useLocation, useNavigate } from 'react-router-dom';

export interface User {
  id: number;
  user_name: string;
  user_surname: string;
  user_patronymic: string;
  user_nickname: string;
  city: {
    id: number;
    city_name: string;
    city_value: string;
  };
  createdAt: string;
  last_seen: string;
  online_type: string;
  roles: {
    id: number;
    role_name: string;
    role_value: string;
    role_desc: string;
  }[];
  updatedAt: string;
  user_about: string;
  user_avatar: string;
  user_status: string;
  user_birthdate: string;
  user_email: string;
  user_gender: string;
  user_phone: string;
  user_sub_phone: string;
  user_telegram: string;
}

export interface DecodedToken {
  id: number;
  email: string;
  roles: {
    id: number;
    role_name: string;
    role_value: string;
    role_desc: string;
  }[];
  iat: number;
  exp: number;
}

const useAuth = (shouldCheckAuth: boolean = true) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogLoading, setIsLogLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert expiration time from seconds to milliseconds
        const currentTime = Date.now();

        if (expirationTime < currentTime) {
          // Token has expired, request a new token
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_HOSTNAME}/api/auth/refreshToken`,
              {
                token,
              },
            );
            localStorage.setItem('jwtToken', response.data.token);
            setIsLoading(false);
            dispatch(setIsAuth(true));
          } catch (error) {
            console.error(error);
            localStorage.removeItem('jwtToken');
            setIsLoading(false);
            dispatch(setIsAuth(false));
          }
        } else {
          // Token is still valid, fetch user data
          const userId = decodedToken.id;
          try {
            const response = await axios({
              method: 'get',
              url: `${process.env.REACT_APP_HOSTNAME}/api/users/getById/${userId}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(response.data);
            setIsLoading(false);
            dispatch(setIsAuth(true));
          } catch (error) {
            localStorage.removeItem('jwtToken');
            setIsLoading(false);
            dispatch(setIsAuth(false));
          }
        }
      } else {
        setIsLoading(false);
      }
    };
    shouldCheckAuth && checkAuth();
  }, []);

  const login = async (emailOrLogin: string, password: string) => {
    try {
      setErrorMessage('');
      setIsLogLoading(true);
      const loginResponse = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/auth/login`,
        data: JSON.stringify({
          emailOrLogin,
          user_password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const decodedToken: DecodedToken = jwtDecode(loginResponse.data.token);

      const getUserResponse = await axios.get(
        `${process.env.REACT_APP_HOSTNAME}/api/users/getById/${decodedToken.id}`,
      );
      setUser(getUserResponse.data);

      localStorage.setItem('jwtToken', loginResponse.data.token);

      dispatch(setIsAuth(true));

      setIsLoading(false);
      setIsLogLoading(false);
      navigate('/feed');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка сервера');
        dispatch(setIsAuth(false));
        localStorage.removeItem('jwtToken');
      }
      setIsLoading(false);
      setIsLogLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/auth/logout`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setUser(null);
      setIsLoading(false);
      dispatch(setIsAuth(false));
      navigate('/');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(setIsAuth(false));
    } finally {
      localStorage.removeItem('jwtToken');
    }
  };

  return { user, isLoading, isLogLoading, errorMessage, login, logout };
};

export default useAuth;
