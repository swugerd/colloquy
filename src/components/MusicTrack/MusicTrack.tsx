import React from 'react';
import s from './MusicTrack.module.scss';
import forwardSvg from '../../assets/img/icons/forward.svg';
import removeSvg from '../../assets/img/icons/close.svg';
import ebalo from '../../assets/uploads/test/image2.png';
import { Link } from 'react-router-dom';
import formatTime from '../../utils/formatTime';
import Icon from '../UI/Icon/Icon';

type MusicTrackProps = {
  img: string;
  title: string;
  author: string;
  time: number;
  isRecs: boolean;
  className: string;
  hasRemoveMediaButton?: boolean;
};

const MusicTrack: React.FC<MusicTrackProps> = ({
  img,
  title,
  author,
  time,
  isRecs,
  className,
  hasRemoveMediaButton,
}) => {
  return (
    <div className={`${s['wrapper']} ${isRecs ? s['recs-wrapper'] : ''} ${s[className]}`}>
      <div className={s['track-img']}>
        <img src={ebalo} alt="track" />
      </div>
      <div className={`${isRecs ? s['track-recs'] : s['track-info']}`}>
        <div className={s['row']}>
          <span className={isRecs ? s['recs-title'] : s['track-title']} title={title}>
            {title}
          </span>
          {!isRecs && <span className={s['separator']}>&mdash;</span>}
          <Link className={isRecs ? s['recs-author'] : s['track-author']} to="/" title={author}>
            {author}
          </Link>
        </div>
        <span className={`${s['track-time']} ${isRecs && s['recs-time']}`}>{formatTime(time)}</span>
      </div>
      <div className={isRecs ? s['recs-actions'] : s['track-actions']}>
        {hasRemoveMediaButton ? (
          <button className={s['remove-media']} type="button">
            <Icon src={removeSvg} id={'close'} className={'white'} />
          </button>
        ) : (
          <>
            <button className={isRecs ? s['recs-forward'] : s['forward']}>
              <Icon src={forwardSvg} id={'forward'} className={'gray'} />
            </button>
            <button className={s['delete']}>
              <Icon src={removeSvg} id={'close'} className={'gray'} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MusicTrack;
