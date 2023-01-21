import React from 'react';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowResize';
import Icon from '../UI/Icon/Icon';
import s from './Sidebar.module.scss';
import feedSvg from '../../assets/img/icons/feed.svg';
import profileSvg from '../../assets/img/icons/user.svg';
import friendsSvg from '../../assets/img/icons/friends.svg';
import groupsSvg from '../../assets/img/icons/groups.svg';
import messagesSvg from '../../assets/img/icons/chat.svg';
import circlesSvg from '../../assets/img/icons/circles.svg';
import voicesSvg from '../../assets/img/icons/voices.svg';
import photosSvg from '../../assets/img/icons/photos.svg';
import videosSvg from '../../assets/img/icons/videos.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import appsSvg from '../../assets/img/icons/apps.svg';
import gamesSvg from '../../assets/img/icons/games.svg';

const Sidebar: React.FC = () => {
  const { width } = useWindowSize();
  const id = 'swugerd';
  const links = [
    {
      id: 1,
      iconSettings: {
        src: feedSvg,
        iconId: 'feed',
        className: 'nav-img',
        hoverClass: 'feed',
      },
      text: 'Новости',
      path: 'feed',
    },
    {
      id: 2,
      iconSettings: {
        src: profileSvg,
        iconId: 'profile',
        className: 'nav-img',
        hoverClass: 'profile',
      },
      text: 'Профиль',
      path: `profile/${id}`,
    },
    {
      id: 3,
      iconSettings: {
        src: friendsSvg,
        iconId: 'friends',
        className: 'nav-img',
        hoverClass: 'friends',
      },
      text: 'Друзья',
      path: 'friends',
    },
    {
      id: 4,
      iconSettings: {
        src: groupsSvg,
        iconId: 'groups',
        className: 'nav-img',
        hoverClass: 'groups',
      },
      text: 'Сообщества',
      path: 'groups',
    },
    {
      id: 5,
      iconSettings: {
        src: messagesSvg,
        iconId: 'messages',
        className: 'nav-img',
        hoverClass: 'messages',
      },
      text: 'Сообщения',
      path: 'messages',
    },
    {
      id: 6,
      iconSettings: {
        src: circlesSvg,
        iconId: 'circles',
        className: 'nav-img',
        hoverClass: 'circles',
      },
      text: 'Кружочки',
      path: 'circles',
    },
    {
      id: 7,
      iconSettings: {
        src: voicesSvg,
        iconId: 'voices',
        className: 'nav-img',
        hoverClass: 'voices',
      },
      text: 'Войсы',
      path: 'voices',
    },
    {
      id: 8,
      iconSettings: {
        src: photosSvg,
        iconId: 'photos',
        className: 'nav-img',
        hoverClass: 'photos',
      },
      text: 'Фотографии',
      path: 'photos',
    },
    {
      id: 9,
      iconSettings: {
        src: videosSvg,
        iconId: 'videos',
        className: 'nav-img',
        hoverClass: 'videos',
      },
      text: 'Видео',
      path: 'videos',
    },
    {
      id: 10,
      iconSettings: {
        src: musicSvg,
        iconId: 'music',
        className: 'nav-img',
        hoverClass: 'music',
      },
      text: 'Музыка',
      path: 'music',
    },
    {
      id: 11,
      iconSettings: {
        src: appsSvg,
        iconId: 'apps',
        className: 'nav-img',
        hoverClass: 'apps',
      },
      text: 'Приложения',
      path: 'apps',
    },
    {
      id: 12,
      iconSettings: {
        src: gamesSvg,
        iconId: 'games',
        className: 'nav-img',
        hoverClass: 'games',
      },
      text: 'Игры',
      path: 'games',
    },
  ];
  return width > 1150 ? (
    <aside className={s['sidebar']}>
      <nav className={s['nav']}>
        <ul className={s['nav-list']}>
          {links.map(({ id, iconSettings, text, path }) => (
            <li className={s['nav-item']} key={id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${s['active']} ${s['nav-link']}` : s['nav-link']
                }
                children={({ isActive }) => (
                  <>
                    <Icon
                      src={iconSettings.src}
                      id={iconSettings.iconId}
                      className={iconSettings.className}
                      hoverClass={iconSettings.hoverClass}
                      isActive={isActive ? true : false}
                    />
                    <span className={s['text']}>{text}</span>
                  </>
                )}
                to={`/${path}`}
              />
              {/* {img}
                <span className={s['text']}>{text}</span> */}
              {/* </NavLink> */}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  ) : (
    <></>
  );
};

export default Sidebar;
