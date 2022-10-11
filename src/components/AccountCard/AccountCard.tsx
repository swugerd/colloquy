import React from 'react';
import s from './AccountCard.module.scss';
import trashIcon from '../../assets/img/icons/trash.svg';
import arrowIcon from '../../assets/img/header/arrow.svg';

type AccountCardProps = {
  id: number;
  name: string;
  img: string;
  className: string;
};

const AccountCard: React.FC<AccountCardProps> = ({ id, name, img, className }) => {
  return (
    <div className={`${s['account']} ${s[className]}`}>
      <div className={s['account-image']}>
        <img src={img} alt="user" />
      </div>
      <span className={s['name']} title={name}>
        {name}
      </span>
      <div className={s['buttons']}>
        <button className={`${s['button']} ${s['warn']}`}>
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 6.70374L22.3704 6.70373"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M7 6V6C7 3.79086 8.79086 2 11 2H13C15.2091 2 17 3.79086 17 6V6"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M3.7618 27.0995L2.10995 10.5809C2.05108 9.99226 2.51337 9.48145 3.10499 9.48145H12.1852H21.2654C21.857 9.48145 22.3193 9.99226 22.2604 10.5809L20.6086 27.0995C20.5574 27.6107 20.1273 28 19.6135 28H4.75684C4.24309 28 3.81292 27.6107 3.7618 27.0995Z"
              fill="white"
            />
            <path
              d="M7.55556 12.2593L8.48148 25.2222"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12.1852 25.2222L12.1852 12.2593"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16.8148 12.2593L15.8889 25.2222"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className={`${s['button']} ${s['success']}`}>
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
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
