import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsHeaderShow, setTitle } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';
import uploadSvg from '../../assets/img/icons/upload.svg';
import backSvg from '../../assets/img/icons/back.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import ebalo from '../../assets/uploads/test/ebalo.png';
import addSvg from '../../assets/img/icons/add.svg';
import paperclipSvg from '../../assets/img/icons/paperclip.svg';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setIsMediaListModalOpen, setMediaListModalType } from '../../redux/modal/slice';
import { useAxios } from '../../hooks/useAxios';
import { selectIsAuth } from '../../redux/auth/selector';
import { User } from '../../hooks/useAuth';

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

  const {
    response: user,
    error: userError,
    isLoading: isUserLoading,
  }: { response: User; error: any; isLoading: boolean } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/users/getByNickname/${userRoute}`,
  });
  const {
    user: { id: currentUserId },
  } = useSelector(selectIsAuth);

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
        {!!mobile.chatId && (
          <>
            <Link className={s['arrow-link']} to="/messages">
              <div className={s['arrow-messages']}>
                <Icon src={backSvg} id={'back'} className={'white'} />
              </div>
            </Link>
            {isDisscusion ? (
              <button className={s['link']} onClick={(e) => handleModalOpen(e, 'info')}>
                <div className={s['user-img']}>
                  <img src={ebalo} alt="user" />
                </div>
                <span className={s['user-name']}>{mobile.chatId}</span>
              </button>
            ) : (
              <>
                <Link to={'/profile/swugerd'} className={s['link']}>
                  <div className={s['user-img']}>
                    <img src={ebalo} alt="user" />
                  </div>
                  <span className={s['user-name']}>{mobile.chatId}</span>
                </Link>
                <span className={s['online']}>В сети</span>
              </>
            )}
            <button className={s['paperclip']} onClick={(e) => handleModalOpen(e, 'media')}>
              <Icon src={paperclipSvg} id={'paperclip'} className={'white'} />
            </button>
          </>
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
