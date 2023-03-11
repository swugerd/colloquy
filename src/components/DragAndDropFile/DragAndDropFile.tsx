import React from 'react';
import s from './DragAndDropFile.module.scss';
import Icon from '../UI/Icon/Icon';
import mediaSvg from '../../assets/img/icons/media.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import useWindowSize from './../../hooks/useWindowResize';
import uploadSvg from '../../assets/img/icons/upload.svg';

type DragAndDropFileProps = {
  mediaType: 'story' | 'audio' | 'files' | 'photo' | 'video';
};

const DragAndDropFile: React.FC<DragAndDropFileProps> = ({ mediaType }) => {
  const { width } = useWindowSize();
  return (
    <div className={s['border-file']}>
      <div className={s['media-icon']}>
        {mediaType === 'story' && <Icon src={mediaSvg} id={'media'} className={'white'} />}
        {mediaType === 'audio' && <Icon src={musicSvg} id={'music'} className={'white'} />}
        {mediaType === 'photo' && <Icon src={mediaSvg} id={'media'} className={'white'} />}
        {mediaType === 'video' && <Icon src={mediaSvg} id={'media'} className={'white'} />}
        {mediaType === 'files' && <Icon src={uploadSvg} id={'upload'} className={'white'} />}
      </div>
      <p className={s['modal-text']}>
        <span className={s['d-none']}>
          Перетащите {mediaType === 'story' && 'фото или видео'}
          {mediaType === 'audio' && 'музыку'}
          {mediaType === 'files' && 'файлы'}
          {mediaType === 'photo' && 'фото'}
          {mediaType === 'video' && 'видео'} сюда
        </span>
        <span className={s['d-none']}>или</span>
        <label className={s['green']} htmlFor={'story'}>
          Выберите {width > 1150 ? 'вручную' : 'файл'}
        </label>
        <input className={s['inv-input']} type="file" id="story" />
      </p>
    </div>
  );
};

export default DragAndDropFile;
