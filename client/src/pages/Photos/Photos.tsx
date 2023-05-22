import React, { useEffect } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import addSvg from '../../assets/img/icons/add.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import s from './Photos.module.scss';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from './../../redux/store';
import { setHasAddButton } from '../../redux/mobile/slice';
import { setIsUploadMediaModalOpen, setUploadMediaModalType } from '../../redux/modal/slice';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../../hooks/useAuth';
import moment from 'moment';
import Preloader from '../../components/Preloader/Preloader';
import axios from 'axios';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';

type PhotosProps = {
  pageType: 'profile' | 'group';
};

const Photos: React.FC<PhotosProps> = ({ pageType }) => {
  useSetPageTitle('Фотографии');

  const dispatch = useAppDispatch();

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsUploadMediaModalOpen(true));
    dispatch(setUploadMediaModalType('photo'));
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
    response: photos,
    error: photosError,
    isLoading: isPhotosLoading,
    setResponse: setPhotos,
  } = useAxios({
    method: 'get',
    url: user && `${process.env.REACT_APP_HOSTNAME}/api/photos/${user.id}?type=user`,
  });

  const handleDeletePhoto = async (photoId: number) => {
    const deletedPhoto = await axios.request({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/photos/${photoId}`,
    });

    const updatedPhotos = await axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/photos/${user.id}?type=user`,
    });

    setPhotos(updatedPhotos.data);
  };

  const {
    user: { id: currentUserId },
  } = useSelector(selectIsAuth);

  return (
    <div className={s['photos']}>
      <div className={s['top']}>
        <h4 className={s['page-title']}>
          {pageType === 'profile' && currentUserId && user && currentUserId === user.id ? (
            'Мои фотографии'
          ) : currentUserId && user && currentUserId !== user.id ? (
            <>
              Фотографии - <span className={s['green']}>{user.user_name}</span>
            </>
          ) : (
            <>
              Фотографии - <span className={s['green']}>colloquy</span>
            </>
          )}
        </h4>
        {currentUserId && user && user.id === currentUserId && (
          <button className={s['add-button']} onClick={(e) => handleModalOpen(e)}>
            <Icon src={addSvg} id={'add'} className={'white'} />
          </button>
        )}
      </div>
      {photos?.length && user ? (
        <ul className={s['photos-list']}>
          {photos.map((photo: any) => (
            <li className={s['photo-item']} key={photo.id}>
              <div className={s['photo-block']}>
                <img
                  className={s['photo']}
                  src={`${process.env.REACT_APP_HOSTNAME}/${photo.photo_url}`}
                  alt="photography"
                />
                {!!(currentUserId && user && currentUserId === user.id) ? (
                  <button className={s['delete-btn']} onClick={() => handleDeletePhoto(photo.id)}>
                    <Icon src={trashSvg} id={'trash'} className={'white'} />
                  </button>
                ) : (
                  ''
                )}
                <div className={s['photo-info']}>
                  <Link to={`/profile/${photo.user.user_nickname}`}>
                    <HeaderAvatar
                      className={'photo-block'}
                      img={photo.user.user_avatar}
                      title={photo.user.user_name}
                      onlineType={photo.user.online_type}
                      indicatorClass={['md-indicator', 'border-elem']}
                    />
                  </Link>
                  <div className={s['user-info']}>
                    <Link className={s['user-name']} to={`/profile/${photo.user.user_nickname}`}>
                      {photo.user.user_name}
                    </Link>
                    <span className={s['saved']}>
                      Добавлено {moment(photo.createdAt).locale('ru').fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : photos && user && currentUserId && photos?.length === 0 ? (
        <NotFoundBlock
          className={'media-page'}
          text={currentUserId === user.id ? 'У вас ещё нету фото' : `У пользователя ещё нету фото`}
        />
      ) : (
        <Preloader className="media-page" />
      )}
    </div>
  );
};

export default Photos;
