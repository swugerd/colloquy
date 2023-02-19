import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Music.module.scss';
import SideContent from '../../components/SideContent/SideContent';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Input from '../../components/UI/Input/Input';
import uploadSvg from '../../assets/img/icons/upload.svg';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import MyMusicDropDown from '../../components/MusicHeader/MyMusicDropDown/MyMusicDropDown';
import PlaylistsDropDown from '../../components/MusicHeader/PlaylistsDropDown/PlaylistsDropDown';
import RecsDropDown from '../../components/MusicHeader/RecsDropDown/RecsDropDown';
import Icon from '../../components/UI/Icon/Icon';
import ebalo from '../../assets/uploads/test/image2.png';
import MusicTrack from '../../components/MusicTrack/MusicTrack';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';

type MusicProps = {
  tab: 'list' | 'playlists' | 'recs';
};

const Music: React.FC<MusicProps> = ({ tab }) => {
  useSetPageTitle('Музыка');

  const components = [
    { id: 1, name: 'list', component: <MyMusicDropDown className={'music-page'} /> },
    { id: 2, name: 'playlists', component: <PlaylistsDropDown className={'music-page'} /> },
    { id: 3, name: 'recs', component: <RecsDropDown className={'music-page'} /> },
  ];

  const links = [
    { id: 1, name: 'Моя музыка', path: '/music' },
    { id: 2, name: 'Плейлисты', path: '/music/playlists' },
    { id: 3, name: 'Рекомендации', path: '/music/recs' },
  ];

  const lastFriendsUpdates = [
    {
      id: 1,
      userId: 1,
      addedTracks: [
        { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        { id: 2, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        { id: 3, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        // { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        // { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        // { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        // { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        // { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
      ],
    },
    {
      id: 2,
      userId: 2,
      addedTracks: [{ id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' }],
    },
  ];

  const children = [
    <div className={`${sideContentS['activity']}`} key={1}>
      <ul className={sideContentS['activity-list']}>
        {lastFriendsUpdates.map(({ id, userId, addedTracks }) => (
          <li className={sideContentS['activity-item']} key={id}>
            <div className={sideContentS['activity-user']}>
              <HeaderAvatar
                className={'music-activity'}
                img={ebalo}
                title={'user'}
                onlineType={'pc-dnd'}
                indicatorClass={['sm-indicator', 'border-sub-bg']}
              />
              <div className={sideContentS['activity-user-block']}>
                <Link className={sideContentS['activity-user-name']} to={'/profile/swugerd'}>
                  Egor_B
                </Link>
                <p className={sideContentS['activity-user-info']}>
                  Добавил <span>2</span> трека <span>11.25.2003</span>
                </p>
              </div>
            </div>
            <ul className={sideContentS['activity-tracks']}>
              {addedTracks.map(({ id, img, title, author, time }) => (
                <li className={sideContentS['activity-track']} key={id}>
                  <MusicTrack
                    img={img}
                    title={title}
                    author={author}
                    time={time}
                    isRecs={false}
                    className={'activity'}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>,
  ];
  return (
    <>
      <div className={s['music']}>
        <MusicPlayer className={'page'} />
        <Input
          className={'music-page'}
          placeholder={'Искать музыку'}
          type={'text'}
          inputType={'search'}
        />
        <nav className={s['music-nav']}>
          <ul className={s['links-list']}>
            {links.map(({ id, name, path }) => (
              <li className={s['link-item']} key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? `${s['active']} ${s['link']}` : s['link']
                  }
                  end={path === '/music'}>
                  {name}
                </NavLink>
              </li>
            ))}
            {tab === 'list' && (
              <li className={s['upload-button']}>
                <button className={s['upload']}>
                  <Icon src={uploadSvg} id={'upload'} className={'white'} />
                </button>
              </li>
            )}
          </ul>
        </nav>
        {components.find(({ name }) => tab === name)?.component}
      </div>
      <SideContent titles={['Активность друзей']} className={'music'}>
        {children}
      </SideContent>
    </>
  );
};

export default Music;
