import React, { useEffect, useRef, useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './ProfileHeader.module.scss';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/store';
import { setUserName } from '../../redux/auth/slice';
import { selectIsAuth } from '../../redux/auth/selector';
import { useSelector } from 'react-redux';

const ProfileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const [onlineStatus, setOnlineStatus] = useState('');

  useEffect(() => {
    if (user) {
      setOnlineStatus(user?.online_type !== 'pc-offline' ? user?.online_type : 'pc-online');
      dispatch(setUserName(user?.user_name));
    }
  }, [user]);

  const {
    user: { name: userName },
  } = useSelector(selectIsAuth);

  useOnClickOutside(ref, () => setIsOpen(false));
  return user ? (
    <div
      ref={ref}
      className={`${s['header__profile-info']} ${s['header-hover']} ${isOpen && s['active']}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HeaderAvatar
          className={'header__profile-image'}
          img={user ? user.user_avatar : ''}
          indicatorClass={['sm-indicator', 'border-sub-bg']}
          title={user ? user.user_name : ''}
          onlineType={onlineStatus}
        />
        <span className={s['header__profile-name']} title={user ? user?.user_name : ''}>
          {userName}
        </span>
        <div className={s['header__profile-arrow']}>
          <Icon src={arrowSvg} id={'arrow'} className={'white'} />
        </div>
      </button>
      {isOpen && (
        <ProfileDropDown setIsDropdownOpen={setIsOpen} setOnlineStatus={setOnlineStatus} />
      )}
    </div>
  ) : (
    <p className={s['header__profile-name']}>Загрузка...</p>
  );
};

export default ProfileHeader;
