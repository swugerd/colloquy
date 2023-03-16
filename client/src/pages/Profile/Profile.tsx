import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Profile.module.scss';
import moreSvg from '../../assets/img/icons/dots.svg';
import chatSvg from '../../assets/img/icons/chat.svg';
import addSvg from '../../assets/img/icons/add.svg';
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

const Profile: React.FC = () => {
  useSetPageTitle('Профиль');
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const { width } = useWindowSize();

  const profileRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

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
  }, []);

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  // Переделать css и вынести блоки с медиа в компонент

  const stories: { id: number; story: string; user: { id: number; name: string; img: string } }[] =
    [
      { id: 1, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      // { id: 2, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      // { id: 3, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
      // { id: 4, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      // { id: 5, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      // { id: 6, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
      // { id: 7, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
      // { id: 8, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
      // { id: 9, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
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

  const isAdmin = true;
  return (
    <>
      <div className={`${s['profile']} ${isSticky ? s['sticky'] : ''}`} ref={profileRef}>
        <div className={`${s['left']}`}>
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
                      <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
                    </button>
                    <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                      <SquareButton className={'more-btn'} icon={chatSvg} id={'messages'} />
                      <SquareButton className={'more-btn'} icon={addSvg} id={'add'} />
                      <SquareButton className={'more-btn'} icon={blockSvg} id={'block'} />
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
          <ProfileContent contentType={'stories'} data={stories} isAdmin={isAdmin} />
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
                    <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
                  </button>
                  <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <Icon src={chatSvg} id={'messages'} className={'profile-action'} />
                    </button>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <Icon src={addSvg} id={'add'} className={'profile-action'} />
                    </button>
                    <button className={`${s['more-btn']} ${s['list-btn']}`}>
                      <Icon src={blockSvg} id={'block'} className={'profile-action'} />
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
      <div className={s['feed']} ref={feedRef}>
        <Wall
          className={'profile'}
          page={'profile'}
          placeholder={isAdmin ? 'Что произошло сегодня?' : 'Напишите что-нибудь'}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
};

export default Profile;
