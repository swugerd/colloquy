import React from 'react';
import { Link } from 'react-router-dom';
import s from './PlaylistCard.module.scss';
import playIcon from '../../assets/img/icons/play.svg';
import pauseIcon from '../../assets/img/icons/pause.svg';
import musicIcon from '../../assets/img/header/music.svg';

type PlaylistCardProps = {
  author: string;
  title: string;
  count: number;
  img: string;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ author, title, count, img }) => {
  return (
    <div className={s['card']} style={{ background: `url('${img}') center/cover no-repeat` }}>
      <div className={s['card-hover']}>
        <div className={s['author']}>
          <span>Автор</span>
          <Link to="/" className={s['name']} title={author}>
            {author}
          </Link>
        </div>
        <button className={s['play']}>
          <img src={playIcon} alt="play" />
        </button>
        {/* <button className={s['pause']}>
                    <img src={pauseIcon} alt="pause" />
                </button> */}
        <div className={s['info']}>
          <span className={s['title']} title={title}>
            {title}
          </span>
          <div className={s['row']}>
            <div className={s['icon']}>
              <img src={musicIcon} alt="music-icon" />
            </div>
            <span className={s['count']}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
