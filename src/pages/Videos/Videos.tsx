import React, { useEffect } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Videos.module.scss';
import Icon from '../../components/UI/Icon/Icon';
import addSvg from '../../assets/img/icons/add.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import video from '../../assets/videos/video.mp4';
import viewsSvg from '../../assets/img/icons/views.svg';
import photo from '../../assets/uploads/test/ebalo.png';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import { Link } from 'react-router-dom';
import { useAppDispatch } from './../../redux/store';
import { setHasAddButton } from '../../redux/mobile/slice';
import { setIsUploadMediaModalOpen, setUploadMediaModalType } from '../../redux/modal/slice';

const Videos: React.FC = () => {
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

  const videos = [
    { id: 1, video, userId: 1 },
    { id: 2, video, userId: 1 },
    { id: 3, video, userId: 1 },
    { id: 4, video, userId: 1 },
    { id: 5, video, userId: 1 },
  ];

  return (
    <div className={s['videos']}>
      <div className={s['top']}>
        <h4 className={s['page-title']}>Мои Видео</h4>
        <button className={s['add-button']} onClick={(e) => handleModalOpen(e)}>
          <Icon src={addSvg} id={'add'} className={'white'} />
        </button>
      </div>
      <ul className={s['videos-list']}>
        {videos.map(({ id, video }) => (
          <li className={s['video-item']} key={id}>
            <div className={s['video-block']}>
              <video src={video} controls></video>
              <button className={s['delete-btn']}>
                <Icon src={trashSvg} id={'trash'} className={'white'} />
              </button>
            </div>
            <div className={s['video-info']}>
              <div className={s['video-row']}>
                <span className={s['video-title']}>
                  собака смотрит dasi dasi dasjikd asjdk asd asd asd as
                </span>
                <div className={s['views']}>
                  <div className={s['views-icon']}>
                    <Icon src={viewsSvg} id={'views'} className={'only-gray'} />
                  </div>
                  <span className={s['views-count']}>1234</span>
                </div>
              </div>
              <div className={`${s['video-row']} ${s['mobile']}`}>
                <Link className={s['video-author']} to="/profile/swugerd">
                  хозяин собаки asd asd asd asdasd asdas das das
                </Link>
                <span className={s['video-date']}>Вчера</span>
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
    </div>
  );
};

export default Videos;
