import React, { useContext, useEffect, useRef, useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './ProfileHeader.module.scss';
import ebalo from '../../assets/uploads/test/ebalo.png';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/store';
import { useAxios } from '../../hooks/useAxios';
import { setUserName } from '../../redux/auth/slice';
import { selectIsAuth } from '../../redux/auth/selector';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../contexts/SocketContext';

const ProfileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useAuth();

  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  const [onlineStatus, setOnlineStatus] = useState('pc-online');

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(setUserName(user?.user_name));
    }
  }, [isLoading]);

  useEffect(() => {
    if (socket) {
      socket.on('statusChange', (data) => {
        console.log(socket.id, data);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const {
    user: { name: userName },
  } = useSelector(selectIsAuth);

  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={`${s['header__profile-info']} ${s['header-hover']} ${isOpen && s['active']}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HeaderAvatar
          className={'header__profile-image'}
          img={!isLoading && user ? user.user_avatar : ''}
          indicatorClass={['sm-indicator', 'border-sub-bg']}
          title={!isLoading && user ? user.user_name : ''}
          onlineType={onlineStatus}
        />
        <span className={s['header__profile-name']} title={!isLoading ? user?.user_name : ''}>
          {!isLoading ? userName : 'Загрузка..'}
        </span>
        <div className={s['header__profile-arrow']}>
          <Icon src={arrowSvg} id={'arrow'} className={'white'} />
        </div>
      </button>
      {isOpen && (
        <ProfileDropDown setIsDropdownOpen={setIsOpen} setOnlineStatus={setOnlineStatus} />
      )}
    </div>
  );
};

export default ProfileHeader;
