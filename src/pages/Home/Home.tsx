import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import s from './Home.module.scss';
import img from '../../assets/uploads/test/image.png';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import AccountCard from '../../components/AccountCard/AccountCard';
import useSetPageTitle from '../../hooks/useSetPageTitle';

const Home: React.FC = () => {
  // Переделать адаптив под разные карточки аккаунтов
  // (для двух разных классов .card, .modal-card)
  const accounts: { id: number; img: string; name: string }[] = [
    { id: 1, img, name: 'Пашок Кубыркин' },
    { id: 2, img, name: 'Овыфлвфы врфыоврыфол' },
    { id: 3, img, name: 'Жесткий Пашок' },
    { id: 4, img, name: 'Жесткий Пашок' },
    { id: 5, img, name: 'Жесткий Пашок' },
    { id: 6, img, name: 'Жесткий Пашок' },
  ];
  useSetPageTitle('Главная');

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={s['wrapper']}>
      <div className={`container ${s['wrapper-inner']}`}>
        <div className={s['main-screen']}>
          <h2 className={s['title']}>Что вы хотите сделать?</h2>
          <div className={s['row']}>
            <Button className={'auth-btn'} text={'Войти'} link={'login'} />
            <Button className={'auth-btn'} text={'Зарегистрироваться'} link={'register'} />
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
                onClick={() => setIsOpen(true)}
                ref={buttonRef}>
                <svg
                  className={s['dots']}
                  width="34"
                  height="8"
                  viewBox="0 0 34 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" r="4" fill="white" />
                  <circle cx="17" cy="4" r="4" fill="white" />
                  <circle cx="30" cy="4" r="4" fill="white" />
                </svg>
              </button>
            </div>
            <p className={s['info']}>Можно сохранить до 6 аккаунтов на одном устройстве</p>
          </div>
        ) : (
          ''
        )}
      </div>
      {isOpen && (
        <ModalLayout className="accounts-modal" onClose={() => setIsOpen(false)} button={buttonRef}>
          <ul className={s['modal-list']}>
            {accounts.map(({ id, img, name }) => (
              <li key={id}>
                <AccountCard id={id} name={name} img={img} className="modal-card" />
              </li>
            ))}
          </ul>
        </ModalLayout>
      )}
    </div>
  );
};

export default Home;
