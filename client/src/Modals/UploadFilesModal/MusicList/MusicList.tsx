import React from 'react';
import s from './MusicList.module.scss';
import video from '../../../assets/videos/video.mp4';
import ebalo from '../../../assets/uploads/test/image2.png';
import InputButton from '../../../components/UI/InputButton/InputButton';
import Icon from '../../../components/UI/Icon/Icon';
import views from '../../../assets/img/icons/views.svg';
import { Link } from 'react-router-dom';
import MusicTrack from '../../../components/MusicTrack/MusicTrack';

type MusicListProps = {
  checkboxes: {
    [key: string]: any;
  };
  setCheckboxes: (checkbox: any) => void;
};

const MusicList: React.FC<MusicListProps> = ({ checkboxes, setCheckboxes }) => {
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
      title: 'Я пиздец круто да е чееене може тыбть sahjd hask hsdahj asd a',
      author: 'автор чайник деньги выбер вфы вфы вфыв sad asd asd saddassa',
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
  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;

    if (!checked) {
      const { [name]: removed, ...rest } = checkboxes;
      setCheckboxes(rest);
    } else {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
    delete checkboxes[''];
  };
  return (
    <ul className={s['music']}>
      {tracks.map(({ id, img, title, author, time }) => (
        <li className={`${s['track']} ${checkboxes[`music${id}`] ? s['active'] : ''}`} key={id}>
          <label htmlFor={`music${id}`}>
            <MusicTrack
              img={img}
              title={title}
              author={author}
              time={time}
              isRecs={false}
              className={'upload-track'}
            />
          </label>
          <InputButton
            checked={checkboxes[`music${id}`] || false}
            onChange={handleCheckboxChange}
            name={`music${id}`}
            id={`music${id}`}
            className={'upload-music'}
            type={'checkbox'}
          />
        </li>
      ))}
    </ul>
  );
};

export default MusicList;
