import React, { useEffect } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import addSvg from '../../assets/img/icons/add.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import s from './Photos.module.scss';
import photo from '../../assets/uploads/test/ebalo.png';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import { Link } from 'react-router-dom';
import { useAppDispatch } from './../../redux/store';
import { setHasAddButton } from '../../redux/mobile/slice';
import { setIsUploadMediaModalOpen, setUploadMediaModalType } from '../../redux/modal/slice';

const Photos: React.FC = () => {
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

  const photos = [
    { id: 1, photo, userId: 1 },
    { id: 2, photo, userId: 2 },
    { id: 3, photo, userId: 3 },
    { id: 4, photo, userId: 4 },
    { id: 5, photo, userId: 1 },
    { id: 6, photo, userId: 1 },
  ];
  return (
    <div className={s['photos']}>
      <div className={s['top']}>
        <h4 className={s['page-title']}>Мои фотографии</h4>
        <button className={s['add-button']} onClick={(e) => handleModalOpen(e)}>
          <Icon src={addSvg} id={'add'} className={'white'} />
        </button>
      </div>
      <ul className={s['photos-list']}>
        {photos.map(({ id, photo }) => (
          <li className={s['photo-item']} key={id}>
            <div className={s['photo-block']}>
              <img className={s['photo']} src={photo} alt="photography" />
              <button className={s['delete-btn']}>
                <Icon src={trashSvg} id={'trash'} className={'white'} />
              </button>
              <div className={s['photo-info']}>
                <HeaderAvatar
                  className={'photo-block'}
                  img={photo}
                  title={'da'}
                  onlineType={'pc-online'}
                  indicatorClass={['md-indicator', 'border-elem']}
                />
                <div className={s['user-info']}>
                  <Link className={s['user-name']} to="/profile/swugerd">
                    Egor_bdsajkduasjkldjaskdasdasdasda
                  </Link>
                  <span className={s['saved']}>Сохранено 15.02.20</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
