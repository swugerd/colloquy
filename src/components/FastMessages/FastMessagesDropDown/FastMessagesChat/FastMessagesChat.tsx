import React from 'react';
import HeaderAvatar from '../../../UI/HeaderAvatar/HeaderAvatar';
import ebalo from '../../../../assets/img/header/ebalo.png';
import ebalo2 from '../../../../assets/img/header/ebalo2.png';
import fullChat from '../../../../assets/img/icons/chat-full.svg';
import arrow from '../../../../assets/img/icons/arrow.svg';
import s from './FastMessagesChat.module.scss';
import inputS from '../../../UI/Input/Input.module.scss';
import { Link, useParams } from 'react-router-dom';
import Input from '../../../UI/Input/Input';

const FastMessagesChat: React.FC = () => {
  const { dialogId }: any = useParams();

  const chats = [
    { id: 1, userId: 10, messageText: 'ура крутое сообщение!', messageTime: '12:40', img: ebalo },
    {
      id: 2,
      userId: 10,
      messageText: 'я тебе ответил очень конструктивно дааааа кмон',
      messageTime: '12:40',
      img: ebalo2,
    },
    {
      id: 4,
      userId: parseInt(dialogId),
      messageText: 'И короче ещё одно сообщение лол',
      messageTime: '12:40',
      img: ebalo2,
    },
    {
      id: 5,
      userId: parseInt(dialogId),
      messageText: 'jdsahkjdhsajdshaj',
      messageTime: '12:40',
      img: ebalo2,
    },
    {
      id: 6,
      userId: parseInt(dialogId),
      messageText: 'jdsahkjdhsajdshaj',
      messageTime: '12:40',
      img: ebalo2,
    },
    { id: 7, userId: 10, messageText: 'jdsahkjdhsajdshaj', messageTime: '12:40', img: ebalo },
  ];

  return (
    <>
      <div className={s['wrapper-top']}>
        <Link className={s['user-link']} to="/">
          <HeaderAvatar
            hasDelete={false}
            className="fm-chat-image"
            img={ebalo}
            title={'image'}
            indicatorClass="fm-indicator"
          />
          <span className={s['user-name']} title={dialogId}>
            {dialogId}
          </span>
        </Link>
        <button className={s['full-chat']}>
          <img src={fullChat} alt="open full chat" />
        </button>
        <Link className={s['arrow']} to="/fms">
          <img src={arrow} alt="back" />
        </Link>
      </div>
      <div className={s['wrapper-content']}>
        {chats.map(({ id, userId, messageText, messageTime, img }, index, chats) => (
          <div key={id} className={s['message-wrapper']}>
            {userId !== chats[index + 1]?.userId && (
              <HeaderAvatar
                hasDelete={false}
                className="message-avatar"
                img={img}
                title={'image'}
              />
            )}
            <div
              className={`${userId === parseInt(dialogId) ? s['other-message'] : s['my-message']} ${
                s['message-text']
              } ${userId === chats[index + 1]?.userId && s['left-margin']}`}>
              {messageText}
              <div className={`${s['message-action']}`}>
                <div className={s['read-status']}></div>
                <span className={s['message-time']}>{messageTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={s['wrapper-bottom']}>
        {/* <div className={s['input-block']}>
                </div> */}
        <Input className="fm-input-send" type="text" placeholder="Сообщение..." inputType="send" />
      </div>
    </>
  );
};

export default FastMessagesChat;
