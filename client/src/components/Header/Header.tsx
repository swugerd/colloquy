import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/icons/logo.svg';
import music from '../../assets/img/header/music.svg';
import shop from '../../assets/img/header/shop.svg';
import patterns from '../../assets/img/header/patterns.svg';
import theme from '../../assets/img/header/theme.svg';
import notify from '../../assets/img/header/notify.svg';
import ebalo from '../../assets/uploads/test/image.png';
import arrow from '../../assets/img/header/arrow.svg';

import s from './Header.module.scss';
import Notify from '../UI/Notify/Notify';
import FastMessages from './../FastMessages/FastMessages';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import MusicDropDown from '../MusicHeader/MusicDropDown/MusicDropDown';
import MusicHeader from '../MusicHeader/MusicHeader';
import ShopHeader from '../ShopHeader/ShopHeader';
import PatternsHeader from '../PatternsHeader/PatternsHeader';
import AchievesHeader from '../AchievesHeader/AchievesHeader';
import NotifyHeader from '../NotifyHeader/NotifyHeader';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import useWindowSize from '../../hooks/useWindowResize';

const Header: React.FC = () => {
  const { isAuth } = useSelector(selectIsAuth);
  const { width } = useWindowSize();

  return (
    <>
      {isAuth ? (
        width > 1150 ? (
          <header className={s['header']}>
            <div className="container">
              <div className={s['header__inner']}>
                <div className={s['header__left']}>
                  <div className={s['header__logo']}>
                    <Link className={s['header__logo-link']} to="/feed">
                      <img className={s['header__logo-img']} src={logo} alt="logo" />
                      <span className={s['header__logo-title']}>colloquy</span>
                    </Link>
                  </div>
                </div>
                <div className={s['header__right']}>
                  <div className={s['header__act']}>
                    <FastMessages />
                    <MusicHeader />
                  </div>
                  <div className={s['header__actions']}>
                    <ShopHeader />
                    <PatternsHeader />
                    <AchievesHeader />
                  </div>
                  <div className={s['header__profile']}>
                    {/* <button className={s['header__profile-theme']}>
                <img className={s['header-icon']} src={theme} alt="theme" />
              </button> */}
                    <NotifyHeader />
                    <ProfileHeader />
                  </div>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <></>
        )
      ) : (
        <header className={s['header']}>
          <div className={`${s['header__inner']} ${s['center']}`}>
            <div className={s['header__logo']}>
              <Link className={s['header__logo-link']} to="/">
                <img className={s['header__logo-img']} src={logo} alt="logo" />
                <span className={s['header__logo-title']}>colloquy</span>
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
