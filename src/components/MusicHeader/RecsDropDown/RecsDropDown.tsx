import React from 'react';
import s from './RecsDropDown.module.scss';
import ebalo from '../../../assets/uploads/test/image2.png';
import RecsBlock from './RecsBlock/RecsBlock';

type RecsDropDownProps = {
  className: string;
};

const RecsDropDown: React.FC<RecsDropDownProps> = ({ className }) => {
  const recs = [
    {
      id: 1,
      title: 'В дорогу',
      tracks: [
        { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 2,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 3,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
        { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
      ],
    },
    {
      id: 2,
      title: 'Для занятий спортом',
      tracks: [
        { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 2,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 3,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
      ],
    },
    {
      id: 3,
      title: 'Для занятий спортом',
      tracks: [
        { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 2,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 3,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
      ],
    },
    {
      id: 4,
      title: 'Для занятий спортом',
      tracks: [
        { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
        {
          id: 2,
          img: ebalo,
          title: 'Я пиздец круто да е чееене може тыбть',
          author: 'автор чайник деньги выбери',
          time: 200,
          file: '',
        },
        {
          id: 3,
          img: ebalo,
          title: 'Трекачок',
          author: 'Юрчик норм чел го в',
          time: 221,
          file: '',
        },
        { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
        { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
        // { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 201, file: '' },
      ],
    },
  ];
  return (
    <div className={`${s['wrapper']} ${s[className]}`}>
      {recs.map(({ id, title, tracks }) => (
        <RecsBlock title={title} tracks={tracks} key={id} className={className} />
      ))}
    </div>
  );
};

export default RecsDropDown;
