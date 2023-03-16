import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsSidebarShow } from '../../redux/mobile/slice';
import s from './MobileFooter.module.scss';
import feedSvg from '../../assets/img/icons/feed.svg';
import chatSvg from '../../assets/img/icons/chat.svg';
import mobileLogoSvg from '../../assets/img/icons/mobile-logo.svg';
import groupsSvg from '../../assets/img/icons/groups.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';

const MobileFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mobile } = useSelector(selectMobile);
  const { width } = useWindowSize();

  return width <= 1150 ? (
    <div className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          children={({ isActive }) => (
            <Icon
              src={feedSvg}
              id={'feed'}
              className={''}
              hoverClass={'feed'}
              isActive={isActive ? true : false}
            />
          )}
          to="/feed"
        />
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          children={({ isActive }) => (
            <Icon
              src={chatSvg}
              id={'messages'}
              className={'footer-msgs'}
              hoverClass={'messages'}
              isActive={isActive ? true : false}
            />
          )}
          to="/messages"
        />

        <div className={s['link']}></div>
        <button className={s['button']} onClick={() => dispatch(setIsSidebarShow(true))}>
          <Icon src={mobileLogoSvg} id={'mobile-logo'} className={'footer-logo'} />
        </button>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          children={({ isActive }) => (
            <Icon
              src={groupsSvg}
              id={'groups'}
              className={''}
              hoverClass={'groups'}
              isActive={isActive ? true : false}
            />
          )}
          to="/groups"
        />
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          children={({ isActive }) => (
            <Icon
              src={musicSvg}
              id={'music'}
              className={''}
              hoverClass={'music'}
              isActive={isActive ? true : false}
            />
          )}
          to="/music"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MobileFooter;
