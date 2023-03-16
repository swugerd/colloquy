import React from 'react';
import s from './UploadFilesModal.module.scss';
import ModalLayout from './../../layouts/ModalLayout/ModalLayout';
import photosSvg from '../../assets/img/icons/photos.svg';
import videosSvg from '../../assets/img/icons/videos.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import uploadSvg from '../../assets/img/icons/upload.svg';
import Icon from '../../components/UI/Icon/Icon';
import Input from '../../components/UI/Input/Input';
import { useState } from 'react';
import PhotosList from './PhotosList/PhotosList';
import VideosList from './VideosList/VideosList';
import MusicList from './MusicList/MusicList';
import DragAndDropFile from './../../components/DragAndDropFile/DragAndDropFile';

type UploadFilesModalProps = {
  onClose: () => void;
};

const UploadFilesModal: React.FC<UploadFilesModalProps> = ({ onClose }) => {
  const items = [
    {
      id: 1,
      name: 'Фото',
      iconSettings: {
        src: photosSvg,
        iconId: 'photos',
        className: 'photos',
      },
    },
    {
      id: 2,
      name: 'Видео',
      iconSettings: {
        src: videosSvg,
        iconId: 'videos',
        className: 'videos',
      },
    },
    {
      id: 3,
      name: 'Музыка',
      iconSettings: {
        src: musicSvg,
        iconId: 'music',
        className: 'music',
      },
    },
    {
      id: 4,
      name: 'Свои файлы',
      iconSettings: {
        src: uploadSvg,
        iconId: 'upload',
        className: 'upload',
      },
    },
  ];

  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);

  const handleModalRoute = (index: number) => {
    setSelectedComponentIndex(index);
    setCheckboxes({});
  };

  const [checkboxes, setCheckboxes] = useState<{
    [key: string]: any;
  }>({});

  const components = [
    {
      id: 1,
      component: <PhotosList checkboxes={checkboxes} setCheckboxes={setCheckboxes} />,
      type: 'фото',
    },
    {
      id: 2,
      component: <VideosList checkboxes={checkboxes} setCheckboxes={setCheckboxes} />,
      type: 'видео',
    },
    {
      id: 3,
      component: <MusicList checkboxes={checkboxes} setCheckboxes={setCheckboxes} />,
      type: 'трек',
    },
    {
      id: 4,
      component: <DragAndDropFile mediaType={'files'} />,
      type: 'file',
    },
  ];

  const contentType = components[selectedComponentIndex].type;

  const selectedFilesLength = Object.keys(checkboxes).length;

  // сделать адапитив для всей модалки

  const wordDeclension = (value: number, words: string[]) => {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  return (
    <ModalLayout className={'files'} onClose={onClose} title="Добавить файлы">
      <div className={s['top']}>
        <ul className={s['list']}>
          {items.map(({ id, name, iconSettings }, index) => (
            <li
              className={`${s['item']} ${items.length - 1 === index ? s['last'] : ''} ${
                selectedComponentIndex === index ? s['active'] : ''
              }`}
              key={id}
              onClick={() => handleModalRoute(index)}>
              <button>
                <div className={s['item-icon']}>
                  <Icon
                    src={iconSettings.src}
                    id={iconSettings.iconId}
                    className={iconSettings.className}
                  />
                </div>
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(contentType === 'видео' || contentType === 'трек') && (
        <div className={s['search']}>
          <Input
            className={'upload-files'}
            placeholder={`Искать ${contentType}`}
            type={'text'}
            inputType={'search'}
          />
        </div>
      )}
      <div
        className={`${s['content']} ${
          components[selectedComponentIndex].type === 'file' ? s['center'] : ''
        }`}>
        {components[selectedComponentIndex].component}
      </div>
      {
        <div className={`${s['bottom']} ${selectedFilesLength ? '' : s['d-none']}`}>
          <button className={s['reset']} onClick={() => setCheckboxes({})}>
            Отменить
          </button>
          <button className={s['upload']}>
            Добавить <span>{selectedFilesLength}</span>{' '}
            <span>
              {contentType === 'трек'
                ? wordDeclension(selectedFilesLength, ['трек', 'трека', 'треков'])
                : contentType}
            </span>
          </button>
        </div>
      }
    </ModalLayout>
  );
};

export default UploadFilesModal;
