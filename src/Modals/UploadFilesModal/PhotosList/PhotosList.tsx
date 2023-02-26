import React from 'react';
import s from './PhotosList.module.scss';
import InputButton from '../../../components/UI/InputButton/InputButton';
import ebalo from '../../../assets/uploads/test/ebalo.png';
import da from '../../../assets/uploads/da.jpg';
import net from '../../../assets/uploads/pasha.png';
import aga from '../../../assets/uploads/test/image2.png';
import { useState } from 'react';

type PhotosListProps = {
  checkboxes: {
    [key: string]: any;
  };
  setCheckboxes: (checkbox: any) => void;
};

const PhotosList: React.FC<PhotosListProps> = ({ checkboxes, setCheckboxes }) => {
  const photos: { id: number; img: string }[] = [
    { id: 1, img: da },
    { id: 2, img: ebalo },
    { id: 3, img: net },
    { id: 4, img: aga },
    { id: 5, img: ebalo },
    { id: 6, img: ebalo },
    { id: 7, img: aga },
    { id: 8, img: ebalo },
    { id: 9, img: ebalo },
    { id: 10, img: aga },
    { id: 11, img: ebalo },
    { id: 12, img: da },
    { id: 13, img: ebalo },
    { id: 14, img: aga },
    { id: 15, img: ebalo },
    { id: 16, img: da },
  ];

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;

    if (!checked) {
      const { [name]: removed, ...rest } = checkboxes;
      setCheckboxes(rest);
    } else {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
    delete checkboxes[''];
  };

  return (
    <ul className={s['photos']}>
      {photos.map(({ id, img }) => (
        <li className={`${s['photo']} ${checkboxes[`photo${id}`] ? s['active'] : ''}`} key={id}>
          <label htmlFor={`photo${id}`}>
            <img src={img} alt="" />
          </label>
          <InputButton
            checked={checkboxes[`photo${id}`] || false}
            onChange={handleCheckboxChange}
            name={`photo${id}`}
            id={`photo${id}`}
            className={'upload-file'}
            type={'checkbox'}
          />
        </li>
      ))}
    </ul>
  );
};

export default PhotosList;
