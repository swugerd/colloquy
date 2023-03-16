import React from 'react';
import s from './MediaToUpload.module.scss';
import ebalo from '../../assets/uploads/test/ebalo.png';
import video from '../../assets/videos/video.mp4';
import closeSvg from '../../assets/img/icons/close.svg';
import MusicTrack from '../MusicTrack/MusicTrack';
import Icon from '../UI/Icon/Icon';

type MediaToUploadProps = {
  className: string;
};

const MediaToUpload: React.FC<MediaToUploadProps> = ({ className }) => {
  const images: { id: number; ebalo: string }[] = [
    { id: 1, ebalo },
    { id: 2, ebalo },
    { id: 3, ebalo },
    { id: 4, ebalo },
    { id: 5, ebalo },
    { id: 6, ebalo },
    { id: 7, ebalo },
    { id: 8, ebalo },
    { id: 9, ebalo },
    { id: 10, ebalo },
  ];

  const videos: { id: number; video: string }[] = [
    { id: 1, video },
    { id: 2, video },
    { id: 3, video },
  ];

  const tracks: {
    id: number;
    img: string;
    title: string;
    author: string;
    time: number;
    file: string;
  }[] = [
    { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 2, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 3, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
  ];

  return (
    <div className={`${s['media-grid']} ${className ? s[className] : ''}`}>
      {!!images.length && (
        <div className={s['media-row']}>
          {images.map(({ id, ebalo }) => (
            <div className={s['media-block']} key={id}>
              <div className={s['image']}>
                <img src={ebalo} alt="" />
              </div>
              <button className={s['delete']} type="button">
                <Icon src={closeSvg} id={'close'} className={'white'} />
              </button>
            </div>
          ))}
        </div>
      )}
      {!!videos.length && (
        <div className={s['media-row']}>
          {videos.map(({ id, video }) => (
            <div className={s['media-block']} key={id}>
              <div className={s['video']}>
                <video src={video} controls></video>
              </div>
              <button className={s['delete']} type="button">
                <Icon src={closeSvg} id={'close'} className={'white'} />
              </button>
            </div>
          ))}
        </div>
      )}
      {!!tracks.length && (
        <div className={s['tracks']}>
          {tracks.map(({ id, img, title, author, time }) => (
            <div key={id}>
              <MusicTrack
                img={img}
                title={title}
                author={author}
                time={time}
                isRecs={false}
                className={'wall-upload'}
                hasRemoveMediaButton={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaToUpload;
