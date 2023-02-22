import React, { useRef, useState } from 'react';
import Notify from '../UI/Notify/Notify';
import s from './NotifyHeader.module.scss';
import notifySvg from '../../assets/img/icons/notify.svg';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import NotifyDropDown from './NotifyDropDown/NotifyDropDown';
import Icon from '../UI/Icon/Icon';

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
          <Icon src={notifySvg} id={'notify'} className={'header-icon'} />
          {notifies > 0 && <Notify cName="header" count={notifies} hasImage={false} />}
        </div>
      </button>
      {isOpen && <NotifyDropDown setIsActive={() => setisOpen(false)} />}
    </div>
  );
};

export default NotifyHeader;
