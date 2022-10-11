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
          <svg
            width="21"
            height="29"
            viewBox="0 0 21 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.5 25.1356V3.86437C0.5 2.24185 2.33029 1.29459 3.65493 2.23154L18.6915 12.8672C19.8183 13.6641 19.8183 15.3359 18.6915 16.1328L3.65493 26.7685C2.33028 27.7054 0.5 26.7581 0.5 25.1356Z"
              fill="white"
            />
          </svg>
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
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 2.89504V21.1492C7 21.3763 7.07728 21.5966 7.21913 21.7739C7.80964 22.5121 9 22.0945 9 21.1492V8.89858C9 8.38753 9.38533 7.95871 9.89347 7.90427L21.8935 6.61856C22.4845 6.55523 23 7.01842 23 7.61287V19.5858C23 19.851 23.1054 20.1054 23.2929 20.2929C23.9229 20.9229 25 20.4767 25 19.5858V1.11726C25 0.521254 24.4819 0.0575628 23.8896 0.123381L7.88957 1.90116C7.38314 1.95743 7 2.38549 7 2.89504Z"
                  fill="white"
                />
                <ellipse cx="4.5" cy="21.5" rx="4.5" ry="3.5" fill="white" />
                <ellipse cx="20.5" cy="19.5" rx="4.5" ry="3.5" fill="white" />
              </svg>
            </div>
            <span className={s['count']}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
