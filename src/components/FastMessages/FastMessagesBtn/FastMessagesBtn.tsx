import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import chat from '../../../assets/img/header/chat.svg';
import s from './FastMessagesBtn.module.scss';

type FastMessagesBtnProps = {
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const FastMessagesBtn: React.FC<FastMessagesBtnProps> = ({ className, onClick }) => {
  return (
    <Link className={className} to="/fms" onClick={onClick}>
      <img
        className={`${s['header__messages-img']} ${s['header-msgs']}`}
        src={chat}
        alt="fast-messages"
      />
    </Link>
  );
};

export default FastMessagesBtn;
