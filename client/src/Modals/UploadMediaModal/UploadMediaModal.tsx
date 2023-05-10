import React, { useEffect, useRef, useState } from 'react';
import s from './UploadMediaModal.module.scss';
import Icon from '../../components/UI/Icon/Icon';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import video from '../../assets/videos/video.mp4';
import closeSvg from '../../assets/img/icons/close.svg';
import Button from '../../components/UI/Button/Button';
import MusicTrack from '../../components/MusicTrack/MusicTrack';
import ebalo from '../../assets/uploads/test/ebalo.png';
import DragAndDropFile from '../../components/DragAndDropFile/DragAndDropFile';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import axios from 'axios';
import { useAxios } from '../../hooks/useAxios';
import { useAppDispatch } from '../../redux/store';
import { setIsUploadMediaModalOpen } from '../../redux/modal/slice';
import Input from '../../components/UI/Input/Input';

type UploadMediaModalProps = {
  onClose: () => void;
  mediaType: 'story' | 'audio' | 'photo' | 'video' | 'files';
};

const UploadMediaModal: React.FC<UploadMediaModalProps> = ({ onClose, mediaType }) => {
  const title = [
    { id: 1, title: 'Создать историю', type: 'story' },
    { id: 2, title: 'Добавить музыку', type: 'audio' },
    { id: 2, title: 'Добавить фото', type: 'photo' },
    { id: 2, title: 'Добавить видео', type: 'video' },
  ].find(({ type }) => type === mediaType)?.title;

  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');

  const [data, setData] = useState<{
    [key: string]: any;
  }>({
    ...(mediaType === 'video' ? { video_name: '' } : {}),
  });

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const uploadPhoto = async () => {
    const response = await axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_HOSTNAME}/api/${mediaType === 'photo' ? 'photos' : 'videos'}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(setIsUploadMediaModalOpen(false));
  };

  const handleFileUpload = (e: any) => {
    const selectedImage = e.target.files[0];
    const allowedMimeTypes =
      mediaType === 'photo' ? ['image/jpeg', 'image/png', 'image/jpg'] : ['video/mp4'];
    if (!allowedMimeTypes.includes(selectedImage?.type)) {
      setImageError(
        mediaType === 'photo'
          ? 'Неверный формат изображения (png, jpg, jpeg)'
          : 'Неверный формат видео (mp4)',
      );
      setImage('');
      setData({
        [mediaType === 'photo' ? 'photo_url' : 'video_url']: '',
        user_id: 0,
        ...(mediaType === 'video' ? { video_name: '' } : {}),
      });
      return;
    }
    setImage(URL.createObjectURL(selectedImage));
    setImageError('');
    setData({
      [mediaType === 'photo' ? 'photo_url' : 'video_url']: selectedImage,
      user_id: userId,
      ...(mediaType === 'video' ? { video_name: data.video_name } : {}),
    });
  };

  const clearInputValue = () => {
    setImage('');
    setData({
      [mediaType === 'photo' ? 'photo_url' : 'video_url']: '',
      user_id: 0,
      ...(mediaType === 'video' ? { video_name: '' } : {}),
    });
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const updateFields = (fields: any) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  return (
    <ModalLayout
      className={mediaType === 'audio' && image ? 'audio' : 'media'}
      onClose={onClose}
      title={title}>
      {image && mediaType === 'photo' && (
        <>
          <div className={s['photo']}>
            <button className={`${s['close']} ${s['shadow']}`} onClick={clearInputValue}>
              <Icon src={closeSvg} id={'close'} className={'white'} />
            </button>
            <img src={image} alt="" />
          </div>
          <Button className={'add-media'} text={'Опубликовать'} onClick={uploadPhoto} />
        </>
      )}

      {image && mediaType === 'video' && (
        <>
          <div className={s['video']}>
            <button className={`${s['close']} ${s['shadow']}`} onClick={clearInputValue}>
              <Icon src={closeSvg} id={'close'} className={'white'} />
            </button>
            <video src={image} controls />
          </div>
          <Input
            className={'video-name'}
            placeholder={'Введите название видео'}
            type={'text'}
            inputType={'default'}
            value={data.video_name}
            setValue={updateFields}
            name={'video_name'}
          />
          <Button className={'add-media'} text={'Опубликовать'} onClick={uploadPhoto} />
        </>
      )}
      {!image && (
        <DragAndDropFile mediaType={mediaType} onChange={handleFileUpload} inputRef={inputRef} />
      )}
      {imageError && <p className={s['error']}>{imageError}</p>}
    </ModalLayout>
  );
};

export default UploadMediaModal;
