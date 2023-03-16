import React, { useEffect, useRef, useState } from 'react';
import ebalo from '../../../assets/img/header/ebalo.png';
import close from '../../../assets/img/icons/close.svg';
import HeaderAvatar from '../../UI/HeaderAvatar/HeaderAvatar';
import Input from '../../UI/Input/Input';
import s from './FastMessagesDropDown.module.scss';
import inputS from '../../UI/Input/Input.module.scss';
import fullChat from '../../../assets/img/icons/chat-full.svg';
import arrow from '../../../assets/img/icons/arrow.svg';
import FastMessagesItem from '../FastMessagesItem/FastMessagesItem';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import FastMessagesList from './FastMessagesList/FastMessagesList';
import FastMessagesChat from './FastMessagesChat/FastMessagesChat';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../../redux/dropdowns/selector';

type FastMessagesDropDownProps = {
  isOpenHandler?: React.MouseEventHandler<HTMLButtonElement>;
  componentIndexHandler?: React.MouseEventHandler<HTMLButtonElement>;
  componentIndex?: 0 | 1;
};

const FastMessagesDropDown = React.forwardRef<HTMLDivElement, FastMessagesDropDownProps>(
  ({ isOpenHandler, componentIndexHandler, componentIndex }, ref) => {
    const { dropdowns } = useSelector(selectDropdowns);
    return (
      <div ref={ref} className={s.wrapper}>
        {
          dropdowns.fmsComponentIndex === 0 ? (
            <FastMessagesList />
          ) : (
            <FastMessagesChat userId={dropdowns.fmsComponentIndex} />
          )
          // <Routes>
          //   <Route path="/fms" element={<FastMessagesList onClick={onClick} />} />
          //   <Route path="/fms/:dialogId" element={<FastMessagesChat />} />
          // </Routes>
        }
      </div>
    );
  },
);

export default FastMessagesDropDown;
