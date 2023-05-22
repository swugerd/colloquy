import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProfileDropDown.module.scss';
import iconS from '../../UI/Icon/Icon.module.scss';
import settingsSvg from '../../../assets/img/icons/settings.svg';
import switchAccSvg from '../../../assets/img/icons/switch-acc.svg';
import activitySvg from '../../../assets/img/icons/activity.svg';
import exitSvg from '../../../assets/img/icons/exit.svg';
import arrowSvg from '../../../assets/img/icons/arrow.svg';
import { useAppDispatch } from './../../../redux/store';
import Icon from '../../UI/Icon/Icon';
import useAuth from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../contexts/SocketContext';
import { selectIsAuth } from '../../../redux/auth/selector';

type ProfileDropDownProps = {
  setIsDropdownOpen: (isOpen: boolean) => void;
  setOnlineStatus: (onlineStatus: string) => void;
};

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  setIsDropdownOpen,
  setOnlineStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const statuses = [
    { id: 1, name: 'В сети', className: 'green', status: 'pc-online' },
    { id: 2, name: 'Не беспокоить', className: 'red', status: 'pc-dnd' },
    { id: 3, name: 'Нет на месте', className: 'yellow', status: 'pc-afk' },
    { id: 4, name: 'Не в сети', className: 'gray', status: 'pc-offline' },
  ];

  const socket = useContext(SocketContext);
  const {
    user: { id },
  } = useSelector(selectIsAuth);

  // типизировать ивент
  const changeIndexHandler = (e: any, status: string, index: number) => {
    setActiveIndex(index);
    if (socket && id) {
      socket.emit('statusChange', { id, online_type: status });
    }
    setOnlineStatus(status);

    e.stopPropagation();
  };

  const { logout } = useAuth(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className={s['wrapper']}>
      <ul className={s['list']}>
        <li
          className={`${s['item']} ${iconS['profile-hover']}`}
          onClick={() => setIsDropdownOpen(false)}>
          <Link className={s['link']} to="/settings">
            <div className={`${s['icon']} ${s['settings']}`}>
              <Icon src={settingsSvg} id={'settings'} className={'white'} />
            </div>
            <span className={s['text']}>Настройки</span>
          </Link>
        </li>
        {/* <li className={`${s['item']} ${iconS['profile-hover']}`}>
          <div className={s['link']} onClick={handleLogOut}>
            <div className={`${s['icon']} ${s['switch-acc']}`}>
              <Icon src={switchAccSvg} id={'switchAcc'} className={'white'} />
            </div>
            <span className={s['text']}>Смена аккаунта</span>
          </div>
        </li> */}
        <li
          className={`${s['item']} ${s['activity-item']} ${iconS['profile-hover']}`}
          onClick={() => setIsOpen(!isOpen)}>
          <div className={s['row']}>
            <div className={`${s['icon']} ${s['activity']}`}>
              <Icon src={activitySvg} id={'activity'} className={'white'} />
            </div>
            <span className={s['text']}>Активность</span>
            <div className={s['arrow']}>
              <Icon src={arrowSvg} id={'arrow'} className={'profile-arrow'} />
            </div>
          </div>
          <ul className={`${s['status-list']} ${isOpen && s['active']}`}>
            {statuses.map(({ id, name, className, status }, index) => (
              <li
                className={`${s['status-item']} ${activeIndex === index ? s['active'] : ''}`}
                key={id}
                onClick={(e) => changeIndexHandler(e, status, index)}>
                <div className={`${s['status-icon']} ${s[className]}`}></div>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </li>
        <li className={`${s['item']} ${iconS['profile-hover']}`}>
          <div className={s['exit-link']} onClick={handleLogOut}>
            <div className={`${s['icon']} ${s['exit']}`}>
              <Icon src={exitSvg} id={'exit'} className={'white'} />
            </div>
            <span className={s['text']}>Выйти</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
