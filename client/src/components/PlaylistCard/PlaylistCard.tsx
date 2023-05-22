import React from 'react';
import { Link } from 'react-router-dom';
import s from './PlaylistCard.module.scss';
import playSvg from '../../assets/img/icons/play.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import Icon from '../UI/Icon/Icon';

type PlaylistCardProps = {
  author: string;
  title: string;
  count: number;
  img: string;
  className: string;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ author, title, count, img, className }) => {
  return (
    <div
      className={`${s['card']} ${s[className]}`}
      style={{ background: `url('${img}') center/cover no-repeat` }}>
      <div className={s['card-hover']}>
        <div className={s['author']}>
          <span>Автор</span>
          <Link to="/" className={s['name']} title={author}>
            {author}
          </Link>
        </div>
        <button className={s['play']}>
          <Icon src={playSvg} id={'play'} className={'white'} />
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
              <Icon src={musicSvg} id={'music'} className={'white'} />
            </div>
            <span className={s['count']}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
