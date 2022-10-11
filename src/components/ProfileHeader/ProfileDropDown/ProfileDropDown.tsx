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
          <div className={`${s['icon']} ${s['settings']}`}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.0427 12.5432C22.0427 17.7899 17.7894 22.0432 12.5427 22.0432C7.29599 22.0432 3.04269 17.7899 3.04269 12.5432C3.04269 7.29651 7.29599 3.04321 12.5427 3.04321C17.7894 3.04321 22.0427 7.29651 22.0427 12.5432ZM7.54269 12.5432C7.54269 15.5794 9.50649 17.5432 12.5427 17.5432C15.5789 17.5432 17.5427 15.5794 17.5427 12.5432C17.5427 9.50701 15.5789 7.54321 12.5427 7.54321C9.50649 7.54321 7.54269 9.50701 7.54269 12.5432Z"
                fill="white"
              />
              <path
                d="M10.0427 0.0429267C9.54268 0.542601 9.54268 3.54236 9.54268 3.54236H15.5427C15.5427 3.54236 15.5427 0.542359 15.0427 0.0423476C14.9993 -0.00107004 10.1117 -0.02606 10.0427 0.0429267Z"
                fill="white"
              />
              <path
                d="M2.05285 5.3593C2.05262 6.06617 4.17377 8.18732 4.17377 8.18732L8.41641 3.94468C8.41641 3.94468 6.29509 1.82336 5.58798 1.82335C5.52658 1.82335 2.05288 5.2617 2.05285 5.3593Z"
                fill="white"
              />
              <path
                d="M23.4062 5.3593C23.4065 6.06617 20.9726 8.5 20.9726 8.5L16.5 4.48736C16.5 4.48736 19.164 1.82336 19.8711 1.82335C19.9325 1.82335 23.4062 5.2617 23.4062 5.3593Z"
                fill="white"
              />
              <path
                d="M23.0427 19.5424C23.0429 18.8355 21.0427 16.5423 21.0427 16.5423L16.5427 21.0424C16.5427 21.0424 18.8356 23.0423 19.5427 23.0423C19.6041 23.0423 23.0426 19.64 23.0427 19.5424Z"
                fill="white"
              />
              <path
                d="M2.04268 19.5423C2.04246 18.8354 4.5 16.585 4.5 16.585L8.54231 20.5427C8.54231 20.5427 6.2498 23.0423 5.54268 23.0423C5.48128 23.0423 2.04272 19.6399 2.04268 19.5423Z"
                fill="white"
              />
              <path
                d="M10.0427 25.0423C9.5427 24.6192 9.54269 21.5424 9.54269 21.5424H15.5427C15.5427 21.5424 15.5427 24.6189 15.0427 25.0424C14.9993 25.0791 10.1117 25.1008 10.0427 25.0423Z"
                fill="white"
              />
              <path
                d="M0.0426856 15.0424C0.54236 15.5424 3.54269 15.5424 3.54269 15.5424L3.54269 9.54236C3.54269 9.54236 0.54269 9.54236 0.0426788 10.0424C-0.000738814 10.0858 -0.0263012 14.9733 0.0426856 15.0424Z"
                fill="white"
              />
              <path
                d="M25.0427 15.0424C24.543 15.5424 21.5427 15.5424 21.5427 15.5424V9.54236C21.5427 9.54236 24.5427 9.54236 25.0427 10.0424C25.0861 10.0858 25.1117 14.9733 25.0427 15.0424Z"
                fill="white"
              />
            </svg>
          </div>
          <Link className={s['text']} to="/settings">
            Настройки
          </Link>
        </li>
        <li className={s['item']}>
          <div className={`${s['icon']} ${s['switch-acc']}`}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="4" width="22" height="22" rx="2" fill="white" />
              <circle cx="15" cy="7" r="4" fill="black" />
              <path
                d="M23 19C23 17.4087 22.1571 14.8826 20.6569 13.7574C19.1566 12.6321 17.1217 12 15 12C12.8783 12 10.8434 12.6321 9.34315 13.7574C7.84286 14.8826 7 17.4087 7 19L15 19H23Z"
                fill="black"
              />
              <path
                d="M3.5 23.5H22C22 24.432 21.5159 25.2971 20.7215 25.7845L20.3704 26H2C0.895431 26 0 25.1045 0 24V5.49995L0.167931 5.24806C0.687763 4.46834 1.56288 4 2.5 4V22.5C2.5 23.0522 2.94772 23.5 3.5 23.5Z"
                fill="white"
              />
            </svg>
          </div>
          <Link className={s['text']} to="/">
            Смена аккаунта
          </Link>
        </li>
        <li className={`${s['item']} ${s['activity-item']}`} onClick={() => setIsOpen(!isOpen)}>
          <div className={s['row']}>
            <div className={`${s['icon']} ${s['activity']}`}>
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="6" fill="white" />
                <path
                  d="M11.5 7V10L14 12.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className={s['activity-stroke']}
                  d="M11.5 20.5C11.5 20.5 9.9665 20.6381 9 20.5C8.89183 20.4845 8.77933 20.464 8.66409 20.4394C6.83073 20.0477 5.23451 18.9109 4 17.5V17.5C3.31658 16.719 3.06609 16.3698 2.5 15.5C2.12311 14.9209 1.81868 14.1477 1.5851 13.4058C1.09431 11.8469 1.20941 10.1624 1.60578 8.57687V8.57687C1.86525 7.53901 2.26916 6.52898 2.79993 5.60013V5.60013C3.59159 4.21472 4.65855 3.00609 5.93506 2.0487L6 2"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className={s['activity-stroke']}
                  d="M6.5 4V2C6.5 1.72386 6.27614 1.5 6 1.5H4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className={s['activity-stroke']}
                  d="M12 1C12 1 13.5335 0.861929 14.5 1C15.7225 1.17465 16.4271 1.3885 17.5 2C19.3033 3.02779 19.9888 4.18732 21 6C21.3208 6.57497 21.603 7.30969 21.8336 8.01797C22.3574 9.62717 22.2868 11.3527 21.8764 12.9944V12.9944C21.6266 13.9934 21.2409 14.9534 20.73 15.8474L20.7001 15.8999C19.9084 17.2853 18.8415 18.4939 17.5649 19.4513L17.5 19.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className={s['activity-stroke']}
                  d="M17 17.5V19.5C17 19.7761 17.2239 20 17.5 20H19.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className={s['text']}>Активность</span>
            <div className={s['arrow']}>
              <svg
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
          <div className={`${s['icon']} ${s['exit']}`}>
            <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 1H3C1.89543 1 1 1.89543 1 3V22C1 23.1046 1.89543 24 3 24H15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 12.5C8 12.5 15.6184 12.5 20.5 12.5M20.5 12.5C20 11.5 15 7 15 7M20.5 12.5C20.5 13 15 18 15 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <Link className={s['exit-link']} to="/">
            Выйти
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
