import React, { useEffect, useRef, useState } from 'react';
import s from '../Header/Header.module.scss';
import sFM from './FastMessages.module.scss';
import sIndicator from '../UI/OnlineIndicator/OnlineIndicator.module.scss';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import ebalo from '../../assets/uploads/test/image.png';
import FastMessagesBtn from './FastMessagesBtn/FastMessagesBtn';
import FastMessagesDropDown from './FastMessagesDropDown/FastMessagesDropDown';
import Input from '../UI/Input/Input';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './../../redux/store';
import { setIsFmsOpen } from '../../redux/dropdowns/slice';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../redux/dropdowns/selector';

const FastMessages: React.FC = () => {
  const chats: {
    id: number;
    name: string;
    img: string;
  }[] = [
    { id: 1, name: 'Олег', img: '../../assets/img/header/ebalo.png' },
    { id: 2, name: 'Паша', img: '../../assets/img/header/ebalo.png' },
    { id: 3, name: 'Дима', img: '../../assets/img/header/ebalo.png' },
  ];

  const dispatch = useAppDispatch();
  const { dropdowns } = useSelector(selectDropdowns);

  const closeHandler = () => {
    dispatch(setIsFmsOpen(false));
  };

  const dropDownRef = useRef<HTMLDivElement>(null);
  const fMsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !e.composedPath().includes(dropDownRef.current) &&
        fMsRef.current &&
        !e.composedPath().includes(fMsRef.current)
      ) {
        closeHandler();
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);
  return (
    <>
      {chats.length ? (
        <div className={sFM['fast-messages']} ref={fMsRef}>
          {chats.map(({ id, name, img }) => {
            return (
              <HeaderAvatar
                hasDelete={true}
                className={'fast-message'}
                key={id}
                img={ebalo}
                indicatorClass={['sm-indicator', 'border-elem']}
                title={name}
                onlineType={'pc-afk'}
              />
            );
          })}
          <FastMessagesBtn className={s['header__messages-btn--wrapped']} />
        </div>
      ) : (
        <FastMessagesBtn className={s['header__messages-btn']} />
      )}
      {dropdowns.isFmsOpen && <FastMessagesDropDown ref={dropDownRef} />}
    </>
  );
};

export default FastMessages;
