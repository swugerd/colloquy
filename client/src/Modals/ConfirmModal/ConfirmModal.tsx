import React, { useEffect, useRef, useState } from 'react';
import s from './ConfirmModal.module.scss';
import { useSelector } from 'react-redux';
import { selectModal } from './../../redux/modal/selector';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import { useAppDispatch } from './../../redux/store';
import { setIsConfirmModalOpen } from '../../redux/modal/slice';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const ConfirmModal: React.FC = () => {
  // доделать модалки подтверждения под разные типы

  // везде наставить онклики для модалок

  // доверстать в списках блоки 'ничего не найдено'
  const { modal } = useSelector(selectModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(modalRef, () => dispatch(setIsConfirmModalOpen(false)));

  const [timeout, setTimeout] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setTimeout((prev) => prev - 1), 1000);

    if (timeout === 0) {
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [timeout]);

  const { user, logout } = useAuth();

  const handleDeletePage = async () => {
    logout();
    const { data, status } = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/users/${user && user.id}`,
    });
    dispatch(setIsConfirmModalOpen(false));
  };

  return (
    <div className={s['wrapper']}>
      <div className={s['modal']} ref={modalRef}>
        <h4 className={s['title']}>
          Удалить страницу <span className={s['warn']}>навсегда</span>?
        </h4>
        <p className={s['text']}>
          Вы удалите всю информацию о вашей странице без возможности восстановления.
        </p>
        <div className={s['row']}>
          <button
            className={`${s['back']} ${s['button']}`}
            onClick={() => dispatch(setIsConfirmModalOpen(false))}>
            Нет, я передумал
          </button>
          <button
            className={`${s['confirm-warn']} ${s['button']} ${timeout === 0 ? s['enabled'] : ''}`}
            onClick={handleDeletePage}>
            УДАЛИТЬ {timeout === 0 ? '' : <>({timeout})</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
