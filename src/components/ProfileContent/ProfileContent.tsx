import React, { useEffect, useState } from 'react';
import s from './ProfileContent.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Story from '../Story/Story';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import convertMembers from '../../utils/convertMembers';
import useWindowSize from '../../hooks/useWindowResize';
import Icon from '../UI/Icon/Icon';
import userSvg from '../../assets/img/icons/user.svg';
import viewsSvg from '../../assets/img/icons/views.svg';
import achievementSvg from '../../assets/img/icons/achieve.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import patternSvg from '../../assets/img/icons/patterns.svg';
import gemSvg from '../../assets/img/icons/gem.svg';
import classNames from 'classnames';

type contentType = 'stories' | 'friends' | 'groups' | 'music' | 'videos' | 'photos' | 'collection';

type ProfileContentProps = {
  contentType: contentType;
  data: any;
};

// поставить шрифт, переделать компонент

const ProfileContent: React.FC<ProfileContentProps> = ({ contentType, data }) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const { width } = useWindowSize();

  const [visibleFriends, setvisibleFriends] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState(0);
  const [visibleGroups, setVisibleGroups] = useState(0);
  const [visibleMusic, setVisibleMusic] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState(0);

  const [isOpen, setIsOpen] = useState({
    isStoriesOpen: true,
    isPhotosOpen: true,
    isFriendsOpen: false,
    isGroupsOpen: false,
    isMusicOpen: false,
    isVideosOpen: false,
    isCollectionOpen: false,
  });

  const {
    isStoriesOpen,
    isPhotosOpen,
    isFriendsOpen,
    isGroupsOpen,
    isMusicOpen,
    isVideosOpen,
    isCollectionOpen,
  } = isOpen;

  useEffect(() => {
    if (width < 740) {
      setvisibleFriends(2);
      setVisibleGroups(2);
      setVisibleMusic(2);
      setVisibleVideos(2);
      setVisiblePhotos(4);
    } else if (width > 600 && width < 1000) {
      setvisibleFriends(3);
      setVisibleGroups(3);
      setVisibleMusic(3);
      setVisibleVideos(3);
      setVisiblePhotos(4);
    } else {
      setvisibleFriends(4);
      setVisibleGroups(3);
      setVisibleMusic(3);
      setVisibleVideos(3);
      setVisiblePhotos(4);
    }
    if (width < 550) {
      setVisiblePhotos(3);
    }
  }, [width]);

  const setTitle = (contentType: contentType) => {
    const titles = [
      { type: 'stories', title: 'Истории' },
      { type: 'friends', title: 'Друзья' },
      { type: 'groups', title: 'Сообщества' },
      { type: 'music', title: 'Музыка' },
      { type: 'videos', title: 'Видео' },
      { type: 'photos', title: 'Фотографии' },
      { type: 'collection', title: 'Коллекция' },
    ];
    return titles.find((item) => item.type === contentType)?.title;
  };

  const setContent = (data: any, contentType: contentType) => {
    const content = [
      {
        type: 'stories',
        jsx: (
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              400: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 4,
              },
              700: {
                slidesPerView: 5,
              },
              900: {
                slidesPerView: 7,
              },
              1150: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            modules={[Navigation]}>
            {data?.map((item: any) => (
              <SwiperSlide key={item.id}>
                <Story id={item.id} story={item.story} user={item.user} className={'profile'} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className={s['add-story']}>
                <div className={s['add-icon']}></div>
              </div>
            </SwiperSlide>
            <button className={s['prev-button']} ref={navigationPrevRef}>
              <Icon src={arrowSvg} id={'arrow'} className={'white'} />
            </button>
            <button className={s['next-button']} ref={navigationNextRef}>
              <Icon src={arrowSvg} id={'arrow'} className={'white'} />
            </button>
          </Swiper>
        ),
      },
      {
        type: 'friends',
        jsx: (
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/friends" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
                  <Icon src={arrowSvg} id={'arrow'} className={'white'} />
                </div>
                <span className={s['count']}>{data?.length}</span>
              </Link>
              <p className={s['online']}>
                Онлайн:{' '}
                <span>{data?.filter((item: any) => item.onlineType !== 'pc-offline').length}</span>
              </p>
            </div>
            <div className={s['friend-list']}>
              {data?.map((item: any, index: number) =>
                index >= visibleFriends ? null : (
                  <Link to="/friends" className={s['friend']} key={item.id}>
                    <HeaderAvatar
                      className={'content-block'}
                      img={item.img}
                      title={''}
                      onlineType={item.onlineType}
                      indicatorClass={['sm-indicator', 'border-elem']}
                    />
                    <span className={s['name']}>{item.name}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        ),
      },
      {
        type: 'groups',
        jsx: (
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
                  <Icon src={arrowSvg} id={'arrow'} className={'white'} />
                </div>
                <span className={s['count']}>{data?.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data?.map((item: any, index: number) =>
                index >= visibleGroups ? null : (
                  <Link to="/groups" className={s['group']} key={item.id}>
                    <HeaderAvatar
                      className={'content-block'}
                      img={item.img}
                      title={''}
                      onlineType={''}
                    />
                    <div className={s['group-info']}>
                      <span className={s['group-name']}>{item.name}</span>
                      <div className={s['members']}>
                        <Icon src={userSvg} id={'profile'} className={'green'} />
                        <span>{convertMembers(item.members)}</span>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        ),
      },
      {
        type: 'music',
        jsx: (
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
                  <Icon src={arrowSvg} id={'arrow'} className={'white'} />
                </div>
                <span className={s['count']}>{data?.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data?.map((item: any, index: number) =>
                index >= visibleMusic ? null : (
                  <Link to="/music" className={s['group']} key={item.id}>
                    <div className={s['music-img']}>
                      <img src={item.img} alt="music" />
                    </div>
                    <div className={s['group-info']}>
                      <span className={s['group-name']}>{item.name}</span>
                      <span className={s['members']}>{item.author}</span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        ),
      },
      {
        type: 'videos',
        jsx: (
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
                  <Icon src={arrowSvg} id={'arrow'} className={'white'} />
                </div>
                <span className={s['count']}>{data?.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data?.map((item: any, index: number) =>
                index >= visibleVideos ? null : (
                  <div className={s['video-item']} key={item.id}>
                    <div className={s['video']}>
                      <video>
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </div>
                    <div className={s['group-info']}>
                      <span className={s['video-name']}>{item.name}</span>
                      <Link to="/profile/swugerd" className={s['video-author']}>
                        {item.author}
                      </Link>
                      <div className={s['views']}>
                        <Icon src={viewsSvg} id={'views'} className={'white'} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ),
      },
      {
        type: 'photos',
        jsx: (
          <div className={s['photos']}>
            {data?.map((item: any, index: number) =>
              index >= visiblePhotos ? null : (
                <div className={s['photo']} key={item.id}>
                  <img src={item.img} alt="content" />
                </div>
              ),
            )}
          </div>
        ),
      },
      {
        type: 'collection',
        jsx: (
          <div className={s['row']}>
            <Link to="/achievements" className={s['collection']}>
              <div className={s['collection-icon']}>
                <Icon src={achievementSvg} id={'achieve'} className={'white'} />
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
                <Icon src={arrowSvg} id={'arrow'} className={'white'} />
              </div>
            </Link>
            <Link to="/shop" className={s['collection']}>
              <div className={s['collection-icon']}>
                <Icon src={gemSvg} id={'gem'} className={'white'} />
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
                <Icon src={arrowSvg} id={'arrow'} className={'white'} />
              </div>
            </Link>
            <Link to="/patterns" className={s['collection']}>
              <div className={s['collection-icon']}>
                <Icon src={patternSvg} id={'patterns'} className={'white'} />
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
                <Icon src={arrowSvg} id={'arrow'} className={'white'} />
              </div>
            </Link>
          </div>
        ),
      },
    ];
    return content.find((item) => item.type === contentType)?.jsx;
  };

  const contentVisibleHandler = (contentType: contentType, action: 'get' | 'set') => {
    const stateInfo: {
      type: contentType;
      state: boolean;
      key: string;
    }[] = [
      { type: 'stories', state: isStoriesOpen, key: 'isStoriesOpen' },
      { type: 'friends', state: isFriendsOpen, key: 'isFriendsOpen' },
      { type: 'groups', state: isGroupsOpen, key: 'isGroupsOpen' },
      { type: 'music', state: isMusicOpen, key: 'isMusicOpen' },
      { type: 'videos', state: isVideosOpen, key: 'isVideosOpen' },
      { type: 'photos', state: isPhotosOpen, key: 'isPhotosOpen' },
      { type: 'collection', state: isCollectionOpen, key: 'isCollectionOpen' },
    ];

    const state = stateInfo.find((item) => item.type === contentType)?.state;
    const key = stateInfo.find((item) => item.type === contentType)?.key;

    if (action === 'set') {
      key && setIsOpen((prev) => ({ ...prev, [key]: !state }));
    } else {
      return key;
    }
  };

  return (
    <>
      {(data?.length || contentType === 'collection' || contentType === 'stories') && (
        <div
          className={classNames({
            [s['content-block']]: contentType !== 'photos' && contentType !== 'collection',
            [s['photo-block']]: contentType === 'photos',
          })}>
          {width < 1150 ? (
            <button
              className={s['content-top']}
              onClick={() => contentVisibleHandler(contentType, 'set')}>
              <h5 className={s['sub-title']}>{setTitle(contentType)}</h5>
              <Icon
                src={arrowSvg}
                id={'arrow'}
                className={'profile-arrow'}
                hoverClass={
                  // @ts-ignore
                  isOpen[contentVisibleHandler(contentType, 'get')] ? 'active' : ''
                }
              />
            </button>
          ) : (
            <div
              className={classNames({
                [s['content-top']]: contentType !== 'photos',
                [s['photo-top']]: contentType === 'photos',
              })}>
              <h5 className={s['sub-title']}>{setTitle(contentType)}</h5>
              {contentType === 'photos' && (
                <Link
                  to="/friends"
                  className={classNames({
                    [s['link']]: contentType !== 'photos',
                    [s['photo-link']]: contentType === 'photos',
                  })}>
                  <span className={s['all']}>Показать все</span>
                  <div className={s['arrow']}>
                    <Icon src={arrowSvg} id={'arrow'} className={'white'} />
                  </div>
                  <span className={s['count']}>{data.length}</span>
                </Link>
              )}
            </div>
          )}
          {width > 1150
            ? setContent(data, contentType) // @ts-ignore
            : isOpen[contentVisibleHandler(contentType, 'get')] && setContent(data, contentType)}
        </div>
      )}
    </>
  );
};

export default ProfileContent;
