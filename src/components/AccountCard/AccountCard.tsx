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
          <img src={trashIcon} alt="delete" />
        </button>
        <button className={`${s['button']} ${s['success']}`}>
          <img src={arrowIcon} alt="sign in" />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
