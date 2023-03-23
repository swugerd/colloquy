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
import Message from '../../../Message/Message';
import { Message as MessageType } from '../../../../types/message';
import { useAppDispatch } from './../../../../redux/store';
import { setFmsComponentIndex } from '../../../../redux/dropdowns/slice';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../../../redux/dropdowns/selector';

type FastMessagesChatProps = {
  userId: number;
};

const FastMessagesChat: React.FC<FastMessagesChatProps> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const { dropdowns } = useSelector(selectDropdowns);

  const messages: MessageType[] = [
    {
      id: 1,
      senderId: 2,
      message: 'ку',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: false,
    },
    {
      id: 2,
      senderId: 2,
      message: 'че дел',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: false,
    },
    {
      id: 3,
      senderId: 1,
      message: 'колекви ебашу',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
    },
    {
      id: 4,
      senderId: 1,
      message: 'а че бро',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
    },
    {
      id: 5,
      senderId: 2,
      message: 'ыыыыыыыыыыыыыы',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: true,
    },
    {
      id: 6,
      senderId: 2,
      message: 'ладно тогда делай не отвлекаю!',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: true,
    },
    {
      id: 7,
      senderId: 2,
      message: 'ладно тогда делай не отвлекаю!',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: true,
    },
    {
      id: 8,
      senderId: 2,
      message: 'ладно тогда делай не отвлекаю!',
      timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
      unread: true,
    },
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
          <span className={s['user-name']} title={'da'}>
            {userId}
          </span>
        </Link>
        <button className={s['full-chat']}>
          <Icon src={fullChatSvg} id={'fullChat'} className={'full-icon'} />
        </button>
        <button className={s['arrow']} onClick={() => dispatch(setFmsComponentIndex(0))}>
          <Icon src={arrowSvg} id={'back'} className={'arrow-fms'} />
        </button>
      </div>
      <div className={s['wrapper-content']}>
        {messages.map((message, index, messages) => (
          <Message
            senderId={message.senderId}
            message={message}
            myId={1}
            nextSenderId={messages[index + 1]?.senderId}
            className={'fm'}
            page={'fms'}
            key={message.id}
          />
        ))}
      </div>
      <div className={s['wrapper-bottom']}>
        {/* <div className={s['input-block']}>
                </div> */}
        <Input
          className="fm-input-send"
          type="text"
          placeholder="Сообщение..."
          inputType="send"
          value={''}
          setValue={() => {}}
          name={''}
        />
      </div>
    </>
  );
};

export default FastMessagesChat;
