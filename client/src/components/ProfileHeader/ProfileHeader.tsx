import React, { useRef, useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './ProfileHeader.module.scss';
import ebalo from '../../assets/uploads/test/ebalo.png';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';
import useAuth from '../../hooks/useAuth';

const ProfileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useAuth();
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={`${s['header__profile-info']} ${s['header-hover']} ${isOpen && s['active']}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HeaderAvatar
          className={'header__profile-image'}
          img={ebalo}
          indicatorClass={['sm-indicator', 'border-sub-bg']}
          title="Олег"
          onlineType="pc-online"
        />
        <span className={s['header__profile-name']} title="Максимилиан">
          {!isLoading ? user?.user_name : 'Загрузка..'}
        </span>
        <div className={s['header__profile-arrow']}>
          <Icon src={arrowSvg} id={'arrow'} className={'white'} />
        </div>
      </button>
      {isOpen && <ProfileDropDown />}
    </div>
  );
};

export default ProfileHeader;
