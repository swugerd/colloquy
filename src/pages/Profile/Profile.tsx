import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Profile.module.scss';
import { useAppDispatch } from './../../redux/store';
import { setIsInfoName } from '../../redux/mobile/slice';
import Wall from '../../components/Wall/Wall';
import ava from '../../assets/uploads/ava.png';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Story from '../../components/Story/Story';

const Profile: React.FC = () => {
  useSetPageTitle('Профиль');
  const dispatch = useAppDispatch();
  const { username } = useParams();
  useEffect(() => {
    if (username) {
      dispatch(setIsInfoName(username));
    }
    return () => {
      dispatch(setIsInfoName(''));
    };
  }, []);

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
    { id: 1, img: ava, name: 'Паша', onlineType: 'online' },
    { id: 2, img: ava, name: 'Паша', onlineType: 'dnd' },
    { id: 3, img: ava, name: 'Паша', onlineType: 'afk' },
    { id: 4, img: ava, name: 'Паша', onlineType: 'offline' },
    { id: 5, img: ava, name: 'Паша', onlineType: 'offline' },
    { id: 6, img: ava, name: 'Паша', onlineType: 'offline' },
  ];

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={s['profile']}>
        <div className={s['left']}>
          <div className={s['avatar']}>
            <img src={ava} alt="ava" />
          </div>
          <div className={s['content-block']}>
            <h5 className={s['sub-title']}>Истории</h5>
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  // Override prevEl & nextEl now that refs are defined

                  // сделать что-то с типизацией

                  // @ts-ignore
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = navigationNextRef.current;

                  // Re-init navigation
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
              modules={[Navigation]}>
              {stories.map(({ id, story, user }) => (
                <SwiperSlide key={id}>
                  <Story id={id} story={story} user={user} />
                </SwiperSlide>
              ))}
              <button className={s['prev-button']} ref={navigationPrevRef}>
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button className={s['next-button']} ref={navigationNextRef}>
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </Swiper>
          </div>
          <div className={s['content-block']}>
            <h5 className={s['sub-title']}>Друзья</h5>
            <div className={s['content']}>
              <div className={s['top']}>
                <Link to="/friends">
                  Показать все{' '}
                  <div className={s['arrow']}>
                    <svg
                      width="15"
                      height="9"
                      viewBox="0 0 15 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {friends.length}
                </Link>
                <p className={s['online']}>
                  Онлайн:{' '}
                  <span>{friends.filter(({ onlineType }) => onlineType !== 'offline').length}</span>
                </p>
              </div>
              <div className={s['friend-list']}>
                {friends.map(({ id, img, name, onlineType }) => (
                  <div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={s['right']}></div>
      </div>
      <Wall />
    </>
  );
};

export default Profile;
