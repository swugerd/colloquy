import React, { useEffect, useState } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import allSvg from '../../assets/img/icons/all.svg';
import friendsSvg from '../../assets/img/icons/friends.svg';
import groupsSvg from '../../assets/img/icons/groups.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import InputButton from '../../components/UI/InputButton/InputButton';
import { useAppDispatch } from './../../redux/store';
import { setHasArrowButton } from '../../redux/mobile/slice';
import Wall from '../../components/Wall/Wall';
import Icon from '../../components/UI/Icon/Icon';
import SideContent from '../../components/SideContent/SideContent';
import { Link, useSearchParams } from 'react-router-dom';

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

  const settings = {
    type: [
      {
        id: 1,
        name: 'Все записи',
        link: '/feed',
        iconSettings: {
          src: allSvg,
          iconId: 'all',
          className: 'all',
        },
      },
      {
        id: 2,
        name: 'Записи друзей',
        link: '/feed?filter=friends',
        iconSettings: {
          src: friendsSvg,
          iconId: 'friends',
          className: 'friends',
        },
      },
      {
        id: 3,
        name: 'Записи сообществ',
        link: '/feed?filter=groups',
        iconSettings: {
          src: groupsSvg,
          iconId: 'groups',
          className: 'groups',
        },
      },
    ],
    // content: [
    //   {
    //     id: 1,
    //     name: 'Все медиа',
    //     iconSettings: {
    //       src: allSvg,
    //       iconId: 'all',
    //       className: 'all',
    //     },
    //   },
    //   {
    //     id: 2,
    //     name: 'Фотографии',
    //     iconSettings: {
    //       src: photosSvg,
    //       iconId: 'photos',
    //       className: 'photos',
    //     },
    //   },
    //   {
    //     id: 3,
    //     name: 'Видео',
    //     iconSettings: {
    //       src: videosSvg,
    //       iconId: 'videos',
    //       className: 'videos',
    //     },
    //   },
    // ],
  };

  const [params, setParams] = useSearchParams();

  const [typeIndex, setTypeIndex] = useState(
    params.get('filter') === 'friends' ? 1 : params.get('filter') === 'groups' ? 2 : 0,
  );

  const [contentIndex, setContentIndex] = useState(0);

  const children = [
    <div className={`${sideContentS['options']}`} key={1}>
      <div className={sideContentS['group']}>
        {settings.type.map(({ id, name, iconSettings, link }, index) => (
          <Link
            className={`${sideContentS['option']} ${
              typeIndex === index ? sideContentS['active'] : ''
            }`}
            to={link}
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
          </Link>
        ))}
      </div>
      {/* <h2 className={sideContentS['title']}>Настройки контента</h2>
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
      </div> */}
    </div>,
  ];

  return (
    <>
      <Wall className={'feed'} page={'feed'} placeholder={''} isAdmin={false} />
      <SideContent titles={['Что будем показывать?']} className={'feed'}>
        {children}
      </SideContent>
    </>
  );
};

export default Feed;
