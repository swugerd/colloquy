import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Sidebar.module.scss';
import feedIcon from '../../assets/img/icons/feed.svg';
import profileIcon from '../../assets/img/icons/user.svg';
import friendsIcon from '../../assets/img/icons/friends.svg';
import communitiesIcon from '../../assets/img/icons/groups.svg';
import messagesIcon from '../../assets/img/header/chat.svg';
import circlesIcon from '../../assets/img/icons/circles.svg';
import voicesIcon from '../../assets/img/icons/voice.svg';
import photosIcon from '../../assets/img/icons/photos.svg';
import videosIcon from '../../assets/img/icons/videos.svg';
import musicIcon from '../../assets/img/header/music.svg';
import appsIcon from '../../assets/img/icons/apps.svg';
import gamesIcon from '../../assets/img/icons/games.svg';

// Переделать иконки в свг

const Sidebar: React.FC = () => {
  const links = [
    {
      id: 1,
      img: feedIcon,
      text: 'Новости',
      path: 'feed',
    },
    {
      id: 2,
      img: profileIcon,
      text: 'Профиль',
      path: 'profile',
    },
    {
      id: 3,
      img: friendsIcon,
      text: 'Друзья',
      path: 'friends',
    },
    {
      id: 4,
      img: communitiesIcon,
      text: 'Сообщества',
      path: 'groups',
    },
    {
      id: 5,
      img: messagesIcon,
      text: 'Сообщения',
      path: 'messages',
    },
    {
      id: 6,
      img: circlesIcon,
      text: 'Кружочки',
      path: 'circles',
    },
    {
      id: 7,
      img: voicesIcon,
      text: 'Войсы',
      path: 'voices',
    },
    {
      id: 8,
      img: photosIcon,
      text: 'Фотографии',
      path: 'photos',
    },
    {
      id: 9,
      img: videosIcon,
      text: 'Видео',
      path: 'videos',
    },
    {
      id: 10,
      img: musicIcon,
      text: 'Музыка',
      path: 'music',
    },
    {
      id: 11,
      img: appsIcon,
      text: 'Приложения',
      path: 'apps',
    },
    {
      id: 12,
      img: gamesIcon,
      text: 'Игры',
      path: 'games',
    },
  ];
  return (
    <aside className={s['sidebar']}>
      <nav className={s['nav']}>
        {links.map(({ id, img, text, path }) => (
          <div className={s['nav-item']} key={id}>
            <img className={s['nav-img']} src={img} alt={text} />
            <NavLink className={s['nav-link']} to={`/${path}`}>
              {text}
            </NavLink>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
