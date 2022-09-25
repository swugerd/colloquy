import React from 'react';
import MusicTrack from '../../../MusicTrack/MusicTrack';
import s from './RecsBlock.module.scss';
import ebalo from '../../../../assets/uploads/test/image2.png';

type RecsBlockProps = {
  title: string;
  tracks: {
    id: number;
    img: string;
    title: string;
    author: string;
    time: number;
    file: string;
  }[];
};

const RecsBlock: React.FC<RecsBlockProps> = ({ title, tracks }) => {
  return (
    <div className={s['wrapper']}>
      <h6 className={s['title']}>{title}</h6>
      <div className={s['block']}>
        {tracks.map(({ id, img, title, author, time }) => (
          <MusicTrack
            img={ebalo}
            title={title}
            author={author}
            time={time}
            key={id}
            isRecs={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RecsBlock;
