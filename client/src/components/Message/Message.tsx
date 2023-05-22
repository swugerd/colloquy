import React, { useState } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './Message.module.scss';
import editSvg from '../../assets/img/icons/edit.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import Icon from '../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import markSvg from '../../assets/img/icons/markdown.svg';

type MessageProps = {
  senderId: number;
  message: any;
  myId: number;
  nextSenderId: number | undefined;
  className?: string;
  hasAnimation?: boolean;
  page: 'messages' | 'fms';
  setMessages: (messages: any) => void;
  messages: any;
  chatId: number;
};

const Message: React.FC<MessageProps> = ({
  senderId,
  message,
  myId,
  nextSenderId,
  className,
  page,
  hasAnimation,
  setMessages,
  messages,
  chatId,
}) => {
  const { message_text: messageText, user, createdAt: timestamp } = message;
  const images = [1];
  const videos = [1];
  const audios = [1];

  const handleEditMessage = async () => {
    if (!changingText) return;
    setChangingText(changingText);
    setIsMessageChanging(!isMessageChanging);
    const updatedMessage = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_HOSTNAME}/api/messages/${message.id}`,
      data: {
        message_text: changingText,
      },
    });
  };

  const handleDeleteMessage = async () => {
    const deletedMessage = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/messages/${message.id}`,
    });

    setMessages(messages.filter((message: any) => message.id !== deletedMessage.data.id));
  };

  const handleTextareaVisibility = () => {
    setChangingText(changingText);
    setIsMessageChanging(!isMessageChanging);
  };

  const [changingText, setChangingText] = useState(messageText ? messageText : '');
  const [isMessageChanging, setIsMessageChanging] = useState(false);

  const textAreaAdjust = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChangingText(e.target.value);
    e.target.style.height = '1px';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.target.value === '') {
      e.target.style.height = '1px';
    }
  };

  return (
    <div className={`${s['message-wrapper']} ${className ? s[className] : ''}`}>
      {senderId !== nextSenderId && (
        <Link to={`/profile/${user.user_avatar}`}>
          <HeaderAvatar
            className={page === 'fms' ? 'fm-chat-image' : 'messages-image'}
            img={user.user_avatar}
            title={'image'}
          />
        </Link>
      )}
      <div
        className={`${myId !== senderId ? s['other-message'] : s['my-message']} ${
          s['message-text']
        } ${senderId === nextSenderId && s['left-margin']}`}>
        {page === 'messages' && (
          <div className={s['message-top']}>
            <Link to={`/profile/${user.user_nickname}`}>{user.user_name}</Link>
            {myId === senderId && (
              <div className={s['flex']}>
                {isMessageChanging ? (
                  <button className={s['forward']} onClick={handleEditMessage}>
                    <Icon src={markSvg} id={'markdown'} className={'white'} />
                  </button>
                ) : (
                  <button className={s['forward']} onClick={handleTextareaVisibility}>
                    <Icon src={editSvg} id={'edit'} className={'white'} />
                  </button>
                )}
                <button className={s['forward']} onClick={handleDeleteMessage}>
                  <Icon src={trashSvg} id={'trash'} className={'white'} />
                </button>
              </div>
            )}
          </div>
        )}
        <div className={`${s['content']} ${!!messageText ? s['no-text'] : ''}`}>
          {/* {!!forwardMessage && (
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
          )} */}
          {/* {!!images && (
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
              {images.map(({ id, img }: any, index) => (
                <div
                  className={`${s['image']} ${s[`grid-area-${index}`]}`}
                  key={id}
                  onClick={(e) => handleModalOpen(e)}>
                  <img className={`${messageText ? s['b-none'] : ''}`} src={img} alt="" />
                </div>
              ))}
            </div>
          )} */}
          {/* {!!videos && (
            <div
              className={classNames({
                [s['videos']]: true,
                [s['videos-one']]: videos.length === 1,
                [s['videos-two']]: videos.length === 2 && width > 768,
                [s['videos-three']]: videos.length >= maxVisibleContent.videos && width > 768,
                [s['videos-mobile']]: videos.length > maxVisibleContent.videos && width <= 768,
              })}>
              {videos.map(({ id, video }: any, index) => (
                <div
                  className={`${s['video']} ${s[`grid-area-${index}`]}`}
                  key={id}
                  onClick={(e) => handleModalOpen(e)}>
                  <video
                    className={`${messageText ? s['b-none'] : ''}`}
                    src={video}
                    controls></video>
                </div>
              ))}
            </div>
          )} */}
          {/* {!!audios && (
            <div className={`${s['audios']}`}>
              {audios.map(({ id, name, author, time }: any) => (
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
          )} */}
        </div>
        <div
          className={`${s['row']} ${
            (!images && !videos) || audios || messageText ? '' : s['p-none']
          } ${(images || videos || audios) && !!messageText ? s['m-top'] : ''}`}>
          {!isMessageChanging ? (
            <p className={s['text']}>{changingText}</p>
          ) : (
            <textarea
              className={s['message-textarea']}
              value={changingText}
              onChange={(e) => textAreaAdjust(e)}></textarea>
          )}
          <div
            className={`${s['message-action']} ${
              (!images && !videos) || audios || messageText ? '' : s['media-content']
            }`}>
            <span className={s['message-time']}>{moment(timestamp).format('HH:mm')}</span>
            {/* <div className={s['read-status']}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
