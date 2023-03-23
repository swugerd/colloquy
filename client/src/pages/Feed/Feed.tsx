import React, { useEffect, useRef, useState } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Feed.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import allSvg from '../../assets/img/icons/all.svg';
import friendsSvg from '../../assets/img/icons/friends.svg';
import groupsSvg from '../../assets/img/icons/groups.svg';
import circlesSvg from '../../assets/img/icons/circles.svg';
import voicesSvg from '../../assets/img/icons/voices.svg';
import photosSvg from '../../assets/img/icons/photos.svg';
import videosSvg from '../../assets/img/icons/videos.svg';
import patternsSvg from '../../assets/img/icons/patterns.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import circle from '../../assets/videos/video.mp4';
import voice from '../../assets/uploads/test/voice.png';
import track from '../../assets/uploads/test/ebalo.png';
import Post from '../../components/Post/Post';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Story from '../../components/Story/Story';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import InputButton from '../../components/UI/InputButton/InputButton';
import { useSelector } from 'react-redux';
import { selectMobile } from '../../redux/mobile/selector';
import { useAppDispatch } from './../../redux/store';
import useWindowSize from './../../hooks/useWindowResize';
import { setHasArrowButton, setTitle } from '../../redux/mobile/slice';
import Wall from '../../components/Wall/Wall';
import Icon from '../../components/UI/Icon/Icon';
import SideContent from '../../components/SideContent/SideContent';
import useAuth from '../../hooks/useAuth';

const Feed: React.FC = () => {
  useSetPageTitle('Новости');
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    return () => {
      dispatch(setHasArrowButton(false));
    };
  }, []);
  const { mobile } = useSelector(selectMobile);

  const { user, isLoading, errorMessage, login } = useAuth();

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

  const settings = {
    type: [
      {
        id: 1,
        name: 'Все записи',
        iconSettings: {
          src: allSvg,
          iconId: 'all',
          className: 'all',
        },
      },
      {
        id: 2,
        name: 'Записи друзей',
        iconSettings: {
          src: friendsSvg,
          iconId: 'friends',
          className: 'friends',
        },
      },
      {
        id: 3,
        name: 'Записи сообществ',
        iconSettings: {
          src: groupsSvg,
          iconId: 'groups',
          className: 'groups',
        },
      },
    ],
    content: [
      {
        id: 1,
        name: 'Все медиа',
        iconSettings: {
          src: allSvg,
          iconId: 'all',
          className: 'all',
        },
      },
      {
        id: 2,
        name: 'Кружочки',
        iconSettings: {
          src: circlesSvg,
          iconId: 'circles',
          className: 'circles',
        },
      },
      {
        id: 3,
        name: 'Войсы',
        iconSettings: {
          src: voicesSvg,
          iconId: 'voices',
          className: 'voices',
        },
      },
      {
        id: 4,
        name: 'Фотографии',
        iconSettings: {
          src: photosSvg,
          iconId: 'photos',
          className: 'photos',
        },
      },
      {
        id: 5,
        name: 'Видео',
        iconSettings: {
          src: videosSvg,
          iconId: 'videos',
          className: 'videos',
        },
      },
      {
        id: 6,
        name: 'Музыка',
        iconSettings: {
          src: musicSvg,
          iconId: 'music',
          className: 'music',
        },
      },
      {
        id: 7,
        name: 'Шаблоны',
        iconSettings: {
          src: patternsSvg,
          iconId: 'patterns',
          className: 'patterns',
        },
      },
    ],
  };

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const [typeIndex, setTypeIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const children = [
    <div className={sideContentS['stories']} key={1}>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          380: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1150: {
            slidesPerView: 2,
          },
        }}
        modules={[Navigation]}>
        {stories.map(({ id, story, user }) => (
          <SwiperSlide key={id}>
            <Story id={id} story={story} user={user} className={'feed'} />
          </SwiperSlide>
        ))}
        <button className={sideContentS['prev-button']} ref={navigationPrevRef}>
          <Icon src={arrowSvg} id={'arrow'} className={'white'} />
        </button>
        <button className={sideContentS['next-button']} ref={navigationNextRef}>
          <Icon src={arrowSvg} id={'arrow'} className={'white'} />
        </button>
      </Swiper>
    </div>,
    <div className={`${sideContentS['options']}`} key={2}>
      <div className={sideContentS['group']}>
        {settings.type.map(({ id, name, iconSettings }, index) => (
          <div
            className={`${sideContentS['option']} ${
              typeIndex === index ? sideContentS['active'] : ''
            }`}
            onClick={() => setTypeIndex(index)}
            key={id}>
            <div className={sideContentS['option-icon']}>
              <Icon
                src={iconSettings.src}
                id={iconSettings.iconId}
                className={iconSettings.className}
                hoverClass={typeIndex === index ? 'active' : ''}
              />
            </div>
            <span className={sideContentS['option-name']}>{name}</span>
            <InputButton
              checked={typeIndex === index}
              onChange={() => setTypeIndex(index)}
              className="relative"
              name={'type'}
              id={''}
              type={'radio'}
            />
          </div>
        ))}
      </div>
      <h2 className={sideContentS['title']}>Настройки контента</h2>
      <div className={sideContentS['group']}>
        {settings.content.map(({ id, name, iconSettings }, index) => (
          <div
            className={`${sideContentS['option']} ${
              contentIndex === index ? sideContentS['active'] : ''
            }`}
            onClick={() => setContentIndex(index)}
            key={id}>
            <div className={sideContentS['option-icon']}>
              <Icon
                src={iconSettings.src}
                id={iconSettings.iconId}
                className={iconSettings.className}
                hoverClass={contentIndex === index ? 'active' : ''}
              />
            </div>
            <span className={sideContentS['option-name']}>{name}</span>
            <InputButton
              checked={contentIndex === index}
              onChange={() => setContentIndex(index)}
              className="relative"
              name={'content'}
              id={''}
              type={'radio'}
            />
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <>
      <Wall className={'feed'} page={'feed'} placeholder={''} isAdmin={false} />
      <SideContent titles={['Истории', 'Что будем показывать?']} className={'feed'}>
        {children}
      </SideContent>
    </>
  );
};

export default Feed;
