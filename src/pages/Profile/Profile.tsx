import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Profile.module.scss';
import { useAppDispatch } from './../../redux/store';
import { setIsInfoName } from '../../redux/mobile/slice';
import Wall from '../../components/Wall/Wall';
import ava from '../../assets/uploads/ava.png';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import useWindowSize from './../../hooks/useWindowResize';
import ProfileContent from '../../components/ProfileContent/ProfileContent';

const Profile: React.FC = () => {
  useSetPageTitle('Профиль');
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const { width } = useWindowSize();

  useEffect(() => {
    if (username) {
      dispatch(setIsInfoName(username));
    }
    return () => {
      dispatch(setIsInfoName(''));
    };
  }, []);

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  // Переделать css и вынести блоки с медиа в компонент

  const stories: { id: number; story: string; user: { id: number; name: string; img: string } }[] =
    [
      { id: 1, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      { id: 2, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      { id: 3, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
      { id: 4, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      { id: 5, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      { id: 6, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
      { id: 7, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      { id: 8, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      { id: 9, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
    ];

  const friends: { id: number; img: string; name: string; onlineType: string }[] = [
    { id: 1, img: ava, name: 'Рабадонович скамерулевичивоынар', onlineType: 'pc-online' },
    { id: 2, img: ava, name: 'Рабадонович скамерулевич', onlineType: 'pc-dnd' },
    { id: 3, img: ava, name: 'Рабадонович скамерулевич', onlineType: 'pc-afk' },
    { id: 4, img: ava, name: 'Рабадонович скамерулевич', onlineType: 'pc-offline' },
    { id: 5, img: ava, name: 'Паша', onlineType: 'pc-offline' },
    { id: 6, img: ava, name: 'Паша', onlineType: 'pc-offline' },
  ];

  const groups: { id: number; img: string; name: string; members: number }[] = [
    { id: 1, img: ava, name: 'ВЫОЛФВРЫФШГРВЫРФЫ вфывыф фвыв', members: 12 },
    { id: 2, img: ava, name: 'ВЫОЛФВРЫФШГРВЫРФЫ вфывыф фвыв', members: 24244 },
    { id: 3, img: ava, name: 'ВЫОЛФВРЫФШГРВЫРФЫ вфывыф фвыв', members: 1000000 },
    { id: 4, img: ava, name: 'Паша', members: 2 },
    { id: 5, img: ava, name: 'Паша', members: 100000 },
  ];

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

  const videos: { id: number; video: string; name: string; author: string; views: number }[] = [
    {
      id: 1,
      video,
      name: 'трек трек трек трек трек вырфо',
      author: 'фредбер медведь вроыфрвыфло',
      views: 123,
    },
    { id: 2, video, name: 'трек', author: 'фредбер медведь вроыфрвыфло', views: 123 },
    { id: 3, video, name: 'трек', author: 'фредбефредбер медведь вроыфрвыфлоедь', views: 123 },
    { id: 4, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 5, video, name: 'трек', author: 'фредбер медведь', views: 123 },
  ];

  const photos: { id: number; img: string }[] = [
    { id: 1, img: ava },
    { id: 2, img: ava },
    { id: 3, img: ava },
    { id: 4, img: ava },
    { id: 5, img: ava },
    { id: 6, img: ava },
  ];
  return (
    <>
      <div className={s['profile']}>
        <div className={s['left']}>
          <div className={s['mobile-info']}>
            <div className={s['avatar']}>
              <img src={ava} alt="ava" />
            </div>
            {width <= 1150 && (
              <div className={s['info']}>
                <div className={s['main-info']}>
                  <div>
                    <h4 className={s['user-name']}>Олег Киреев</h4>
                    <p className={s['status']}>
                      Какой-то крутой статус Какой-то крутой статус Какой-то крутой статус Какой-то
                      крутой статус Какой-то крутой статус Какой-то крутой статус Какой-то крутой
                      статус Какой-то крутой статус Какой-то крутой статус Какой-то крутой статус
                      Какой-то крутой статус Какой-то крутой статус Какой-то крутой статус Какой-то
                      крутой статус Какой-то крутой статус
                    </p>
                  </div>
                  <div className={s['more']}>
                    <button
                      className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
                      onClick={() => setIsActionsOpen(!isActionsOpen)}>
                      <svg
                        width="34"
                        height="8"
                        className={s['dots']}
                        viewBox="0 0 34 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill="white" />
                        <circle cx="17" cy="4" r="4" fill="white" />
                        <circle cx="30" cy="4" r="4" fill="white" />
                      </svg>
                    </button>
                    <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                      <button className={`${s['more-btn']} ${s['list-btn']}`}>
                        <svg
                          viewBox="0 0 21 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={s['more-icon']}
                          id="messages">
                          <path
                            d="M18.6796 8.5C18.0149 7.7849 16.6796 7 16.6796 7C16.6796 7 17.07 9.48746 16.6796 11C16.3523 12.2683 15.1796 14 15.1796 14L13.1796 16C12.3986 16.781 12 16.7007 11.1796 17C10.4233 17.276 9.97746 17.3922 9.17963 17.5C8.21211 17.6307 6.67963 17.5 6.67963 17.5C6.67963 17.5 7.2268 18.4609 7.67963 19C8.4838 19.9574 9.03895 20.4881 10.1796 21C11.4393 21.5653 12.3062 21.6421 13.6796 21.5C14.908 21.3729 16.6796 20.5 16.6796 20.5C16.6796 20.5 17.7113 21.2547 18.6796 21.5C20.1796 22 20.353 21.4312 20.6796 21.5L20.1796 20V18L20.6796 16C20.6796 16 21.079 13.5102 20.6796 12C20.2771 10.4781 19.0708 8.92086 18.6796 8.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M2.17965 16.4998C1.60389 16.6078 0.679626 16.4998 0.679626 16.4998L1.17963 14.9998C1.17963 14.9998 1.25905 13.9851 1.17965 13.3429C1.08814 12.6027 0.897191 12.2132 0.679647 11.4998C0.499528 10.9092 0.309026 10.6036 0.179647 9.99983C-0.0658316 8.85426 -0.0538582 8.14789 0.179647 6.99983C0.389224 5.9694 0.605236 5.38059 1.17965 4.49983C1.78304 3.57463 2.31029 3.18121 3.17965 2.49983C4.07576 1.79747 5 1.20638 5.67963 0.999796C6.21527 0.836983 7.8384 0.73659 9.17965 0.999825C10.6389 1.28622 11.516 1.57387 12.6796 2.49983C13.658 3.27834 14.0942 3.89508 14.6796 4.99983C15.4336 6.42257 15.7623 7.39178 15.6796 8.99983C15.594 10.6659 14.9589 11.7333 14.1796 12.9998C13.5245 14.0647 12.1796 14.9998 12.1796 14.9998C12.1796 14.9998 10.7831 15.7193 9.67963 15.9998C8.73342 16.2404 7.67963 16.4999 7.17963 16.4998C5.94468 16.4998 4.17965 15.4998 4.17965 15.4998C4.17965 15.4998 3.03793 16.3389 2.17965 16.4998Z"
                            fill="currentColor"
                          />
                          <circle cx="4" cy="9" r="1" fill="black" />
                          <circle cx="8" cy="9" r="1" fill="black" />
                          <circle cx="12" cy="9" r="1" fill="black" />
                        </svg>
                      </button>
                      <button className={`${s['more-btn']} ${s['list-btn']}`}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className={s['more-icon']}
                          xmlns="http://www.w3.org/2000/svg">
                          <line
                            x1="7"
                            y1="1"
                            x2="7"
                            y2="13"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <line
                            x1="13"
                            y1="7"
                            x2="1"
                            y2="7"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <button className={`${s['more-btn']} ${s['list-btn']}`}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className={s['more-icon']}
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="8.75" stroke="white" stroke-width="2.5" />
                          <line
                            x1="2.88388"
                            y1="3.11612"
                            x2="16.8839"
                            y2="17.1161"
                            stroke="white"
                            stroke-width="2.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {width > 550 && (
                  <div className={s['sub-info']}>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Дата рождения:</div>
                      <div className={s['option-data']}>16.04.2003</div>
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Город:</div>
                      <div className={s['option-data']}>Москва</div>
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
                            <div className={s['option-unwrapped-data']}>+7 (928) 301-23-21</div>
                          </div>
                          <div className={s['info-option']}>
                            <div className={s['option-title']}>Доп. телефон:</div>
                            <div className={s['option-unwrapped-data']}>+7 (912) 123-45-11</div>
                          </div>
                          <div className={s['info-option']}>
                            <div className={s['option-title']}>Телеграм:</div>
                            <div className={s['option-unwrapped-data']}>@Swugerd</div>
                          </div>
                        </div>
                        <div className={s['unwrapped-block']}>
                          <div className={s['separator']}></div>
                          <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>
                            О себе
                          </h6>
                          <div className={s['separator']}></div>
                          <p className={s['about']}>
                            ура что писать я типо что-то делаю и выфвфывыф вфывфы вфывфывфы вфывы
                          </p>
                        </div>
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
                <div className={s['option-data']}>16.04.2003</div>
              </div>
              <div className={s['info-option']}>
                <div className={s['option-title']}>Город:</div>
                <div className={s['option-data']}>Москва</div>
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
                      <div className={s['option-unwrapped-data']}>+7 (928) 301-23-21</div>
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Доп. телефон:</div>
                      <div className={s['option-unwrapped-data']}>+7 (912) 123-45-11</div>
                    </div>
                    <div className={s['info-option']}>
                      <div className={s['option-title']}>Телеграм:</div>
                      <div className={s['option-unwrapped-data']}>@Swugerd</div>
                    </div>
                  </div>
                  <div className={s['unwrapped-block']}>
                    <div className={s['separator']}></div>
                    <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>О себе</h6>
                    <div className={s['separator']}></div>
                    <p className={s['about']}>
                      ура что писать я типо что-то делаю и выфвфывыф вфывфы вфывфывфы вфывы
                    </p>
                  </div>
                </>
              )}
              {!isInfoOpen && (
                <button className={s['wrap-button']} onClick={() => setIsInfoOpen(true)}>
                  Показать больше
                </button>
              )}
            </div>
          )}
          <ProfileContent contentType={'stories'} data={stories} />
          {width <= 1150 && <ProfileContent contentType={'photos'} data={photos} />}
          <ProfileContent contentType={'friends'} data={friends} />
          <ProfileContent contentType={'groups'} data={groups} />
          <ProfileContent contentType={'music'} data={music} />
          <ProfileContent contentType={'videos'} data={videos} />
          {width <= 1150 && <ProfileContent contentType={'collection'} data={undefined} />}
        </div>
        <div className={s['right']}>
          {width > 1150 && (
            <div className={s['info']}>
              <div className={s['main-info']}>
                <div>
                  <h4 className={s['user-name']}>Олег Киреев</h4>
                  <p className={s['status']}>
                    Какой-то крутой статус ф вофыло длфыводл офыдло влыфолвд офлыв
                  </p>
                </div>
                <div className={s['more']}>
                  <button
                    className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
                    onClick={() => setIsActionsOpen(!isActionsOpen)}>
                    <svg
                      width="34"
                      height="8"
                      className={s['dots']}
                      viewBox="0 0 34 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="white" />
                      <circle cx="17" cy="4" r="4" fill="white" />
                      <circle cx="30" cy="4" r="4" fill="white" />
                    </svg>
                  </button>
                  <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <svg
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={s['more-icon']}
                        id="messages">
                        <path
                          d="M18.6796 8.5C18.0149 7.7849 16.6796 7 16.6796 7C16.6796 7 17.07 9.48746 16.6796 11C16.3523 12.2683 15.1796 14 15.1796 14L13.1796 16C12.3986 16.781 12 16.7007 11.1796 17C10.4233 17.276 9.97746 17.3922 9.17963 17.5C8.21211 17.6307 6.67963 17.5 6.67963 17.5C6.67963 17.5 7.2268 18.4609 7.67963 19C8.4838 19.9574 9.03895 20.4881 10.1796 21C11.4393 21.5653 12.3062 21.6421 13.6796 21.5C14.908 21.3729 16.6796 20.5 16.6796 20.5C16.6796 20.5 17.7113 21.2547 18.6796 21.5C20.1796 22 20.353 21.4312 20.6796 21.5L20.1796 20V18L20.6796 16C20.6796 16 21.079 13.5102 20.6796 12C20.2771 10.4781 19.0708 8.92086 18.6796 8.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M2.17965 16.4998C1.60389 16.6078 0.679626 16.4998 0.679626 16.4998L1.17963 14.9998C1.17963 14.9998 1.25905 13.9851 1.17965 13.3429C1.08814 12.6027 0.897191 12.2132 0.679647 11.4998C0.499528 10.9092 0.309026 10.6036 0.179647 9.99983C-0.0658316 8.85426 -0.0538582 8.14789 0.179647 6.99983C0.389224 5.9694 0.605236 5.38059 1.17965 4.49983C1.78304 3.57463 2.31029 3.18121 3.17965 2.49983C4.07576 1.79747 5 1.20638 5.67963 0.999796C6.21527 0.836983 7.8384 0.73659 9.17965 0.999825C10.6389 1.28622 11.516 1.57387 12.6796 2.49983C13.658 3.27834 14.0942 3.89508 14.6796 4.99983C15.4336 6.42257 15.7623 7.39178 15.6796 8.99983C15.594 10.6659 14.9589 11.7333 14.1796 12.9998C13.5245 14.0647 12.1796 14.9998 12.1796 14.9998C12.1796 14.9998 10.7831 15.7193 9.67963 15.9998C8.73342 16.2404 7.67963 16.4999 7.17963 16.4998C5.94468 16.4998 4.17965 15.4998 4.17965 15.4998C4.17965 15.4998 3.03793 16.3389 2.17965 16.4998Z"
                          fill="currentColor"
                        />
                        <circle cx="4" cy="9" r="1" fill="black" />
                        <circle cx="8" cy="9" r="1" fill="black" />
                        <circle cx="12" cy="9" r="1" fill="black" />
                      </svg>
                    </button>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={s['more-icon']}
                        xmlns="http://www.w3.org/2000/svg">
                        <line
                          x1="7"
                          y1="1"
                          x2="7"
                          y2="13"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <line
                          x1="13"
                          y1="7"
                          x2="1"
                          y2="7"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={s['more-icon']}
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8.75" stroke="white" stroke-width="2.5" />
                        <line
                          x1="2.88388"
                          y1="3.11612"
                          x2="16.8839"
                          y2="17.1161"
                          stroke="white"
                          stroke-width="2.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className={s['sub-info']}>
                <div className={s['info-option']}>
                  <div className={s['option-title']}>Дата рождения:</div>
                  <div className={s['option-data']}>16.04.2003</div>
                </div>
                <div className={s['info-option']}>
                  <div className={s['option-title']}>Город:</div>
                  <div className={s['option-data']}>Москва</div>
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
                        <div className={s['option-unwrapped-data']}>+7 (928) 301-23-21</div>
                      </div>
                      <div className={s['info-option']}>
                        <div className={s['option-title']}>Доп. телефон:</div>
                        <div className={s['option-unwrapped-data']}>+7 (912) 123-45-11</div>
                      </div>
                      <div className={s['info-option']}>
                        <div className={s['option-title']}>Телеграм:</div>
                        <div className={s['option-unwrapped-data']}>@Swugerd</div>
                      </div>
                    </div>
                    <div className={s['unwrapped-block']}>
                      <div className={s['separator']}></div>
                      <h6 className={`${s['unwrapperd-title']} ${s['separator-width']}`}>О себе</h6>
                      <div className={s['separator']}></div>
                      <p className={s['about']}>
                        ура что писать я типо что-то делаю и выфвфывыф вфывфы вфывфывфы вфывы
                      </p>
                    </div>
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
          {width > 1150 && <ProfileContent contentType={'photos'} data={photos} />}
          {width > 1150 && <ProfileContent contentType={'collection'} data={null} />}
        </div>
      </div>
      <Wall className={'profile'} page={'profile'} />
    </>
  );
};

export default Profile;
