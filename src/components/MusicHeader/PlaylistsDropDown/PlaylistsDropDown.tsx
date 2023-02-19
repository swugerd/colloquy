import React from 'react';
import PlaylistCard from '../../PlaylistCard/PlaylistCard';
import s from './PlaylistsDropDown.module.scss';
import addSvg from '../../../assets/img/icons/add.svg';
import removeSvg from '../../../assets/img/icons/close.svg';
import forwardSvg from '../../../assets/img/icons/forward.svg';
import ebalo from '../../../assets/uploads/test/image2.png';
import cat from '../../../assets/uploads/test/cat.png';
import MusicTrack from '../../MusicTrack/MusicTrack';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';
import Icon from '../../UI/Icon/Icon';

type PlaylistsDropDownProps = {
  className: string;
};

const PlaylistsDropDown: React.FC<PlaylistsDropDownProps> = ({ className }) => {
  const playlists: {
    id: number;
    author: string;
    title: string;
    count: number;
    tracks: {
      id: number;
      img: string;
      title: string;
      author: string;
      time: number;
      file: string;
    }[];
  }[] = [
    {
      id: 1,
      author: 'Олег Киреев',
      title: 'медведь)',
      count: 123,
      tracks: [
        { id: 2, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 3,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 4,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 11, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 12, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 13, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
      ],
    },
    {
      id: 2,
      author: 'Максимильно Рабадонович',
      title: 'полный запивончик',
      count: 25,
      tracks: [
        { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 7,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 8,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
      ],
    },
    {
      id: 3,
      author: 'Максимильно Рабадонович',
      title: 'полный запивончик',
      count: 25,
      tracks: [
        { id: 11, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 12,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 8,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
      ],
    },
  ];
  return (
    <>
      <div className={`${s['playlists']} ${playlists.length ? '' : s['nothing']} ${s[className]}`}>
        {playlists.map(({ id, author, title, count }) => (
          <PlaylistCard
            author={author}
            title={title}
            count={count}
            img={cat}
            key={id}
            className={className}
          />
        ))}
        <div className={s['create']}>
          <Icon src={addSvg} id={'add'} className={'white'} />
        </div>
      </div>
      {playlists.length ? (
        <div className={`${s['info']} ${s[className]}`}>
          <p className={s['heading']}>Текущий плейлист</p>
          <span className={s['separator']}>&mdash;</span>
          <span className={s['title']}>{playlists[0]?.title}</span>
          <button className={s['remove']}>
            <Icon src={removeSvg} id={'close'} className={'gray'} />
          </button>
          <button className={s['forward']}>
            <Icon src={forwardSvg} id={'forward'} className={'gray'} />
          </button>
        </div>
      ) : (
        <NotFoundBlock className={'playlists-nothing'} text={'У вас ещё нету плейлистов'} />
      )}
      <div className={`${s['wrapper']} ${s[className]}`}>
        {playlists[0]?.tracks.map(({ id, title, author, time }) => (
          <MusicTrack
            img={cat}
            title={title}
            author={author}
            time={time}
            isRecs={false}
            key={id}
            className={className}
          />
        ))}
      </div>
    </>
  );
};

export default PlaylistsDropDown;
