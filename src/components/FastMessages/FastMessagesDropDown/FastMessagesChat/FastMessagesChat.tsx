import React from 'react';
import HeaderAvatar from '../../../UI/HeaderAvatar/HeaderAvatar';
import ebalo from '../../../../assets/uploads/test/ebalo.png';
import ebalo2 from '../../../../assets/uploads/test/ebalo2.png';
import fullChatSvg from '../../../../assets/img/icons/chat-full.svg';
import arrowSvg from '../../../../assets/img/icons/back.svg';
import s from './FastMessagesChat.module.scss';
import inputS from '../../../UI/Input/Input.module.scss';
import { Link, useParams } from 'react-router-dom';
import Input from '../../../UI/Input/Input';
import Icon from '../../../UI/Icon/Icon';

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
            className="fm-chat-image"
            img={ebalo}
            title={'image'}
            indicatorClass={['sm-indicator', 'border-sub-bg']}
            onlineType="pc-offline"
          />
          <span className={s['user-name']} title={dialogId}>
            {dialogId}
          </span>
        </Link>
        <button className={s['full-chat']}>
          <Icon src={fullChatSvg} id={'fullChat'} className={'full-icon'} />
        </button>
        <Link className={s['arrow']} to="/fms">
          <Icon src={arrowSvg} id={'back'} className={'arrow-fms'} />
        </Link>
      </div>
      <div className={s['wrapper-content']}>
        {chats.map(({ id, userId, messageText, messageTime, img }, index, chats) => (
          <div key={id} className={s['message-wrapper']}>
            {userId !== chats[index + 1]?.userId && (
              <HeaderAvatar
                className="fm-chat-image"
                img={ebalo}
                title={'image'}
                onlineType="pc-offline"
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
