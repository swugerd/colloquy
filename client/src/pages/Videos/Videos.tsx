import React, { useEffect } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Videos.module.scss';
import Icon from '../../components/UI/Icon/Icon';
import addSvg from '../../assets/img/icons/add.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import viewsSvg from '../../assets/img/icons/views.svg';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from './../../redux/store';
import { setHasAddButton } from '../../redux/mobile/slice';
import { setIsUploadMediaModalOpen, setUploadMediaModalType } from '../../redux/modal/slice';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../../hooks/useAuth';
import axios from 'axios';
import { selectIsAuth } from '../../redux/auth/selector';
import { useSelector } from 'react-redux';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import Preloader from '../../components/Preloader/Preloader';
import moment from 'moment';

type VideosProps = {
  pageType: 'profile' | 'group';
};

const Videos: React.FC<VideosProps> = ({ pageType }) => {
  useSetPageTitle('Видео');

  const dispatch = useAppDispatch();

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsUploadMediaModalOpen(true));
    dispatch(setUploadMediaModalType('video'));
  };

  useEffect(() => {
    dispatch(setHasAddButton(true));
    return () => {
      dispatch(setHasAddButton(false));
    };
  }, []);

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
    response: videos,
    error: videosError,
    isLoading: isVideosLoading,
    setResponse: setPhotos,
  } = useAxios({
    method: 'get',
    url: user && `${process.env.REACT_APP_HOSTNAME}/api/videos/${user.id}?type=user`,
  });

  const handleDeleteVideo = async (videoId: number) => {
    const deletedVideo = await axios.request({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/videos/${videoId}`,
    });

    const updatedVideos = await axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/videos/${user.id}?type=user`,
    });

    setPhotos(updatedVideos.data);
  };

  const {
    user: { id: currentUserId },
  } = useSelector(selectIsAuth);

  return (
    <div className={s['videos']}>
      <div className={s['top']}>
        <h4 className={s['page-title']}>
          {pageType === 'profile' && currentUserId && user && currentUserId === user.id ? (
            'Мои Видео'
          ) : currentUserId && user && currentUserId !== user.id ? (
            <>
              Видео - <span className={s['green']}>{user.user_name}</span>
            </>
          ) : (
            <>
              Видео - <span className={s['green']}>colloquy</span>
            </>
          )}
        </h4>
        {!!(currentUserId && user && user.id === currentUserId) && (
          <button className={s['add-button']} onClick={(e) => handleModalOpen(e)}>
            <Icon src={addSvg} id={'add'} className={'white'} />
          </button>
        )}
      </div>
      {videos?.length && user ? (
        <ul className={s['videos-list']}>
          {videos.map((video: any) => (
            <li className={s['video-item']} key={video.id}>
              <div className={s['video-block']}>
                <video
                  src={`${process.env.REACT_APP_HOSTNAME}/${video.video_url}`}
                  controls></video>
                {currentUserId && user && currentUserId === user.id ? (
                  <button className={s['delete-btn']} onClick={() => handleDeleteVideo(video.id)}>
                    <Icon src={trashSvg} id={'trash'} className={'white'} />
                  </button>
                ) : (
                  ''
                )}
              </div>
              <div className={s['video-info']}>
                <div className={s['video-row']}>
                  <span className={s['video-title']}>{video.video_name}</span>
                  <div className={s['views']}>
                    <div className={s['views-icon']}>
                      <Icon src={viewsSvg} id={'views'} className={'only-gray'} />
                    </div>
                    <span className={s['views-count']}>1234</span>
                  </div>
                </div>
                <div className={`${s['video-row']} ${s['mobile']}`}>
                  <Link className={s['video-author']} to={`/profile/${video.user.user_nickname}`}>
                    {video.user.user_name}
                  </Link>
                  <span className={s['video-date']}>
                    {moment(video.createdAt).locale('ru').fromNow()}
                  </span>
                </div>
                <div className={`${s['views']} ${s['mobile']}`}>
                  <div className={s['views-icon']}>
                    <Icon src={viewsSvg} id={'views'} className={'only-gray'} />
                  </div>
                  <span className={s['views-count']}>123</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : videos && user && currentUserId && videos?.length === 0 ? (
        <NotFoundBlock
          className={'media-page'}
          text={
            currentUserId === user.id ? 'У вас ещё нету видео' : `У пользователя ещё нету видео`
          }
        />
      ) : (
        <Preloader className="media-page" />
      )}
    </div>
  );
};

export default Videos;
