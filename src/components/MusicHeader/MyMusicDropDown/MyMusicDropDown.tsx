import React from 'react';
import ebalo from '../../../assets/uploads/test/image2.png';
import MusicTrack from '../../MusicTrack/MusicTrack';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';
import s from './MyMusicDropDown.module.scss';

type MyMusicDropDownProps = {
  className: string;
};

const MyMusicDropDown: React.FC<MyMusicDropDownProps> = ({ className }) => {
  const tracks: {
    id: number;
    img: string;
    title: string;
    author: string;
    time: number;
    file: string;
  }[] = [
    { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    {
      id: 2,
      img: ebalo,
      title: 'Я пиздец круто да е чееене може тыбть',
      author: 'автор чайник деньги выбер вфы вфы вфыв',
      time: 200,
      file: '',
    },
    { id: 3, img: ebalo, title: 'Трекачок', author: 'Юрчик норм чел го в', time: 221, file: '' },
    { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
    { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
    { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
    { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
    { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
    { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
    { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
    { id: 11, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
    { id: 12, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 1234, file: '' },
  ];

  return (
    <div className={`${s['wrapper']} ${tracks.length ? '' : s['nothing']} ${s[className]}`}>
      {tracks.length ? (
        tracks.map(({ id, img, title, author, time }) => (
          <MusicTrack
            img={img}
            title={title}
            author={author}
            time={time}
            key={id}
            isRecs={false}
            className={className}
          />
        ))
      ) : (
        <NotFoundBlock className={'music-nothing'} text={'У вас ещё нету музыки'} />
      )}
    </div>
  );
};

export default MyMusicDropDown;
