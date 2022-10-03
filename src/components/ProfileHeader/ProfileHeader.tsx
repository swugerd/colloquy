import React, { useRef, useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './ProfileHeader.module.scss';
import ebalo from '../../assets/img/header/ebalo.png';
import arrow from '../../assets/img/header/arrow.svg';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ProfileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={`${s['header__profile-info']} ${s['header-hover']} ${isOpen && s['active']}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HeaderAvatar
          hasDelete={false}
          className={'header__profile-image'}
          img={ebalo}
          indicatorClass={'header-indicator'}
          title="Олег"
        />
        <span className={s['header__profile-name']} title="Максимилиан">
          Максимилиан
        </span>
        <div className={s['header__profile-arrow']}>
          <img src={arrow} alt="arrow" />
        </div>
      </button>
      {isOpen && <ProfileDropDown />}
    </div>
  );
};

export default ProfileHeader;
