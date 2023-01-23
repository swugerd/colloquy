import React from 'react';
import s from './AccountCard.module.scss';
import Icon from '../UI/Icon/Icon';
import trashSvg from '../../assets/img/icons/trash.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';

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
          <Icon src={trashSvg} id={'trash'} className={'account-button'} />
        </button>
        <button className={`${s['button']} ${s['success']}`}>
          <Icon src={arrowSvg} id={'arrow'} className={'account-button'} />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
