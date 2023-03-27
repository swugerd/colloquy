import React, { useState } from 'react';
import s from './RegFormSteps.module.scss';
import avatar from '../../assets/img/big-icons/upload-photo.png';
import Button from '../UI/Button/Button';

type ThirdStepProps = {
  user_avatar: string;
  user_avatar_cache: string;
  updateFields: (fields: any) => void;
  onSubmit: (event: any) => void;
};

const ThirdStep: React.FC<ThirdStepProps> = ({
  user_avatar_cache,
  user_avatar,
  updateFields,
  onSubmit,
}) => {
  const [image, setImage] = useState(user_avatar_cache || '');
  const [error, setError] = useState('');

  const handleFileUpload = (e: any) => {
    const selectedImage = e.target.files[0];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(selectedImage?.type)) {
      setError('Неверный формат изображения (png, jpg, jpeg)');
      setImage('');
      updateFields({ user_avatar: '', user_avatar_cache: '' });
      return;
    }
    setImage(URL.createObjectURL(selectedImage));
    setError('');
    updateFields({
      user_avatar: selectedImage,
      user_avatar_cache: URL.createObjectURL(selectedImage),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={s['file-block']}>
        <label className={s['file']} htmlFor="uploadPhoto">
          <div className={`${image ? s['uploaded-photo'] : s['photo']}`}>
            <img src={image ? image : avatar} alt="avatar" />
          </div>
          <p className={s['text']}>
            {image ? (
              <>Вы сегодня восхитительны ;)</>
            ) : (
              <>
                Перетащите или <span>выберите</span> фото
              </>
            )}
          </p>
        </label>
        <input
          className={s['input']}
          type="file"
          name="photo"
          id="uploadPhoto"
          onChange={(e: any) => handleFileUpload(e)}
        />
        {error && <p className={s['error']}>Неверный формат изображения (png, jpg, jpeg)</p>}
        <Button className={'reg-btn'} text={'Регистрация'} />
      </div>
    </form>
  );
};

export default ThirdStep;
