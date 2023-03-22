import React, { useRef, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import s from './Home.module.scss';
import dotsSvg from '../../assets/img/icons/dots.svg';
import img from '../../assets/uploads/test/image.png';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import AccountCard from '../../components/AccountCard/AccountCard';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import Icon from '../../components/UI/Icon/Icon';
import { useAppDispatch } from '../../redux/store';
import { setIsMoreAccsModalOpen } from '../../redux/modal/slice';

const Home: React.FC = () => {
  useSetPageTitle('Главная - colloquy');
  const accounts: { id: number; img: string; name: string }[] = [
    // { id: 1, img, name: 'Пашок Кубыркин' },
    // { id: 2, img, name: 'Овыфлвфы врфыоврыфол' },
    // { id: 3, img, name: 'да нет' },
    // { id: 4, img, name: 'Жесткий Пашок' },
    // { id: 5, img, name: 'Жесткий Пашок' },
    // { id: 6, img, name: 'Жесткий Пашок' },
  ];
  const dispatch = useAppDispatch();

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsMoreAccsModalOpen(true));
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className={`container ${s['wrapper-inner']}`}>
        <div className={s['main-screen']}>
          <h2 className={s['title']}>Что вы хотите сделать?</h2>
          <div className={s['row']}>
            <Button className={'auth-btn'} text={'Войти'} link={'/login'} />
            <Button className={'auth-btn'} text={'Зарегистрироваться'} link={'/register'} />
          </div>
          {accounts.length ? (
            ''
          ) : (
            <p className={s['info']}>
              Как только вы выполните вход, система запомнит ваш аккаунт на этом устройстве
            </p>
          )}
        </div>
        {accounts.length ? (
          <div className={s['remember-screen']}>
            <h2 className={s['title']}>Кажется, вы уже бывали здесь</h2>
            <div className={`${s['accounts-list']} ${accounts.length === 1 ? s['center'] : ''}`}>
              {accounts.map(({ id, img, name }, index) =>
                index >= 2 ? null : (
                  <AccountCard id={id} name={name} img={img} key={id} className="card" />
                ),
              )}
              <button
                className={`${s['more-accs']}`}
                onClick={(e) => handleModalOpen(e)}
                data-modalbutton="accountButton"
                ref={buttonRef}>
                <Icon src={dotsSvg} id={'dots'} className={'home-dots'} />
              </button>
            </div>
            <p className={s['info']}>Можно сохранить до 6 аккаунтов на одном устройстве</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Home;
