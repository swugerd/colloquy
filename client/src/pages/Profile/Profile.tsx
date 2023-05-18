import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Profile.module.scss';
import moreSvg from '../../assets/img/icons/dots.svg';
import chatSvg from '../../assets/img/icons/chat.svg';
import addSvg from '../../assets/img/icons/add.svg';
import markSvg from '../../assets/img/icons/markdown.svg';
import blockSvg from '../../assets/img/icons/block.svg';
import { useAppDispatch } from './../../redux/store';
import { setChatId, setIsInfoName } from '../../redux/mobile/slice';
import Wall from '../../components/Wall/Wall';
import ava from '../../assets/uploads/ava.png';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import useWindowSize from './../../hooks/useWindowResize';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import Icon from '../../components/UI/Icon/Icon';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import useAuth, { User } from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import Preloader from '../../components/Preloader/Preloader';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import axios from 'axios';

const Profile: React.FC = () => {
  const { user: currentUser, isLoading: isCurrentUserLoading } = useAuth();

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { username } = useParams();
  const { width } = useWindowSize();

  const profileRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  const userRoute = pathname.split('/')[pathname.split('/').length - 1];

  useEffect(() => {
    window.scrollTo(0, 0);

    // при скролле вниз давать fixed bottom 0
    // при скролле вверх давать relative и margin/paddin top относительно того насколько вниз я наскролил
    // при скролле вверх, дойдя до начала блока профиля дать fixed и top 0

    // const handleScroll = (e: Event) => {
    //   const profileBlock = profileRef.current;
    //   const profileBlockHeight = profileBlock && profileBlock.getBoundingClientRect().height;
    //   const scrollPosition = window.scrollY;

    //   if (profileBlockHeight) {
    //     if (scrollPosition > profileBlockHeight / 2) {
    //       if (scrollPosition > profileBlockHeight / 2 && scrollDirection !== 'up') {
    //         setIsSticky(true);
    //         setScrollDirection('down');
    //       } else if (scrollPosition < profileBlockHeight / 2 && scrollDirection !== 'down') {
    //         setIsSticky(false);
    //         setScrollDirection('up');
    //       }
    //     } else {
    //       setIsSticky(false);
    //       setScrollDirection('down');
    //     }
    //   }
    // };

    // window.addEventListener('scroll', (e) => handleScroll(e));

    if (username) {
      dispatch(setIsInfoName(username));
      dispatch(setChatId(0));
    }
    return () => {
      dispatch(setIsInfoName(''));
      // window.removeEventListener('scroll', (e) => handleScroll(e));
    };
  }, [userRoute]);

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const music: { id: number; img: string; name: string; author: string }[] = [
    {
      id: 1,
      img: ava,
      name: 'трек трек трек трек трек трек трек',
      author: 'фредбер медведь вырфо вырфо',
    },
    { id: 2, img: ava, name: 'трек', author: 'фредбер медведь вырфо' },
    { id: 3, img: ava, name: 'трек', author: 'фредбер медведь вырфо' },
    { id: 4, img: ava, name: 'трек', author: 'фредбер медведь вырфо' },
    { id: 5, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 6, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 7, img: ava, name: 'трек', author: 'фредбер медведь' },
  ];

  const { response, error, isLoading } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/users/getByNickname/${userRoute}`,
  });

  const user: User | {} = !isLoading && response ? response : {};

  useSetPageTitle(
    response ? `${response.user_name} ${response.user_surname}` : 'Пользователь не найден',
    response,
  );

  const {
    response: groups,
    isLoading: isGroupsLoading,
    error: groupsError,
  } = useAxios({
    method: 'get',
    url: (user as User).id
      ? `${process.env.REACT_APP_HOSTNAME}/api/groups/${(user as User).id}`
      : '',
  });

  const {
    response: requests,
    error: requestsError,
    isLoading: isRequestsLoading,
  } = useAxios({
    method: 'get',
    url:
      currentUser && (user as User).id && currentUser.id !== (user as User).id
        ? `${process.env.REACT_APP_HOSTNAME}/api/friends/req/${currentUser.id}?userId=${
            (user as User)?.id
          }`
        : '',
  });

  const {
    response: friends,
    error: friendsError,
    isLoading: isFriendsLoading,
  } = useAxios({
    method: 'get',
    url:
      currentUser && (user as User).id
        ? `${process.env.REACT_APP_HOSTNAME}/api/friends/${(user as User).id}
          `
        : '',
  });

  const {
    response: photos,
    error: photosError,
    isLoading: isPhotosLoading,
  } = useAxios({
    method: 'get',
    url: Object.entries(user).length
      ? `${process.env.REACT_APP_HOSTNAME}/api/photos/${(user as User).id}?type=user`
      : '',
  });

  const {
    response: videos,
    error: videosError,
    isLoading: isVideosLoading,
  } = useAxios({
    method: 'get',
    url: Object.entries(user).length
      ? `${process.env.REACT_APP_HOSTNAME}/api/videos/${(user as User).id}?type=user`
      : '',
  });

  const createFriendReq = async () => {
    const response =
      currentUser && !isCurrentUserLoading && user
        ? await axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOSTNAME}/api/friends/req/${currentUser.id}`,
            data: {
              user_income_id: (user as User).id,
            },
          })
        : '';
    setActionIcon(null);
  };

  const addFriend = async () => {
    if (currentUser && user) {
      const response: any = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/${currentUser.id}`,
        data: {
          user2_id: (user as User).id,
        },
      });
    }
    setActionIcon(null);
  };

  const [actionIcon, setActionIcon] = useState<{
    id: string;
    icon: string;
    func: () => void;
  } | null>(null);

  useEffect(() => {
    if (currentUser && requests?.user_income_id === currentUser.id) {
      setActionIcon({
        icon: markSvg,
        id: 'markdown',
        func: addFriend,
      });
    }

    if (
      currentUser &&
      friends &&
      !friends?.some(
        (item: any) => item.user1_id === currentUser.id || item.user2_id === currentUser.id,
      ) &&
      requests?.user_income_id !== currentUser.id &&
      requests?.user_outcome_id !== currentUser.id
    ) {
      setActionIcon({
        icon: addSvg,
        id: 'add',
        func: createFriendReq,
      });
    }

    if (user && currentUser && currentUser.id === (user as User).id) {
      setActionIcon(null);
    }
  }, [friends, requests, currentUser]);

  const isAdmin = userRoute === currentUser?.user_nickname ? true : false;

  const formatPhoneNumber = (number: number) => {
    const regex = /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/;
    return String(number).replace(regex, '+$1 ($2) $3-$4-$5');
  };

  if (!isLoading && !Object.keys(user).length && !isAdmin) {
    return <NotFoundBlock className={'profile'} text={'Пользователь не найден'} />;
  }

  return !isLoading &&
    !isCurrentUserLoading &&
    !isFriendsLoading &&
    !isPhotosLoading &&
    !isGroupsLoading ? (
    <>
      <div className={`${s['profile']} ${isSticky ? s['sticky'] : ''}`} ref={profileRef}>
        <div className={`${s['left']}`}>
          <div className={s['mobile-info']}>
            <div className={s['avatar']}>
              <img
                src={`${process.env.REACT_APP_HOSTNAME}/${
                  isAdmin ? currentUser?.user_avatar : (user as User).user_avatar
                }`}
                alt="ava"
              />
            </div>
            {width <= 1150 && (
              <div className={s['info']}>
                <div className={s['main-info']}>
                  <div>
                    <h4 className={s['user-name']}>
                      {isAdmin
                        ? `${currentUser?.user_name} ${currentUser?.user_surname}`
                        : `${(user as User).user_name} ${(user as User).user_surname}`}
                    </h4>
                    <p className={s['status']}>
                      {isAdmin ? currentUser?.user_status : (user as User).user_status}
                    </p>
                  </div>
                  {!isAdmin && (
                    <div className={s['more']}>
                      <button
                        className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
                        onClick={() => setIsActionsOpen(!isActionsOpen)}>
                        <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
                      </button>
                      <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                        <SquareButton className={'more-btn'} icon={chatSvg} id={'messages'} />
                        {actionIcon && (
                          <SquareButton
                            className={'more-btn'}
                            icon={actionIcon.icon}
                            id={actionIcon.id}
                            onClick={actionIcon.func}
                          />
                        )}
                        <SquareButton className={'more-btn'} icon={blockSvg} id={'block'} />
                      </div>
                    </div>
                  )}
                </div>
                {width > 550 && (
                  <div className={s['sub-info']}>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Дата рождения:</div>
                      <div className={s['option-data']}>
                        {isAdmin
                          ? new Date(
                              currentUser ? currentUser.user_birthdate : '',
                            ).toLocaleDateString('ru-ru')
                          : new Date((user as User).user_birthdate).toLocaleDateString('ru-ru')}
                      </div>
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Город:</div>
                      <div className={s['option-data']}>
                        {isAdmin && currentUser
                          ? currentUser.city === null
                            ? 'Не указан'
                            : currentUser.city?.city_name
                          : (user as User).city === null
                          ? 'Не указан'
                          : (user as User).city?.city_name}
                      </div>
                    </div>
                    {isInfoOpen && (
                      <>
                        <button className={s['unwrap-button']} onClick={() => setIsInfoOpen(false)}>
                          Скрыть
                        </button>
                        <div className={s['unwrapped-block']}>
                          <div className={s['separator']}></div>
                          <h6 className={s['unwrapperd-title']}>Контакты</h6>
                          <div className={s['separator']}></div>
                          <div className={s['info-option']}>
                            <div className={s['option-title']}>Моб. телефон:</div>
                            {isAdmin && currentUser ? (
                              currentUser.user_phone === null ? (
                                <div className={s['option-data']}>Не указан</div>
                              ) : (
                                <a
                                  href={`tel:${currentUser.user_phone}`}
                                  className={s['option-unwrapped-data']}>
                                  {formatPhoneNumber(Number(currentUser.user_phone))}
                                </a>
                              )
                            ) : (user as User).user_phone === null ? (
                              <div className={s['option-data']}>Не указан</div>
                            ) : (
                              <a
                                href={`tel:${(user as User).user_phone}`}
                                className={s['option-unwrapped-data']}>
                                {formatPhoneNumber(Number((user as User).user_phone))}
                              </a>
                            )}
                          </div>
                          <div className={s['info-option']}>
                            <div className={s['option-title']}>Доп. телефон:</div>
                            {isAdmin && currentUser ? (
                              currentUser.user_sub_phone === null ? (
                                <div className={s['option-data']}>Не указан</div>
                              ) : (
                                <a
                                  href={`tel:${currentUser.user_sub_phone}`}
                                  className={s['option-unwrapped-data']}>
                                  {formatPhoneNumber(Number(currentUser.user_sub_phone))}
                                </a>
                              )
                            ) : (user as User).user_sub_phone === null ? (
                              <div className={s['option-data']}>Не указан</div>
                            ) : (
                              <a
                                href={`tel:${(user as User).user_sub_phone}`}
                                className={s['option-unwrapped-data']}>
                                {formatPhoneNumber(Number((user as User).user_sub_phone))}
                              </a>
                            )}
                          </div>
                          <div className={s['info-option']}>
                            <div className={s['option-title']}>Телеграм:</div>
                            {isAdmin && currentUser ? (
                              currentUser.user_telegram === null ? (
                                <div className={s['option-data']}>Не указан</div>
                              ) : (
                                <a
                                  className={s['option-unwrapped-data']}
                                  href={`https://t.me/${currentUser.user_telegram}`}
                                  target="_blank"
                                  rel="noreferrer">
                                  @{currentUser.user_telegram}
                                </a>
                              )
                            ) : (user as User).user_telegram === null ? (
                              <div className={s['option-data']}>Не указан</div>
                            ) : (
                              <a
                                className={s['option-unwrapped-data']}
                                href={`https://t.me/${(user as User).user_telegram}`}
                                target="_blank"
                                rel="noreferrer">
                                @{(user as User).user_telegram}
                              </a>
                            )}
                          </div>
                        </div>
                        {isAdmin && currentUser ? (
                          currentUser.user_about === null ? (
                            ''
                          ) : (
                            <div className={s['unwrapped-block']}>
                              <div className={s['separator']}></div>
                              <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                                О себе
                              </h6>
                              <div className={s['separator']}></div>
                              <p className={s['about']}>{currentUser.user_about}</p>
                            </div>
                          )
                        ) : (user as User).user_about === null ? (
                          ''
                        ) : (
                          <div className={s['unwrapped-block']}>
                            <div className={s['separator']}></div>
                            <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                              О себе
                            </h6>
                            <div className={s['separator']}></div>
                            <p className={s['about']}>{(user as User).user_about}</p>
                          </div>
                        )}
                      </>
                    )}
                    {!isInfoOpen && (
                      <button className={s['wrap-button']} onClick={() => setIsInfoOpen(true)}>
                        Показать больше
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {width <= 550 && (
            <div className={s['sub-info']}>
              <div className={s['info-option']}>
                <div className={s['option-title']}>Дата рождения:</div>
                <div className={s['option-data']}>
                  {isAdmin
                    ? new Date(currentUser ? currentUser.user_birthdate : '').toLocaleDateString(
                        'ru-ru',
                      )
                    : new Date((user as User).user_birthdate).toLocaleDateString('ru-ru')}
                </div>
              </div>
              <div className={s['info-option']}>
                <div className={s['option-title']}>Город:</div>
                <div className={s['option-data']}>
                  {isAdmin && currentUser
                    ? currentUser.city === null
                      ? 'Не указан'
                      : currentUser.city?.city_name
                    : (user as User).city === null
                    ? 'Не указан'
                    : (user as User).city?.city_name}
                </div>
              </div>
              {isInfoOpen && (
                <>
                  <button className={s['unwrap-button']} onClick={() => setIsInfoOpen(false)}>
                    Скрыть
                  </button>
                  <div className={s['unwrapped-block']}>
                    <div className={s['separator']}></div>
                    <h6 className={s['unwrapperd-title']}>Контакты</h6>
                    <div className={s['separator']}></div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Моб. телефон:</div>
                      {isAdmin && currentUser ? (
                        currentUser.user_phone === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            href={`tel:${currentUser.user_phone}`}
                            className={s['option-unwrapped-data']}>
                            {formatPhoneNumber(Number(currentUser.user_phone))}
                          </a>
                        )
                      ) : (user as User).user_phone === null ? (
                        <div className={s['option-data']}>Не указан</div>
                      ) : (
                        <a
                          href={`tel:${(user as User).user_phone}`}
                          className={s['option-unwrapped-data']}>
                          {formatPhoneNumber(Number((user as User).user_phone))}
                        </a>
                      )}
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Доп. телефон:</div>
                      {isAdmin && currentUser ? (
                        currentUser.user_sub_phone === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            href={`tel:${currentUser.user_sub_phone}`}
                            className={s['option-unwrapped-data']}>
                            {formatPhoneNumber(Number(currentUser.user_sub_phone))}
                          </a>
                        )
                      ) : (user as User).user_sub_phone === null ? (
                        <div className={s['option-data']}>Не указан</div>
                      ) : (
                        <a
                          href={`tel:${(user as User).user_sub_phone}`}
                          className={s['option-unwrapped-data']}>
                          {formatPhoneNumber(Number((user as User).user_sub_phone))}
                        </a>
                      )}
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Телеграм:</div>
                      {isAdmin && currentUser ? (
                        currentUser.user_telegram === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            className={s['option-unwrapped-data']}
                            href={`https://t.me/${currentUser.user_telegram}`}
                            target="_blank"
                            rel="noreferrer">
                            @{currentUser.user_telegram}
                          </a>
                        )
                      ) : (user as User).user_telegram === null ? (
                        <div className={s['option-data']}>Не указан</div>
                      ) : (
                        <a
                          className={s['option-unwrapped-data']}
                          href={`https://t.me/${(user as User).user_telegram}`}
                          target="_blank"
                          rel="noreferrer">
                          @{(user as User).user_telegram}
                        </a>
                      )}
                    </div>
                  </div>
                  {isAdmin && currentUser ? (
                    currentUser.user_about === null ? (
                      ''
                    ) : (
                      <div className={s['unwrapped-block']}>
                        <div className={s['separator']}></div>
                        <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                          О себе
                        </h6>
                        <div className={s['separator']}></div>
                        <p className={s['about']}>{currentUser.user_about}</p>
                      </div>
                    )
                  ) : (user as User).user_about === null ? (
                    ''
                  ) : (
                    <div className={s['unwrapped-block']}>
                      <div className={s['separator']}></div>
                      <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>О себе</h6>
                      <div className={s['separator']}></div>
                      <p className={s['about']}>{(user as User).user_about}</p>
                    </div>
                  )}
                </>
              )}
              {!isInfoOpen && (
                <button className={s['wrap-button']} onClick={() => setIsInfoOpen(true)}>
                  Показать больше
                </button>
              )}
            </div>
          )}
          {/* <ProfileContent contentType={'stories'} data={[]} isAdmin={isAdmin} /> */}
          {width <= 1150 && (
            <ProfileContent
              contentType={'photos'}
              data={photos}
              pageType={'profile'}
              userId={(user as User).id}
            />
          )}
          <ProfileContent
            contentType={'friends'}
            data={friends}
            userId={(user as User).id}
            pageType={'profile'}
          />
          <ProfileContent contentType={'groups'} data={groups} pageType={'profile'} />
          {/* <ProfileContent contentType={'music'} data={music} pageType={'profile'} /> */}
          <ProfileContent
            contentType={'videos'}
            data={videos}
            pageType={'profile'}
            userId={(user as User).id}
          />
          {/* {width <= 1150 && (
            <ProfileContent contentType={'collection'} data={undefined} pageType={'profile'} />
          )} */}
        </div>
        <div className={s['right']}>
          {width > 1150 && (
            <div className={s['info']}>
              <div className={s['main-info']}>
                <div>
                  <h4 className={s['user-name']}>
                    {isAdmin
                      ? `${currentUser?.user_name} ${currentUser?.user_surname}`
                      : `${(user as User).user_name} ${(user as User).user_surname}`}
                  </h4>
                  <p className={s['status']}>
                    {isAdmin ? currentUser?.user_status : (user as User).user_status}
                  </p>
                </div>
                {!isAdmin && (
                  <div className={s['more']}>
                    <button
                      className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
                      onClick={() => setIsActionsOpen(!isActionsOpen)}>
                      <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
                    </button>
                    <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                      <button className={`${s['more-btn']} ${s['list-btn']}`}>
                        <Icon src={chatSvg} id={'messages'} className={'profile-action'} />
                      </button>
                      {actionIcon && (
                        <button
                          className={`${s['more-btn']} ${s['list-btn']}`}
                          onClick={actionIcon.func}>
                          <Icon
                            src={actionIcon.icon}
                            id={actionIcon.id}
                            className={'profile-action'}
                          />
                        </button>
                      )}
                      <button className={`${s['more-btn']} ${s['list-btn']}`}>
                        <Icon src={blockSvg} id={'block'} className={'profile-action'} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className={s['sub-info']}>
                <div className={s['info-option']}>
                  <div className={s['option-title']}>Дата рождения:</div>
                  <div className={s['option-data']}>
                    {isAdmin
                      ? new Date(currentUser ? currentUser.user_birthdate : '').toLocaleDateString(
                          'ru-ru',
                        )
                      : new Date((user as User).user_birthdate).toLocaleDateString('ru-ru')}
                  </div>
                </div>
                <div className={s['info-option']}>
                  <div className={s['option-title']}>Город:</div>
                  <div className={s['option-data']}>
                    {isAdmin && currentUser
                      ? currentUser.city === null
                        ? 'Не указан'
                        : currentUser.city?.city_name
                      : (user as User).city === null
                      ? 'Не указан'
                      : (user as User).city?.city_name}
                  </div>
                </div>
                {isInfoOpen && (
                  <>
                    <button className={s['unwrap-button']} onClick={() => setIsInfoOpen(false)}>
                      Скрыть
                    </button>
                    <div className={s['unwrapped-block']}>
                      <div className={s['separator']}></div>
                      <h6 className={s['unwrapperd-title']}>Контакты</h6>
                      <div className={s['separator']}></div>
                      <div className={s['info-option']}>
                        <div className={s['option-title']}>Моб. телефон:</div>
                        {isAdmin && currentUser ? (
                          currentUser.user_phone === null ? (
                            <div className={s['option-data']}>Не указан</div>
                          ) : (
                            <a
                              href={`tel:${currentUser.user_phone}`}
                              className={s['option-unwrapped-data']}>
                              {formatPhoneNumber(Number(currentUser.user_phone))}
                            </a>
                          )
                        ) : (user as User).user_phone === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            href={`tel:${(user as User).user_phone}`}
                            className={s['option-unwrapped-data']}>
                            {formatPhoneNumber(Number((user as User).user_phone))}
                          </a>
                        )}
                      </div>
                      <div className={s['info-option']}>
                        <div className={s['option-title']}>Доп. телефон:</div>
                        {isAdmin && currentUser ? (
                          currentUser.user_sub_phone === null ? (
                            <div className={s['option-data']}>Не указан</div>
                          ) : (
                            <a
                              href={`tel:${currentUser.user_sub_phone}`}
                              className={s['option-unwrapped-data']}>
                              {formatPhoneNumber(Number(currentUser.user_sub_phone))}
                            </a>
                          )
                        ) : (user as User).user_sub_phone === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            href={`tel:${(user as User).user_sub_phone}`}
                            className={s['option-unwrapped-data']}>
                            {formatPhoneNumber(Number((user as User).user_sub_phone))}
                          </a>
                        )}
                      </div>
                      <div className={s['info-option']}>
                        <div className={s['option-title']}>Телеграм:</div>
                        {isAdmin && currentUser ? (
                          currentUser.user_telegram === null ? (
                            <div className={s['option-data']}>Не указан</div>
                          ) : (
                            <a
                              className={s['option-unwrapped-data']}
                              href={`https://t.me/${currentUser.user_telegram}`}
                              target="_blank"
                              rel="noreferrer">
                              @{currentUser.user_telegram}
                            </a>
                          )
                        ) : (user as User).user_telegram === null ? (
                          <div className={s['option-data']}>Не указан</div>
                        ) : (
                          <a
                            className={s['option-unwrapped-data']}
                            href={`https://t.me/${(user as User).user_telegram}`}
                            target="_blank"
                            rel="noreferrer">
                            @{(user as User).user_telegram}
                          </a>
                        )}
                      </div>
                    </div>
                    {isAdmin && currentUser ? (
                      currentUser.user_about === null ? (
                        ''
                      ) : (
                        <div className={s['unwrapped-block']}>
                          <div className={s['separator']}></div>
                          <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                            О себе
                          </h6>
                          <div className={s['separator']}></div>
                          <p className={s['about']}>{currentUser.user_about}</p>
                        </div>
                      )
                    ) : (user as User).user_about === null ? (
                      ''
                    ) : (
                      <div className={s['unwrapped-block']}>
                        <div className={s['separator']}></div>
                        <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                          О себе
                        </h6>
                        <div className={s['separator']}></div>
                        <p className={s['about']}>{(user as User).user_about}</p>
                      </div>
                    )}
                  </>
                )}
                {!isInfoOpen && (
                  <button className={s['wrap-button']} onClick={() => setIsInfoOpen(true)}>
                    Показать больше
                  </button>
                )}
              </div>
            </div>
          )}
          {width > 1150 && (
            <ProfileContent
              contentType={'photos'}
              data={photos}
              pageType={'profile'}
              userId={(user as User).id}
            />
          )}
          {/* {width > 1150 && (
            <ProfileContent contentType={'collection'} data={null} pageType={'profile'} />
          )} */}
        </div>
      </div>
      <div className={s['feed']} ref={feedRef}>
        <Wall
          className={'profile'}
          page={'profile'}
          placeholder={isAdmin ? 'Что произошло сегодня?' : 'Напишите что-нибудь'}
          isAdmin={isAdmin}
        />
      </div>
    </>
  ) : (
    <Preloader className="profile" />
  );
};

export default Profile;
