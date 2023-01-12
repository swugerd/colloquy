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

  const [isOpen, setIsOpen] = useState(false);

  // Переделать css и вынести блоки с медиа в компонент

  const stories = [
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

  const friends = [
    { id: 1, img: ava, name: 'Паша', onlineType: 'pc-online' },
    { id: 2, img: ava, name: 'Паша', onlineType: 'pc-dnd' },
    { id: 3, img: ava, name: 'Паша', onlineType: 'pc-afk' },
    { id: 4, img: ava, name: 'Паша', onlineType: 'pc-offline' },
    { id: 5, img: ava, name: 'Паша', onlineType: 'pc-offline' },
    { id: 6, img: ava, name: 'Паша', onlineType: 'pc-offline' },
  ];

  const groups = [
    { id: 1, img: ava, name: 'ВЫОЛФВРЫФШГРВЫРФЫ вфывыф фвыв', members: 12 },
    { id: 2, img: ava, name: 'Паша', members: 24244 },
    { id: 3, img: ava, name: 'Паша', members: 1000000 },
    { id: 4, img: ava, name: 'Паша', members: 2 },
    { id: 5, img: ava, name: 'Паша', members: 100000 },
  ];

  const music = [
    { id: 1, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 2, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 3, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 4, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 5, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 6, img: ava, name: 'трек', author: 'фредбер медведь' },
    { id: 7, img: ava, name: 'трек', author: 'фредбер медведь' },
  ];

  const videos = [
    { id: 1, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 2, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 3, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 4, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 5, video, name: 'трек', author: 'фредбер медведь', views: 123 },
  ];

  const photos = [
    { id: 1, img: ava },
    { id: 2, img: ava },
    { id: 3, img: ava },
    { id: 4, img: ava },
    { id: 5, img: ava },
  ];
  return (
    <>
      {
        // на разную ширину экрана переносить нужный контент для адаптива
      }
      <div className={s['profile']}>
        <div className={s['left']}>
          <div className={s['avatar']}>
            <img src={ava} alt="ava" />
          </div>
          <ProfileContent contentType={'stories'} data={stories} />
          {width <= 1150 && <ProfileContent contentType={'photos'} data={photos} />}
          <ProfileContent contentType={'friends'} data={friends} />
          <ProfileContent contentType={'groups'} data={groups} />
          <ProfileContent contentType={'music'} data={music} />
          <ProfileContent contentType={'videos'} data={videos} />
          {width <= 1150 && <ProfileContent contentType={'collection'} data={undefined} />}
        </div>
        <div className={s['right']}>
          <div className={s['info']}>
            <div className={s['main-info']}>
              <h4 className={s['user-name']}>Олег Киреев</h4>
              <p className={s['status']}>Какой-то крутой статус</p>
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
              {isOpen && (
                <>
                  <button className={s['unwrap-button']} onClick={() => setIsOpen(false)}>
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
              {!isOpen && (
                <button className={s['wrap-button']} onClick={() => setIsOpen(true)}>
                  Показать больше
                </button>
              )}
            </div>
          </div>
          {width > 1150 && <ProfileContent contentType={'photos'} data={photos} />}
          {width > 1150 && <ProfileContent contentType={'collection'} data={undefined} />}
        </div>
      </div>
      <Wall className={'profile'} page={'profile'} />
    </>
  );
};

export default Profile;
