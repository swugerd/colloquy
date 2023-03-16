import React from 'react';
import s from './MusicPlayer.module.scss';
import trackIcon from '../../assets/uploads/test/image2.png';
import switchTrackSvg from '../../assets/img/icons/switch-track.svg';
import playSvg from '../../assets/img/icons/play.svg';
import pauseSvg from '../../assets/img/icons/pause.svg';
import volumeSvg from '../../assets/img/icons/volume.svg';
import repeatSvg from '../../assets/img/icons/repeat.svg';
import shuffleSvg from '../../assets/img/icons/shuffle.svg';
import forwardSvg from '../../assets/img/icons/forward.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import addSvg from '../../assets/img/icons/add.svg';
import { Link } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';
import { useDispatch } from 'react-redux';
import { setIsForwardModalOpen } from '../../redux/modal/slice';

type MusicPlayerProps = {
  className: string;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const dispatch = useDispatch();

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsForwardModalOpen(true));
  };

  return (
    <div className={`${s['player']} ${s[className]}`}>
      <div className={s['player-pannel']}>
        <button className={s['prev-track']}>
          <Icon src={switchTrackSvg} id={'switchTrack'} className={''} />
        </button>
        <button className={s['play-track']}>
          <Icon src={playSvg} id={'play'} className={''} />
        </button>
        {/* <button className={s['pause-track']}>
                    <img src={pauseIcon} alt="pause" />
                </button> */}
        <button className={s['next-track']}>
          <Icon src={switchTrackSvg} id={'switchTrack'} className={''} />
        </button>
      </div>
      <div className={s['track-wrapper']}>
        <div className={s['track-img']}>
          <img src={trackIcon} alt="track-img" />
        </div>
        <div className={s['track-info']}>
          <span className={s['track-name']}>best dubstep</span>
          <div className={s['track-row']}>
            <Link className={s['track-author']} to="/">
              best author
            </Link>
            <span className={s['track-time']}>01:12</span>
          </div>
          <div className={s['play-line']}>
            <div className={s['play-line-complete']}></div>
          </div>
        </div>
        <div className={s['volume-wrapper']}>
          <button className={s['volume-icon']}>
            <Icon src={volumeSvg} id={'volume'} className={''} />
          </button>
          <div className={s['volume-line']}>
            <div className={s['volume-line-complete']}></div>
            <div className={s['volume-line-point']}></div>
          </div>
        </div>
      </div>
      <div className={s['track-actions']}>
        <button className={s['repeat-icon']}>
          <Icon src={repeatSvg} id={'repeat'} className={'gray'} />
        </button>
        <button className={s['shuffle-icon']}>
          <Icon src={shuffleSvg} id={'shuffle'} className={'gray'} />
        </button>
        <button className={s['forward-icon']} onClick={(e) => handleModalOpen(e)}>
          <Icon src={forwardSvg} id={'forward'} className={'gray'} />
        </button>
        <button className={s['add-icon']}>
          <Icon src={addSvg} id={'add'} className={'gray'} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
