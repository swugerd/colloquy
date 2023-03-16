import React from 'react';
import video from '../../../assets/videos/video.mp4';
import s from './VideosList.module.scss';
import InputButton from '../../../components/UI/InputButton/InputButton';
import Icon from '../../../components/UI/Icon/Icon';
import views from '../../../assets/img/icons/views.svg';
import { Link } from 'react-router-dom';

type VideosListProps = {
  checkboxes: {
    [key: string]: any;
  };
  setCheckboxes: (checkbox: any) => void;
};

const VideosList: React.FC<VideosListProps> = ({ checkboxes, setCheckboxes }) => {
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
  const videos = [
    { id: 1, video, userId: 1 },
    { id: 2, video, userId: 1 },
    { id: 3, video, userId: 1 },
    { id: 4, video, userId: 1 },
    { id: 5, video, userId: 1 },
    { id: 6, video, userId: 1 },
    { id: 7, video, userId: 1 },
  ];
  return (
    <ul className={s['videos']}>
      {videos.map(({ id, video }) => (
        <li className={`${s['video']} ${checkboxes[`video${id}`] ? s['active'] : ''}`} key={id}>
          <label htmlFor={`video${id}`}>
            <video src={video}></video>
          </label>
          <div className={s['video-info']}>
            <div className={s['row']}>
              <p className={s['name']}>собака смотрит</p>
              <div className={s['views']}>
                <div className={s['views-icon']}>
                  <Icon src={views} id={'views'} className={'gray'} />
                </div>
                <span>1343242</span>
              </div>
            </div>
            <div className={s['row']}>
              <Link className={s['author']} to="/profile/swugerd">
                хозяин собаки
              </Link>
              <span className={s['date']}>Вчера</span>
            </div>
          </div>
          <InputButton
            checked={checkboxes[`video${id}`] || false}
            onChange={handleCheckboxChange}
            name={`video${id}`}
            id={`video${id}`}
            className={'upload-video'}
            type={'checkbox'}
          />
        </li>
      ))}
    </ul>
  );
};

export default VideosList;
