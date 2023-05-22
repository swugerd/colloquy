import React, { useContext, useEffect, useRef, useState } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import Input from '../../components/UI/Input/Input';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import createChatSvg from '../../assets/img/icons/create-chat.svg';
import s from './Messages.module.scss';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import Message from '../../components/Message/Message';
import useWindowSize from '../../hooks/useWindowResize';
import { useAppDispatch } from '../../redux/store';
import { setChatId } from '../../redux/mobile/slice';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';
import {
  setCreateBaseModalType,
  setIsCreateBaseModalOpen,
  setIsMediaListModalOpen,
  setMediaListModalType,
} from '../../redux/modal/slice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import { SocketContext } from '../../contexts/SocketContext';
import moment from 'moment';

type MessagesProps = {
  isChatSelected: boolean;
};

const Messages: React.FC<MessagesProps> = ({ isChatSelected }) => {
  useSetPageTitle('Сообщения');
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    user: { id: myId },
  } = useSelector(selectIsAuth);

  const hasAnimation = false;

  const handleCreateModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsCreateBaseModalOpen(true));
    dispatch(setCreateBaseModalType('conversation'));
  };

  const handleMediaListModalOpen = (e: any, modalType: 'info' | 'media') => {
    e.stopPropagation();
    dispatch(setIsMediaListModalOpen(true));
    dispatch(setMediaListModalType(modalType));
  };

  const [chatPage, setChatPage] = useState(1);
  const [messagePage, setMessagePage] = useState(1);
  const [totalChatCount, setTotalChatCount] = useState(0);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const limit = 10;
  const [chats, setChats] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  const getChatsLink = myId
    ? `${process.env.REACT_APP_HOSTNAME}/api/messages/chats/${myId}?page=${chatPage}&limit=${limit}`
    : '';

  const getMessagesLink =
    chatId && myId
      ? `${process.env.REACT_APP_HOSTNAME}/api/messages/${chatId}?page=${messagePage}&limit=${limit}&currentUserId=${myId}`
      : '';

  useEffect(() => {
    if (getChatsLink) {
      const response = axios.get(getChatsLink).then((response) => {
        setChats([...response.data]);
      });
    }
  }, [getChatsLink]);

  useEffect(() => {
    if (getMessagesLink) {
      const response = axios.get(getMessagesLink).then((response) => {
        setMessages([...response.data]);
      });
    }
  }, [getMessagesLink]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && messages.length < totalMessageCount) {
        setIsMessagesLoading(true);
      }
    });

    const sentinel = document.querySelector('#sentinel');

    sentinel && observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isMessagesLoading]);

  const { width } = useWindowSize();

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
      setMessages([]);
      setPotentialUser(null);
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

  const hasMediaToUpload = false;

  const currentChat =
    chatId &&
    chats &&
    chats.find((chat: any) => chat.user1_id === Number(chatId) || chat.user2_id === Number(chatId));

  const currentChatUser =
    currentChat && currentChat[`user${currentChat.user1_id === myId ? 2 : 1}`];

  useEffect(() => {
    if (!currentChatUser && chatId) {
      const response = axios
        .get(`${process.env.REACT_APP_HOSTNAME}/api/users/getById/${chatId}`)
        .then((response) => {
          setPotentialUser(response.data);
        });
    } else {
      setPotentialUser(null);
    }
  }, [chatId, currentChatUser]);

  const [potentialUser, setPotentialUser] = useState<any>({});

  const [messageText, setMessageText] = useState({ message_text: '' });

  const handleMessageInput = (fields: any) => {
    setMessageText((prev: any) => {
      return { ...prev, ...fields };
    });
  };

  const socket = useContext(SocketContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (socket && chatId && myId) {
      socket.emit('sendMessage', {
        id: chatId,
        message_text: messageText.message_text,
        currentUserId: myId,
      });
    }
    setMessageText({ message_text: '' });
  };

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('joinRoom', chatId);
      socket.on('sendMessage', (data) => {
        if (data.chat) {
          setChats((prevChats: any) => {
            return [...prevChats, data.chat];
          });
        }
        setMessages((prevMessages: any) => {
          return [...prevMessages, data.createdMessage];
        });
      });
      return () => {
        socket.emit('leaveRoom', chatId);
        socket.off('sendMessage');
      };
    }
  }, [socket, chatId]);

  const messagesContainerRef = useRef<any>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
              name={''}
              value={''}
              setValue={() => {}}
            />
            {/* <button className={s['create-chat']} onClick={(e) => handleCreateModalOpen(e)}>
              <Icon src={createChatSvg} id={'createChat'} className={'create-chat'} />
            </button> */}
          </div>
          <ul className={s['messages-list']}>
            {chats &&
              chats.map((chat: any, index: number) => (
                <li className={s['chat-item']} key={chat.id}>
                  <NavLink
                    to={`/messages/${chat[`user${chat.user1_id === myId ? 2 : 1}`].id}`}
                    className={({ isActive }) =>
                      isActive ? `${s['active']} ${s['chat-link']}` : s['chat-link']
                    }>
                    <>
                      <HeaderAvatar
                        className={'chat-avatar'}
                        img={chat[`user${chat.user1_id === myId ? 2 : 1}`].user_avatar}
                        title={chat[`user${chat.user1_id === myId ? 2 : 1}`].user_name}
                        indicatorClass={['md-indicator', 'border-sub-bg']}
                        onlineType={chat[`user${chat.user1_id === myId ? 2 : 1}`].online_type}
                        hasAnimation={hasAnimation}
                      />
                      <div className={s['chat-info']}>
                        <div className={s['info-top']}>
                          <span className={s['user-name']}>
                            {chat[`user${chat.user1_id === myId ? 2 : 1}`].user_name}
                          </span>
                          <span className={s['message-time']}>
                            <>
                              {moment(chat.messages[chat.messages.length - 1]?.createdAt).format(
                                'HH:mm',
                              )}
                            </>
                          </span>
                        </div>
                        <div className={s['info-bottom']}>
                          <div className={s['last-wrapper']}>
                            {chat.messages[chat.messages.length - 1].sender_id === myId && (
                              <span>Вы:</span>
                            )}
                            <p className={s['last-message']}>
                              {chat.messages[chat.messages.length - 1].sender_id === myId &&
                                chat.messages[chat.messages.length - 1].message_text}
                            </p>
                          </div>
                          {/* {countUnreadMessages(chats[index].messages) !== 0 && (
                          <div className={s['unread-messages']}>
                            {countUnreadMessages(chats[index].messages)}
                          </div>
                        )} */}
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
            {potentialUser ? (
              <>
                <Link className={s['link']} to={`/profile/${potentialUser?.user_nickname}`}>
                  <div className={s['dialog-avatar']}>
                    {potentialUser.user_avatar ? (
                      <img
                        src={`${process.env.REACT_APP_HOSTNAME}/${potentialUser.user_avatar}`}
                        alt="user"
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <span className={s['dialog-name']}>{potentialUser?.user_name}</span>
                </Link>
                <span className={s['dialog-online']}>
                  {potentialUser?.online_type !== 'pc-offline' ? 'В сети' : ''}
                </span>
              </>
            ) : (
              <>
                <Link className={s['link']} to={`/profile/${currentChatUser?.user_nickname}`}>
                  <div className={s['dialog-avatar']}>
                    <img
                      src={`${process.env.REACT_APP_HOSTNAME}/${currentChatUser?.user_avatar}`}
                      alt="user"
                    />
                  </div>
                  <span className={s['dialog-name']}>{currentChatUser?.user_name}</span>
                </Link>
                <span className={s['dialog-online']}>
                  {currentChatUser?.online_type !== 'pc-offline' ? 'В сети' : ''}
                </span>
              </>
            )}
          </div>
          <div className={s['dialog-inner']}>
            <div className={s['messages-wrapper']} ref={messagesContainerRef}>
              {messages &&
                messages.map((message: any, index: number, messages: any) => (
                  <Message
                    senderId={message.sender_id}
                    message={message}
                    myId={myId}
                    nextSenderId={messages[index + 1]?.sender_id}
                    className={'messages-page'}
                    key={message.id}
                    page={'messages'}
                    setMessages={setMessages}
                    messages={messages}
                    chatId={Number(chatId)}
                  />
                ))}
              {messages && messages.length ? <div id="sentinel" /> : ''}
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                className={'send-message'}
                placeholder={'Введите сообщение'}
                type={'text'}
                inputType={'send'}
                page="message"
                isTextarea={true}
                name={'message_text'}
                value={messageText.message_text}
                setValue={handleMessageInput}
                classOptions={{
                  paperclipIcon: 'message-paperclip',
                  smileIcon: 'message-smile',
                  sendIcon: 'message-send',
                }}
              />
            </form>
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
