import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import chatSvg from '../../../assets/img/icons/chat.svg';
import Icon from '../../UI/Icon/Icon';
import s from './FastMessagesBtn.module.scss';

type FastMessagesBtnProps = {
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const FastMessagesBtn: React.FC<FastMessagesBtnProps> = ({ className, onClick }) => {
  return (
    <Link className={className} to="/fms" onClick={onClick}>
      <div className={s['header__messages-img']}>
        <Icon src={chatSvg} id={'messages'} className={'header-messages'} />
      </div>
    </Link>
  );
};

export default FastMessagesBtn;
