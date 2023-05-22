import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsHeaderShow, setTitle } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';
import uploadSvg from '../../assets/img/icons/upload.svg';
import backSvg from '../../assets/img/icons/back.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import addSvg from '../../assets/img/icons/add.svg';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setIsMediaListModalOpen, setMediaListModalType } from '../../redux/modal/slice';
import { useAxios } from '../../hooks/useAxios';
import { selectIsAuth } from '../../redux/auth/selector';
import { User } from '../../hooks/useAuth';
import axios from 'axios';

const MobileHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { mobile } = useSelector(selectMobile);
  const navigate = useNavigate();

  const [isSideContentActive, setIsSideContentActive] = useState(false);

  const arrowHandler = () => {
    dispatch(setIsHeaderShow(!mobile.isHeaderShow));
    setIsSideContentActive(!isSideContentActive);
  };

  const handleModalOpen = (e: any, modalType: 'media' | 'info') => {
    e.stopPropagation();
    dispatch(setIsMediaListModalOpen(true));
    dispatch(setMediaListModalType(modalType));
  };

  useEffect(() => {
    dispatch(setTitle(document.title));
  }, [mobile]);

  const isDisscusion = true;

  const { pathname } = useLocation();

  const userRoute = pathname.split('/')[pathname.split('/').length - 1];

  const [chats, setChats] = useState<any>([]);
  const [chatPage, setChatPage] = useState(1);
  const [totalChatCount, setTotalChatCount] = useState(0);
  const limit = 10;

  const {
    response: user,
    error: userError,
    isLoading: isUserLoading,
  }: { response: User; error: any; isLoading: boolean } = useAxios({
    method: 'get',
    url:
      pathname === 'videos' || pathname === 'photos'
        ? `${process.env.REACT_APP_HOSTNAME}/api/users/getByNickname/${userRoute}`
        : '',
  });

  const {
    user: { id: currentUserId },
  } = useSelector(selectIsAuth);

  const getChatsLink = currentUserId
    ? `${process.env.REACT_APP_HOSTNAME}/api/messages/chats/${currentUserId}?page=${chatPage}&limit=${limit}`
    : '';
  useEffect(() => {
    if (getChatsLink) {
      const response = axios.get(getChatsLink).then((response) => {
        setChats([...response.data]);
      });
    }
  }, [getChatsLink]);

  const currentChat =
    mobile.chatId &&
    chats &&
    chats.find(
      (chat: any) =>
        chat.user1_id === Number(mobile.chatId) || chat.user2_id === Number(mobile.chatId),
    );

  const currentChatUser =
    currentChat && currentChat[`user${currentChat.user1_id === currentUserId ? 2 : 1}`];

  useEffect(() => {
    if (!currentChatUser && mobile.chatId) {
      const response = axios
        .get(`${process.env.REACT_APP_HOSTNAME}/api/users/getById/${mobile.chatId}`)
        .then((response) => {
          setPotentialUser(response.data);
        });
    } else {
      setPotentialUser(null);
    }
  }, [mobile.chatId, currentChatUser]);

  const [potentialUser, setPotentialUser] = useState<any>({});

  return width <= 1150 ? (
    <header className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        {!mobile.chatId && !mobile.membersCount && !mobile.hasArrowButton ? (
          <h2 className={s['title']}>{mobile.infoName ? `@${mobile.infoName}` : mobile.title}</h2>
        ) : !mobile.chatId && !mobile.membersCount && mobile.hasArrowButton ? (
          <h2 className={s['title']}>
            <button onClick={arrowHandler}>
              {mobile.infoName ? `@${mobile.infoName}` : mobile.title}
            </button>
          </h2>
        ) : (
          ''
        )}
        {!!mobile.membersCount && (
          <h2 className={s['title']}>
            <button onClick={arrowHandler}>
              Список участников - <span className={s['members']}>{mobile.membersCount}</span>
            </button>
          </h2>
        )}
        {potentialUser ? (
          <>
            <Link className={s['arrow-link']} to="/messages">
              <div className={s['arrow-messages']}>
                <Icon src={backSvg} id={'back'} className={'white'} />
              </div>
            </Link>
            <>
              <Link to={`/profile/${potentialUser?.user_nickname}`} className={s['link']}>
                <div className={s['user-img']}>
                  {potentialUser.user_avatar ? (
                    <img
                      src={`${process.env.REACT_APP_HOSTNAME}/${potentialUser?.user_avatar}`}
                      alt="user"
                    />
                  ) : (
                    ''
                  )}
                </div>
                <span className={s['user-name']}>{potentialUser?.user_name}</span>
              </Link>
              <span className={s['online']}>
                {potentialUser?.online_type !== 'pc-offline' ? 'В сети' : ''}
              </span>
            </>
          </>
        ) : currentChatUser ? (
          <>
            <Link className={s['arrow-link']} to="/messages">
              <div className={s['arrow-messages']}>
                <Icon src={backSvg} id={'back'} className={'white'} />
              </div>
            </Link>
            <>
              <Link to={`/profile/swugerd/${currentChatUser?.user_nickname}`} className={s['link']}>
                <div className={s['user-img']}>
                  {currentChatUser.user_avatar ? (
                    <img
                      src={`${process.env.REACT_APP_HOSTNAME}/${currentChatUser?.user_avatar}`}
                      alt="user"
                    />
                  ) : (
                    ''
                  )}
                </div>
                <span className={s['user-name']}>{currentChatUser?.user_name}</span>
              </Link>
              <span className={s['online']}>
                {' '}
                {currentChatUser?.online_type !== 'pc-offline' ? 'В сети' : ''}
              </span>
            </>
          </>
        ) : (
          ''
        )}
        {mobile.hasArrowButton && (
          <button
            className={`${s['arrow']} ${isSideContentActive ? s['active'] : ''}`}
            onClick={arrowHandler}>
            <Icon src={arrowSvg} id={'arrow'} className={'white'} />
          </button>
        )}
        {!!(mobile.hasAddButton && currentUserId && user && user.id === currentUserId) && (
          <button className={`${s['add']}`} onClick={arrowHandler}>
            <Icon src={addSvg} id={'add'} className={'white'} />
          </button>
        )}
        {mobile.hasUploadButton && width <= 550 && (
          <button className={`${s['upload']}`}>
            <Icon src={uploadSvg} id={'upload'} className={'white'} />
          </button>
        )}
        {mobile.backText && mobile.backButtonType === 'button' && (
          <button className={`${s['back-text']} ${s['margin-auto']}`} onClick={() => navigate(-1)}>
            <div className={s['arrow']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            {width >= 550 && (
              <span className={mobile.membersCount ? s['members-text'] : ''}>
                {mobile.backText}
              </span>
            )}
          </button>
        )}
        {mobile.backText && mobile.backButtonType === 'link' && (
          <Link className={`${s['back-text']} ${s['margin-auto']}`} to={'/groups/colloquy'}>
            <div className={s['arrow']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            {width >= 550 && (
              <span className={mobile.membersCount ? s['members-text'] : ''}>
                {mobile.backText}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
};

export default MobileHeader;
