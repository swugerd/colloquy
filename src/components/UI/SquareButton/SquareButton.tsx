import React from 'react';
import Icon from '../Icon/Icon';
import s from './SquareButton.module.scss';
import lockSvg from '../../../assets/img/icons/lock.svg';

type SquareButtonProps = {
  className: string;
  icon: string;
  id: string;
  hasLock?: boolean;
  onClick?: (e: any) => void;
};

const SquareButton: React.FC<SquareButtonProps> = ({ className, icon, id, hasLock, onClick }) => {
  return (
    <button className={`${s['button']} ${s[className]}`} onClick={onClick ? onClick : () => {}}>
      <Icon src={icon} id={id} className={'white'} />
      <div className={s['lock']}>
        {hasLock && <Icon src={lockSvg} id={'lock'} className={'green'} />}
      </div>
    </button>
  );
};

export default SquareButton;
