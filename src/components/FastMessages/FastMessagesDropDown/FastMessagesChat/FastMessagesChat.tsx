import React from 'react';
import HeaderAvatar from '../../../UI/HeaderAvatar/HeaderAvatar';
import ebalo from '../../../../assets/uploads/test/ebalo.png';
import ebalo2 from '../../../../assets/uploads/test/ebalo2.png';
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
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 9.89603C9 9.89603 14.4673 4.42857 16.5956 2.30035M16.5956 2.30035C15.9593 2.10009 11.8973 2.39783 11.8973 2.39783M16.5956 2.30035C16.8047 2.50948 16.4981 6.99857 16.4981 6.99857"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 1.99976H3C1.89543 1.99976 1 2.89519 1 3.99976V15.9998C1 17.1043 1.89543 17.9998 3 17.9998H15C16.1046 17.9998 17 17.1043 17 15.9998V10.4998"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Link className={s['arrow']} to="/fms">
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.5 6.5C13.5 6.5 5.88155 6.5 1 6.5M1 6.5C1.5 7.5 6.5 12 6.5 12M1 6.5C1 6 6.5 1 6.5 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
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
