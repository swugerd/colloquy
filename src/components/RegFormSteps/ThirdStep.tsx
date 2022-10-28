import React, { useState } from 'react';
import s from './RegFormSteps.module.scss';
import avatar from '../../assets/img/big-icons/upload-photo.png';

const ThirdStep: React.FC = () => {
  const [hasFile, setHasFile] = useState(false);
  return (
    <div className={s['file-block']}>
      <label className={s['file']} htmlFor="uploadPhoto">
        <div className={`${hasFile ? s['uploaded-photo'] : s['photo']}`}>
          <img src={avatar} alt="avatar" />
        </div>
        <p className={s['text']}>
          {hasFile ? (
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
        onChange={() => setHasFile(true)}
      />
    </div>
  );
};

export default ThirdStep;
