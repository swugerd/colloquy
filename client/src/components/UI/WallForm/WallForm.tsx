import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import s from './WallForm.module.scss';
import paperclipSvg from '../../../assets/img/icons/paperclip.svg';
import ebalo from '../../../assets/uploads/test/ebalo.png';
import video from '../../../assets/videos/video.mp4';
import anonymSvg from '../../../assets/img/icons/anonym.svg';
import smileSvg from '../../../assets/img/icons/smile.svg';
import commentsSvg from '../../../assets/img/icons/comment.svg';
import microSvg from '../../../assets/img/icons/voices.svg';
import sendSvg from '../../../assets/img/icons/send.svg';
import UploadFilesModal from '../../../Modals/UploadFilesModal/UploadFilesModal';
import MusicTrack from '../../MusicTrack/MusicTrack';
import Input from '../Input/Input';
import MediaToUpload from '../../MediaToUpload/MediaToUpload';

type WallFormProps = {
  page: 'profile' | 'feed' | 'group';
  className: string;
  placeholder: string;
  isAdmin: boolean;
};

const WallForm: React.FC<WallFormProps> = ({ page, className, placeholder, isAdmin }) => {
  const [isRadioActive, setIsRadioActive] = useState(true);

  const paperClipRef = useRef<HTMLButtonElement>(null);

  const [isAnonymActive, setIsAnonymActive] = useState(false);

  const hasMediaToUpload = false;

  return page !== 'feed' ? (
    <>
      <form className={s['post-form']}>
        <div className={s['relative']}>
          <Input
            className={'wall-textarea'}
            placeholder={placeholder}
            type={'text'}
            inputType={'send'}
            isTextarea={true}
            button={paperClipRef}
            classOptions={{
              paperclipIcon: 'paperclip-icon-wall',
              smileIcon: 'smile-icon-wall',
              sendIcon: 'send-icon-wall',
            }}
            name={''}
            value={''}
            setValue={() => {}}
          />
          {hasMediaToUpload && (
            <MediaToUpload className={page === 'profile' ? 'wall-page' : 'group-page'} />
          )}
        </div>
        <div className={s['input-controls']}>
          {page === 'profile' && isAdmin && (
            <>
              <button className={`${s['controls-icon']} ${s['comments']}`} type="button">
                <Icon src={commentsSvg} id={'comments'} className={'gray'} />
              </button>
              <div className={s['media-action']} onClick={() => setIsRadioActive(!isRadioActive)}>
                <div className={s['radio-btn']}>
                  <input
                    type="checkbox"
                    className={`${s['inp-disabled']}`}
                    checked={isRadioActive}
                    onChange={() => setIsRadioActive(!isRadioActive)}
                  />
                  <div className={`${s['custom-btn']}`}></div>
                </div>
                <div className={s['text']}>Добавить медиа на страницу</div>
              </div>
            </>
          )}
          {page === 'group' && isAdmin && (
            <>
              <button className={`${s['controls-icon']} ${s['comments']}`}>
                <Icon src={commentsSvg} id={'comments'} className={'gray'} />
              </button>
              <button
                className={`${s['controls-icon']} ${s['anonym']} ${s['separator']}`}
                onClick={() => setIsAnonymActive(!isAnonymActive)}>
                <Icon src={anonymSvg} id={'anonym'} className={isAnonymActive ? 'gray' : 'green'} />
              </button>
              <div className={s['media-action']} onClick={() => setIsRadioActive(!isRadioActive)}>
                <div className={s['radio-btn']}>
                  <input
                    type="checkbox"
                    className={`${s['inp-disabled']}`}
                    checked={isRadioActive}
                    onChange={() => setIsRadioActive(!isRadioActive)}
                  />
                  <div className={`${s['custom-btn']}`}></div>
                </div>
                <div className={s['text']}>Добавить медиа в сообщество</div>
              </div>
            </>
          )}
          {page === 'group' && isAdmin === false && (
            <button
              className={`${s['controls-icon']} ${s['anonym']}`}
              onClick={() => setIsAnonymActive(!isAnonymActive)}>
              <Icon src={anonymSvg} id={'anonym'} className={isAnonymActive ? 'gray' : 'green'} />
            </button>
          )}
          <div className={s['row']}>
            <button className={`${s['controls-icon']} ${s['micro']}`}>
              <Icon src={microSvg} id={'voices'} className={'gray'} />
            </button>
            <button className={`${s['controls-icon']} ${s['send']}`}>
              <Icon src={sendSvg} id={'send'} className={'gray'} />
            </button>
          </div>
        </div>
      </form>
    </>
  ) : (
    <></>
  );
};

export default WallForm;
