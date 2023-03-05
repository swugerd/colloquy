import React, { useEffect, useState } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import ebalo from '../../assets/uploads/test/ebalo.png';
import img from '../../assets/uploads/cool.jpg';
import cat from '../../assets/uploads/test/cat.webp';
import video from '../../assets/videos/video.mp4';
import video2 from '../../assets/videos/video2.mp4';
import video3 from '../../assets/videos/video3.mp4';
import audio from '../../assets/sounds/cq.mp3';
import paperClipSvg from '../../assets/img/icons/paperclip.svg';
import createChatSvg from '../../assets/img/icons/create-chat.svg';
import s from './Messages.module.scss';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import FastMessagesChat from '../../components/FastMessages/FastMessagesDropDown/FastMessagesChat/FastMessagesChat';
import Message from '../../components/Message/Message';
import useWindowSize from '../../hooks/useWindowResize';
import { useAppDispatch } from '../../redux/store';
import { setChatId } from '../../redux/mobile/slice';
import { Message as MessageType } from '../../types';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';

type MessagesProps = {
  isChatSelected: boolean;
};

const Messages: React.FC<MessagesProps> = ({ isChatSelected }) => {
  useSetPageTitle('Сообщения');
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myId = 1;
  const firstUser = 2;
  const secondUser = 3;
  const thirdUser = 4;
  const fourthUser = 5;
  const fifthUser = 6;
  const sixthUser = 7;
  const seventhUser = 8;

  const hasAnimation = true;

  const chats: {
    chatId: number;
    userId: number;
    messages: MessageType[];
  }[] = [
    {
      chatId: 1,
      userId: firstUser,
      messages: [
        {
          id: 1,
          senderId: firstUser,
          forwardMessage: { id: 2, messageId: 2 },
          message:
            'dsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdshakdashkdsbajkdashkjdsha',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 2,
          senderId: firstUser,
          message: '',
          forwardMessage: { id: 1, messageId: 1 },
          images: [
            { id: 1, img },
            { id: 2, img },
            { id: 3, img },
            { id: 4, img },
            { id: 5, img },
            { id: 6, img },
          ],
          videos: [
            { id: 1, video },
            { id: 2, video },
            { id: 3, video },
          ],
          audios: [
            {
              id: 1,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
            {
              id: 2,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
            {
              id: 3,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
            {
              id: 4,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
            {
              id: 5,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
            {
              id: 6,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
          ],
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 3,
          senderId: myId,
          message: 'у меня всё хорошо',
          audios: [
            {
              id: 3,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
          ],
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 4,
          senderId: myId,
          message: 'а че бро',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 5,
          senderId: firstUser,
          message: 'ыыыыыыыыыы',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 6,
          senderId: firstUser,
          message: 'ладно тогда делай не отвлекаю!',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 7,
          senderId: myId,
          message: 'я просто что-то пишу!',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 8,
          senderId: myId,
          message: 'пошли в апекс играть е',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 9,
          senderId: myId,
          message: 'почему меня игнорируют(',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 10,
          senderId: firstUser,
          message: 'lf ,kz ye gbpltw ejhjxt ) sjn nde sjn b ;bdtv)',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 11,
          senderId: firstUser,
          message:
            'Kdjsakldj kajsdkl jskadj ksajd ksajd ksad sahjdh sjd sajhd sjadh ksjahdsahdj hjkd shajd hsajd hajsdh asjdh jashdjk a hjddgasj hdjsa hdjsa h dksja   jdaksjl dksa jldsajdk sajld sjadk sakd jsa dkjsakl djaskld sjadk jsal jsakd jsakd ljsalkd jsd jaskld jaskld jaskdjaskdj asklj askdj ask',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
      ],
    },
    {
      chatId: 2,
      userId: secondUser,
      messages: [
        {
          id: 1,
          senderId: secondUser,
          message: 'Здароыв ролег есть деловок е пркдложение',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 2,
          senderId: myId,
          message: 'трусы авито?',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 3,
          senderId: secondUser,
          message:
            'Не)ю=ЮБЬТ, ебани мне там этот ну типа сайтик простой там главное чтобы вот эта хуйня рвботала ну  админ там бля рег авт нцу ты апонол',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 4,
          senderId: myId,
          message: 'пиздец',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 5,
          senderId: myId,
          message: 'ну давай обсудим всё, договоримся)',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 6,
          senderId: secondUser,
          message: '1500 ustroit?',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
        {
          id: 7,
          senderId: myId,
          message: 'знакомая ситуация)',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
        {
          id: 8,
          senderId: myId,
          message: 'ну я думаю, да) успешно)',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
      ],
    },
    {
      chatId: 3,
      userId: thirdUser,
      messages: [
        {
          id: 1,
          senderId: thirdUser,
          message: 'ку',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: true,
        },
        {
          id: 2,
          senderId: myId,
          message: 'даров броу',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: true,
        },
      ],
    },
    {
      chatId: 4,
      userId: fourthUser,
      messages: [
        {
          id: 1,
          senderId: myId,
          message: 'ку',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
      ],
    },
    {
      chatId: 5,
      userId: fifthUser,
      messages: [
        {
          id: 1,
          senderId: myId,
          message: 'выфолвыфолвдыф',
          images: [
            { id: 1, img: cat },
            { id: 2, img },
          ],
          videos: [
            { id: 1, video },
            // { id: 2, video: video2 },
            // { id: 3, video: video3 },
          ],
          audios: [
            {
              id: 1,
              audio,
              time: 123,
              name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
              author: 'NaRk0PaShOk21rus',
            },
          ],
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
        },
      ],
    },
    {
      chatId: 6,
      userId: sixthUser,
      messages: [
        {
          id: 1,
          senderId: myId,
          message: 'ку',
          timestamp: new Date().toTimeString().split(' ')[0].slice(0, 5),
          unread: false,
        },
      ],
    },
  ];

  const { width } = useWindowSize();

  const forwardMessage = (message: any, fromChat: any, toChat: any) => {
    // Retrieve the original message
    let originalMessage = fromChat.messages.find((m: any) => m.id === message.id);

    // Create a new message object
    let forwardedMessage = {
      id: new Date(),
      sender: originalMessage.sender,
      message: originalMessage.message,
      timestamp: originalMessage.timestamp,
      isForwarded: true,
    };

    // Append the new message object to the target chat
    toChat.messages.push(forwardedMessage);
  };

  const countUnreadMessages = (messages: any) => {
    let unreadCount = 0;
    messages.forEach((message: any) => {
      if (message.unread) {
        unreadCount++;
      }
    });
    return unreadCount;
  };

  const getLastMessage = (chat: {
    chatId: number;
    userId: number;
    messages: {
      id: number;
      senderId: number;
      message?: string;
      images?: { id: number; img: string }[];
      videos?: { id: number; video: string }[];
      audios?: { id: number; audio: string; time: number; name: string; author: string }[];
      timestamp: string;
      unread?: boolean;
    }[];
  }) => chat.messages[chat.messages.length - 1];

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      navigate('/messages');
    }
  };

  useEffect(() => {
    if (chatId) document.addEventListener('keydown', handleKeyPress);
    if (chatId && width <= 1150) {
      dispatch(setChatId(parseInt(chatId)));
    } else {
      dispatch(setChatId(0));
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      dispatch(setChatId(0));
    };
  }, [chatId]);

  const hasMediaToUpload = true;

  return (
    <div className={`${s['messages']} ${chatId ? s['selected'] : ''}`}>
      {chatId && width <= 1150 ? null : (
        <div className={s['chats']}>
          <div className={s['top']}>
            <Input
              className={'messages'}
              placeholder={'Поиск собеседника'}
              type={'text'}
              inputType={'search'}
            />
            <button className={s['create-chat']}>
              <Icon src={createChatSvg} id={'createChat'} className={'create-chat'} />
            </button>
          </div>
          <ul className={s['messages-list']}>
            {chats.map(({ chatId, userId }, index) => (
              <li className={s['chat-item']} key={chatId}>
                <NavLink
                  to={`/messages/${chatId}`}
                  className={({ isActive }) =>
                    isActive ? `${s['active']} ${s['chat-link']}` : s['chat-link']
                  }>
                  <>
                    <HeaderAvatar
                      className={'chat-avatar'}
                      img={ebalo}
                      title={'user'}
                      indicatorClass={['md-indicator', 'border-sub-bg']}
                      onlineType={'pc-online'}
                      hasAnimation={hasAnimation}
                    />
                    <div className={s['chat-info']}>
                      <div className={s['info-top']}>
                        <span className={s['user-name']}>{userId}</span>
                        <span className={s['message-time']}>
                          <>{getLastMessage(chats[index]).timestamp}</>
                        </span>
                      </div>
                      <div className={s['info-bottom']}>
                        <div className={s['last-wrapper']}>
                          {getLastMessage(chats[index]).senderId === myId && <span>Вы:</span>}
                          <p className={s['last-message']}>
                            {getLastMessage(chats[index]).message
                              ? getLastMessage(chats[index]).message
                              : (getLastMessage(chats[index]).images &&
                                  getLastMessage(chats[index]).videos) ||
                                (getLastMessage(chats[index]).images &&
                                  getLastMessage(chats[index]).audios) ||
                                (getLastMessage(chats[index]).videos &&
                                  getLastMessage(chats[index]).audios)
                              ? 'Медиа'
                              : getLastMessage(chats[index]).images
                              ? 'Фото'
                              : getLastMessage(chats[index]).videos
                              ? 'Видео'
                              : getLastMessage(chats[index]).audios
                              ? 'Аудио'
                              : ''}
                          </p>
                        </div>
                        {countUnreadMessages(chats[index].messages) !== 0 && (
                          <div className={s['unread-messages']}>
                            {countUnreadMessages(chats[index].messages)}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {chatId ? (
        <div className={s['dialog']}>
          <div className={s['dialog-top']}>
            <div className={s['dialog-avatar']}>
              <img src={ebalo} alt="user" />
            </div>
            <span className={s['dialog-name']}>{chatId}</span>
            <span className={s['dialog-online']}>В сети</span>
            <button className={s['paperclip']}>
              <Icon src={paperClipSvg} id={'paperclip'} className={'gray'} />
            </button>
          </div>
          <div className={s['dialog-inner']}>
            <div className={s['messages-wrapper']}>
              {chatId &&
                chats
                  .find((chat) => chat.chatId === parseInt(chatId))
                  ?.messages.map((chat, index, messages) => (
                    <Message
                      senderId={chat.senderId}
                      message={chat}
                      myId={myId}
                      nextSenderId={messages[index + 1]?.senderId}
                      className={'messages-page'}
                      key={chat.id}
                      page={'messages'}
                    />
                  ))}
            </div>
            <Input
              className={'send-message'}
              placeholder={'Введите сообщение'}
              type={'text'}
              inputType={'send'}
              page="message"
              isTextarea={true}
              classOptions={{
                paperclipIcon: 'message-paperclip',
                smileIcon: 'message-smile',
                sendIcon: 'message-send',
              }}
            />
            {hasMediaToUpload && <MediaToUpload className={'message-page'} />}
          </div>
        </div>
      ) : (
        <p className={s['nothing-dialog']}>Выберите чат, чтобы начать общение</p>
      )}
    </div>
  );
};

export default Messages;
