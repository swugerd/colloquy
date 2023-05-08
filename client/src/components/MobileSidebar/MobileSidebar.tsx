import React, { useEffect, useRef } from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './MobileSidebar.module.scss';
import friendSvg from '../../assets/img/icons/friends.svg';
import circlesSvg from '../../assets/img/icons/circles.svg';
import voicesSvg from '../../assets/img/icons/voices.svg';
import photosSvg from '../../assets/img/icons/photos.svg';
import videosSvg from '../../assets/img/icons/videos.svg';
import achievementSvg from '../../assets/img/icons/achieve.svg';
import shopSvg from '../../assets/img/icons/shop.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import notifySvg from '../../assets/img/icons/notify.svg';
import switchAccSvg from '../../assets/img/icons/switch-acc.svg';
import exitSvg from '../../assets/img/icons/exit.svg';
import settingsSvg from '../../assets/img/icons/settings.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import img from '../../assets/uploads/test/ebalo.png';
import { Link, NavLink } from 'react-router-dom';
import Notify from '../UI/Notify/Notify';
import { useSelector } from 'react-redux';
import { setIsAuth, setUserId, setUserName, setUserNickname } from '../../redux/auth/slice';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsSidebarShow } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';
import useAuth from '../../hooks/useAuth';
import { selectIsAuth } from '../../redux/auth/selector';

const MobileSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { mobile } = useSelector(selectMobile);

  const closeHander = () => {
    dispatch(setIsSidebarShow(false));
  };

  const { logout, user, isLoading } = useAuth();

  const {
    user: { nickname: userNickname, name: userName },
  } = useSelector(selectIsAuth);

  useEffect(() => {
    if (mobile.isSidebarShow) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [mobile.isSidebarShow, isLoading]);

  const links = [
    {
      id: 1,
      iconSettings: {
        src: friendSvg,
        iconId: 'friends',
        className: 'mobile-img',
        hoverClass: 'friends',
      },
      text: 'Друзья',
      path: 'friends',
    },
    {
      id: 2,
      iconSettings: {
        src: circlesSvg,
        iconId: 'circles',
        className: 'mobile-img',
        hoverClass: 'circles',
      },
      text: 'Кружочки',
      path: 'circles',
    },
    {
      id: 3,
      iconSettings: {
        src: voicesSvg,
        iconId: 'voices',
        className: 'mobile-img',
        hoverClass: 'voices',
      },
      text: 'Войсы',
      path: 'voices',
    },
    {
      id: 4,
      iconSettings: {
        src: photosSvg,
        iconId: 'photos',
        className: 'mobile-img',
        hoverClass: 'photos',
      },
      text: 'Фотографии',
      path: 'photos',
    },
    {
      id: 5,
      iconSettings: {
        src: videosSvg,
        iconId: 'videos',
        className: 'mobile-img',
        hoverClass: 'videos',
      },
      text: 'Видео',
      path: 'videos',
    },
    {
      id: 6,
      iconSettings: {
        src: achievementSvg,
        iconId: 'achieve',
        className: 'mobile-img',
        hoverClass: 'achieve',
      },
      text: 'Достижения',
      path: 'achievements',
    },
    {
      id: 7,
      iconSettings: {
        src: shopSvg,
        iconId: 'shop',
        className: 'mobile-img',
        hoverClass: 'shop',
      },
      text: 'Магазин',
      path: 'shop',
    },
  ];

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(setUserNickname(user?.user_nickname));
      dispatch(setUserId(user?.id));
      dispatch(setUserName(user?.user_name));
    }
  }, [isLoading]);

  const handleLogOut = () => {
    localStorage.removeItem('jwtToken');
    logout();
  };

  return width <= 1150 ? (
    <div className={`${s['wrapper']} ${mobile.isSidebarShow ? s['active'] : ''}`}>
      <div className={s['top']}>
        <Link
          to={`/profile/${user && !isLoading && userNickname}`}
          className={s['profile-link']}
          onClick={closeHander}>
          <HeaderAvatar
            className={'mobile-sidebar'}
            img={!isLoading && user ? user.user_avatar : 'Загрузка'}
            title={!isLoading && user ? user.user_name : ''}
            onlineType={!isLoading && user ? user.online_type : ''}
            indicatorClass={[`${width >= 550 ? 'lg-indicator' : 'md-indicator'}`, 'border-sub-bg']}
          />
          <div className={s['info']}>
            <span className={s['name']}>{!isLoading && user ? `${userName}` : 'Загрузка'}</span>
            <p className={s['status']}>{!isLoading && user ? user.user_status : 'Загрузка'}</p>
          </div>
        </Link>
        <div className={s['actions']} onClick={closeHander}>
          <Link to="/settings" className={s['settings']}>
            <Icon src={settingsSvg} id={'settings'} className={'mobile-settings'} />
          </Link>
        </div>
      </div>
      <div className={s['main']}>
        <nav className={s['sidebar-nav']}>
          <ul className={s['main-list']}>
            {links.map(({ id, iconSettings, text, path }) => (
              <li className={s['nav-item']} key={id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${s['active']} ${s['nav-link']}` : s['nav-link']
                  }
                  children={({ isActive }) => (
                    <>
                      <Icon
                        src={iconSettings.src}
                        id={iconSettings.iconId}
                        className={iconSettings.className}
                        hoverClass={iconSettings.hoverClass}
                        isActive={isActive ? true : false}
                      />
                      <span className={s['text']}>{text}</span>
                      <Icon src={arrowSvg} id={'arrow'} className={'mobile-sidebar-arrow'} />
                    </>
                  )}
                  onClick={closeHander}
                  to={`/${path}`}
                />
              </li>
            ))}
          </ul>
          <ul className={s['sub-list']}>
            <li className={s['nav-item']}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${s['active']} ${s['nav-link']}` : s['nav-link']
                }
                children={({ isActive }) => (
                  <>
                    <div className={s['nav-img']}>
                      <Icon
                        src={notifySvg}
                        id={'notify'}
                        className={'mobile-img'}
                        hoverClass={'notify'}
                        isActive={isActive ? true : false}
                      />
                      <Notify cName={'mobile-sidebar'} count={1} hasImage={false} />
                    </div>
                    <span className={s['text']}>Уведомления</span>
                  </>
                )}
                onClick={closeHander}
                to={'/notifies'}
              />
            </li>
            <li className={s['nav-item']}>
              <Link className={s['nav-link']} to="/" onClick={() => dispatch(setIsAuth(false))}>
                <div className={`${s['nav-img']} ${s['switch-acc']}`}>
                  <Icon src={switchAccSvg} id={'switchAcc'} className={''} />
                </div>
                <span className={s['text']}>Смена аккаунта</span>
              </Link>
            </li>
            <li className={s['nav-item']}>
              <Link className={s['nav-link']} to="/" onClick={handleLogOut}>
                <div className={`${s['nav-img']} ${s['exit']}`}>
                  <Icon src={exitSvg} id={'exit'} className={''} />
                </div>
                <span className={s['text']}>Выйти</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className={s['close']} onClick={() => dispatch(setIsSidebarShow(false))}>
          <Icon src={closeSvg} id={'close'} className={'white'} />
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MobileSidebar;
