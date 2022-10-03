import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProfileDropDown.module.scss';
import settings from '../../../assets/img/icons/settings.svg';
import switchAcc from '../../../assets/img/icons/account-switch.svg';
import activity from '../../../assets/img/icons/activity.svg';
import exit from '../../../assets/img/icons/exit.svg';
import arrow from '../../../assets/img/header/arrow.svg';

const ProfileDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const statuses = [
    { id: 1, name: 'В сети', className: 'green' },
    { id: 2, name: 'Не беспокоить', className: 'red' },
    { id: 3, name: 'Нет на месте', className: 'yellow' },
    { id: 4, name: 'Не в сети', className: 'gray' },
  ];

  // типизировать ивент
  const changeIndexHandler = (e: any, index: number) => {
    setActiveIndex(index);
    e.stopPropagation();
  };

  return (
    <div className={s['wrapper']}>
      <ul className={s['list']}>
        <li className={s['item']}>
          <div className={s['icon']}>
            <img src={settings} alt="settings" />
          </div>
          <Link className={s['text']} to="/settings">
            Настройки
          </Link>
        </li>
        <li className={s['item']}>
          <div className={s['icon']}>
            <img src={switchAcc} alt="switch-account" />
          </div>
          <Link className={s['text']} to="/">
            Смена аккаунта
          </Link>
        </li>
        <li className={`${s['item']} ${s['activity-item']}`} onClick={() => setIsOpen(!isOpen)}>
          <div className={s['row']}>
            <div className={s['icon']}>
              <img src={activity} alt="activity" />
            </div>
            <span className={s['text']}>Активность</span>
            <div className={s['arrow']}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>
          <ul className={`${s['status-list']} ${isOpen && s['active']}`}>
            {statuses.map(({ id, name, className }, index) => (
              <li
                className={`${s['status-item']} ${activeIndex === index ? s['active'] : ''}`}
                key={id}
                onClick={(e) => changeIndexHandler(e, index)}>
                <div className={`${s['status-icon']} ${s[className]}`}></div>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </li>
        <li className={s['item']}>
          <div className={s['icon']}>
            <img src={exit} alt="exit" />
          </div>
          <Link className={s['text']} to="/">
            Выйти
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
