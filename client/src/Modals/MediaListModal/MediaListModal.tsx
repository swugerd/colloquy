import React, { useState } from 'react';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import s from './MediaListModal.module.scss';
import { useSelector } from 'react-redux';
import { selectModal } from './../../redux/modal/selector';
import editSvg from '../../assets/img/icons/edit.svg';
import markdownSvg from '../../assets/img/icons/markdown.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import avatar from '../../assets/img/big-icons/upload-photo.png';
import photoSvg from '../../assets/img/icons/photos.svg';
import img from '../../assets/uploads/test/image.png';
import video from '../../assets/videos/video.mp4';
import videoSvg from '../../assets/img/icons/videos.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import Icon from '../../components/UI/Icon/Icon';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch } from './../../redux/store';
import { setIsMembersModalOpen } from '../../redux/modal/slice';
import ebalo from '../../assets/uploads/test/image2.png';
import MusicTrack from '../../components/MusicTrack/MusicTrack';

type MediaListModalProps = {
  onClose: () => void;
};

const MediaListModal: React.FC<MediaListModalProps> = ({ onClose }) => {
  const { modal } = useSelector(selectModal);

  const dispatch = useAppDispatch();

  const isNameEdit = true;
  const isAdmin = true;

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsMembersModalOpen(true));
  };

  const tabs = [
    {
      id: 1,
      name: '320 фото',
      iconSettings: {
        id: 'photos',
        src: photoSvg,
        className: 'white',
      },
    },
    {
      id: 2,
      name: '320 видео',
      iconSettings: {
        id: 'videos',
        src: videoSvg,
        className: 'white',
      },
    },
    {
      id: 3,
      name: '320 музыка',
      iconSettings: {
        id: 'music',
        src: musicSvg,
        className: 'white',
      },
    },
  ];

  const images = [
    { id: 1, img },
    { id: 2, img },
    { id: 3, img },
    { id: 4, img },
    { id: 5, img },
    { id: 6, img },
    { id: 7, img },
    { id: 8, img },
    { id: 9, img },
    { id: 10, img },
    { id: 11, img },
  ];
  const videos = [
    { id: 1, video },
    { id: 2, video },
    { id: 3, video },
    { id: 4, video },
    { id: 5, video },
    { id: 6, video },
    { id: 7, video },
    { id: 8, video },
  ];
  const tracks = [
    { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 2, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 3, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 7, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ModalLayout
      className={'media-list'}
      onClose={onClose}
      title={modal.mediaListModal.modalType === 'info' ? 'Информация о беседе' : 'Вложения'}>
      <div className={s['wrapper']}>
        {modal.mediaListModal.modalType === 'info' && (
          <div className={s['info']}>
            {isAdmin ? (
              <>
                <label className={s['default-photo']} htmlFor="avatar">
                  <img src={avatar} alt="" />
                </label>
                <input className={s['inp-none']} type="file" name="avatar" id="avatar" />
              </>
            ) : (
              <div className={s['default-photo']}>
                <img src={avatar} alt="" />
              </div>
            )}
            <div className={s['main-info']}>
              <div className={s['row']}>
                {isNameEdit ? (
                  <>
                    <Input
                      className={'discuss'}
                      placeholder={'Название...'}
                      type={'text'}
                      inputType={'default'}
                      initialValue="вайбер"
                      name={''}
                      value={''}
                      setValue={() => {}}
                    />
                    <button className={s['edit-name']}>
                      <Icon src={markdownSvg} id={'markdown'} className={'white'} />
                    </button>
                    <button className={s['edit-name']}>
                      <Icon src={closeSvg} id={'close'} className={'white'} />
                    </button>
                  </>
                ) : (
                  <>
                    <h6 className={s['discussion-title']}>вайбер</h6>
                    {isAdmin && (
                      <button className={s['edit']}>
                        <Icon src={editSvg} id={'edit'} className={'gray'} />
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className={s['row']}>
                <button className={s['members']} onClick={(e) => handleModalOpen(e)}>
                  <span>99</span>
                  участников
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={s['media']}>
          <ul className={s['tabs']}>
            {tabs.map(({ id, name, iconSettings }, index) => (
              <li className={s['tab']} key={id} onClick={() => setSelectedIndex(index)}>
                <button
                  className={`${s['button-tab']} ${selectedIndex === index ? s['active'] : ''}`}>
                  <div className={s['icon']}>
                    <Icon
                      src={iconSettings.src}
                      id={iconSettings.id}
                      className={iconSettings.className}
                    />
                  </div>
                  <span className={s['tab-text']}>{name}</span>
                </button>
              </li>
            ))}
          </ul>
          {selectedIndex === 0 && (
            <ul
              className={`${
                modal.mediaListModal.modalType === 'info' ? s['media-list'] : s['media-list-media']
              }`}>
              {images.map(({ id, img }) => (
                <li className={s['media-item']} key={id}>
                  <div className={s['media-block']}>
                    <img src={img} alt="" />
                  </div>
                </li>
              ))}
            </ul>
          )}
          {selectedIndex === 1 && (
            <ul
              className={`${
                modal.mediaListModal.modalType === 'info' ? s['media-list'] : s['media-list-media']
              }`}>
              {videos.map(({ id, video }) => (
                <li className={s['media-item']} key={id}>
                  <div className={s['media-block']}>
                    <video src={video}></video>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {selectedIndex === 2 && (
            <ul
              className={`${
                modal.mediaListModal.modalType === 'info' ? s['track-list'] : s['track-list-media']
              }`}>
              {tracks.map(({ id, img, title, author, time }) => (
                <li className={s['media-item']} key={id}>
                  <MusicTrack
                    img={img}
                    title={title}
                    author={author}
                    time={time}
                    isRecs={false}
                    className={'media-modal'}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default MediaListModal;
