import React, { useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './Message.module.scss';
import playSvg from '../../assets/img/icons/play.svg';
import img from '../../assets/uploads/test/ebalo.png';
import video from '../../assets/videos/video.mp4';
import audio from '../../assets/sounds/cq.mp3';
import forwardSvg from '../../assets/img/icons/forward.svg';
import ebalo from '../../assets/uploads/test/ebalo.png';
import Icon from '../UI/Icon/Icon';
import { Message as MessageType } from '../../types/message';
import classNames from 'classnames';
import useWindowSize from '../../hooks/useWindowResize';
import { Link } from 'react-router-dom';
import formatTime from '../../utils/formatTime';

type MessageProps = {
  senderId: number;
  message: MessageType;
  myId: number;
  nextSenderId: number | undefined;
  className?: string;
  hasAnimation?: boolean;
  page: 'messages' | 'fms';
};

const Message: React.FC<MessageProps> = ({
  senderId,
  message,
  myId,
  nextSenderId,
  className,
  page,
  hasAnimation,
}) => {
  const { message: messageText, timestamp, images, videos, audios, forwardMessage } = message;

  const { width } = useWindowSize();

  const maxVisibleContent: {
    images: number;
    videos: number;
    voices: number;
    circles: number;
    circlesSolo: number;
    voicesSolo: number;
    music: number;
  } = {
    images: 6,
    videos: width <= 768 ? 1 : 3,
    voices: 2,
    circles: 2,
    circlesSolo: width <= 768 ? 2 : 3,
    voicesSolo: 2,
    music: 1,
  };

  const forwardedMessage: {
    id: number;
    senderId: number;
    message?: string;
    images?: { id: number; img: string }[];
    videos?: { id: number; video: string }[];
    audios?: { id: number; audio: string; time: number; name: string; author: string }[];
  } = {
    id: 1,
    senderId: 1,
    message: '',
    // images: [
    //   { id: 1, img },
    //   { id: 2, img },
    // ],
    // videos: [
    //   { id: 1, video },
    //   { id: 2, video },
    // ],
    audios: [
      { id: 1, audio, time: 123, name: 'cringe', author: 'tiktok' },
      { id: 2, audio, time: 123, name: 'cringe', author: 'tiktok' },
    ],
  };

  return (
    <div className={`${s['message-wrapper']} ${className ? s[className] : ''}`}>
      {senderId !== nextSenderId && (
        <Link to="/profile/swugerd">
          <HeaderAvatar
            className={page === 'fms' ? 'fm-chat-image' : 'messages-image'}
            img={ebalo}
            title={'image'}
            onlineType="pc-offline"
            hasAnimation={hasAnimation}
          />
        </Link>
      )}
      <div
        className={`${myId !== senderId ? s['other-message'] : s['my-message']} ${
          s['message-text']
        } ${senderId === nextSenderId && s['left-margin']}`}>
        {page === 'messages' && (
          <div className={s['message-top']}>
            <Link className={s['user-name']} to="/profile/swugerd">
              {'гдз ёай 4 класс'}
            </Link>
            {myId !== senderId && (
              <button className={s['forward']}>
                <Icon src={forwardSvg} id={'forward'} className={'white'} />
              </button>
            )}
          </div>
        )}
        <div className={`${s['content']} ${!!messageText ? s['no-text'] : ''}`}>
          {!!forwardMessage && (
            <div className={`${s['forward-wrapper']}`}>
              <div className={s['forward-line']}></div>
              {forwardedMessage.message ? (
                <div>
                  <Link className={s['user-name']} to="/profile/swugerd">
                    фифине
                  </Link>
                  <p className={s['text']}>{forwardedMessage.message}</p>
                </div>
              ) : (forwardedMessage.images && forwardedMessage.videos) ||
                (forwardedMessage.images && forwardedMessage?.audios) ||
                (forwardedMessage.videos && forwardedMessage?.audios) ? (
                <div>
                  <span className={s['user-name']}>фифине</span>
                  <p className={s['text']}>Медиа</p>
                </div>
              ) : forwardedMessage.images ? (
                <>
                  <div className={s['media-preview']}>
                    <img src={forwardedMessage.images[0].img} alt="img" />
                  </div>
                  <div>
                    <Link className={s['user-name']} to="/profile/swugerd">
                      фифине
                    </Link>
                    <p className={s['text']}>Фото</p>
                  </div>
                </>
              ) : forwardedMessage.videos ? (
                <>
                  <div className={s['media-preview']}>
                    <video src={forwardedMessage.videos[0].video} />
                  </div>
                  <div>
                    <Link className={s['user-name']} to="/profile/swugerd">
                      фифине
                    </Link>
                    <p className={s['text']}>Видео</p>
                  </div>
                </>
              ) : forwardedMessage.audios ? (
                <>
                  <div className={s['media-preview']}>
                    <img src={ebalo} alt="img" />
                  </div>
                  <div>
                    <Link className={s['user-name']} to="/profile/swugerd">
                      фифине
                    </Link>
                    <p className={s['text']}>Аудио</p>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          )}
          {!!images && (
            <div
              className={classNames({
                [s['images']]: true,
                [s['images-one']]: images.length === 1,
                [s['images-two']]: images.length === 2,
                [s['images-three']]: images.length === 3,
                [s['images-four']]: images.length === 4,
                [s['images-five']]: images.length === 5,
                [s['images-six']]: images.length >= maxVisibleContent.images,
              })}>
              {images.map(({ id, img }, index) => (
                <div className={`${s['image']} ${s[`grid-area-${index}`]}`} key={id}>
                  <img className={`${messageText ? s['b-none'] : ''}`} src={img} alt="" />
                </div>
              ))}
            </div>
          )}
          {!!videos && (
            <div
              className={classNames({
                [s['videos']]: true,
                [s['videos-one']]: videos.length === 1,
                [s['videos-two']]: videos.length === 2 && width > 768,
                [s['videos-three']]: videos.length >= maxVisibleContent.videos && width > 768,
                [s['videos-mobile']]: videos.length > maxVisibleContent.videos && width <= 768,
              })}>
              {videos.map(({ id, video }, index) => (
                <div className={`${s['video']} ${s[`grid-area-${index}`]}`} key={id}>
                  <video
                    className={`${messageText ? s['b-none'] : ''}`}
                    src={video}
                    controls></video>
                </div>
              ))}
            </div>
          )}
          {!!audios && (
            <div className={`${s['audios']}`}>
              {audios.map(({ id, name, author, time }) => (
                <div className={s['track']} key={id}>
                  <div className={s['track-left']}>
                    <button className={s['play-btn']}>
                      <Icon src={playSvg} id={'play'} className={'white'} />
                    </button>
                    <div className={s['track-info']}>
                      <span className={s['track-name']}>{name}</span>
                      <span className={s['track-separator']}>&mdash;</span>
                      <Link className={s['track-author']} to="/profile/swugerd">
                        {author}
                      </Link>
                      <span className={s['track-time']}>{formatTime(time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`${s['row']} ${
            (!images && !videos) || audios || messageText ? '' : s['p-none']
          } ${(images || videos || audios) && !!messageText ? s['m-top'] : ''}`}>
          <p className={s['text']}>{messageText}</p>
          <div
            className={`${s['message-action']} ${
              (!images && !videos) || audios || messageText ? '' : s['media-content']
            }`}>
            <span className={s['message-time']}>{timestamp}</span>
            <div className={s['read-status']}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
