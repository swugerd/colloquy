import React, { useRef, useState } from 'react';
import Notify from '../UI/Notify/Notify';
import s from './NotifyHeader.module.scss';
import notifyIcon from '../../assets/img/header/notify.svg';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import NotifyDropDown from './NotifyDropDown/NotifyDropDown';

const NotifyHeader: React.FC = () => {
  const notifies = 99;
  const [isOpen, setisOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setisOpen(false));
  return (
    <div
      className={`${s['header__profile-notify']} ${s['header-hover']} ${isOpen ? s['active'] : ''}`}
      ref={ref}>
      <button onClick={() => setisOpen(!isOpen)}>
        <div className={s['header__notify-indicator']}>
          <img className={s['header-icon']} src={notifyIcon} alt="notify" />
          {notifies > 0 && <Notify cName="header-notify" count={notifies} hasImage={false} />}
        </div>
      </button>
      {isOpen && <NotifyDropDown />}
    </div>
  );
};

export default NotifyHeader;
