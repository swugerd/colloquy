import React, { useEffect, useRef, useState } from 'react';
import s from './ConfirmModal.module.scss';
import { useSelector } from 'react-redux';
import { selectModal } from './../../redux/modal/selector';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import { useAppDispatch } from './../../redux/store';
import { setIsConfirmModalOpen } from '../../redux/modal/slice';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';

const ConfirmModal: React.FC = () => {
  const { modal } = useSelector(selectModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(modalRef, () => dispatch(setIsConfirmModalOpen(false)));

  const [timeout, setTimeout] = useState(10);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const groupRoute = pathname.split('/')[pathname.split('/').length - 2];

  const { response: group } = useAxios({
    method: 'get',
    url: groupRoute ? `${process.env.REACT_APP_HOSTNAME}/api/groups/getByAdress/${groupRoute}` : '',
  });

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

  const handleDeleteGroup = async () => {
    navigate('/groups');
    const { data, status } = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/groups/${group && group.id}`,
    });
    dispatch(setIsConfirmModalOpen(false));
  };

  return (
    <div className={s['wrapper']}>
      <div className={s['modal']} ref={modalRef}>
        <h4 className={s['title']}>
          {modal.confirmModal.modalType === 'groupDelete' ? (
            <>
              Удалить группу <span className={s['warn']}>навсегда</span>?
            </>
          ) : (
            <>
              Удалить страницу <span className={s['warn']}>навсегда</span>?
            </>
          )}
        </h4>
        {modal.confirmModal.modalType === 'groupDelete' ? (
          <p className={s['text']}>
            Вы удалите всю информацию о вашей группе без возможности восстановления.
          </p>
        ) : (
          <p className={s['text']}>
            Вы удалите всю информацию о вашей странице без возможности восстановления.
          </p>
        )}
        <div className={s['row']}>
          <button
            className={`${s['back']} ${s['button']}`}
            onClick={() => dispatch(setIsConfirmModalOpen(false))}>
            Нет, я передумал
          </button>
          <button
            className={`${s['confirm-warn']} ${s['button']} ${timeout === 0 ? s['enabled'] : ''}`}
            onClick={
              modal.confirmModal.modalType === 'pageDelete' ? handleDeletePage : handleDeleteGroup
            }>
            УДАЛИТЬ {timeout === 0 ? '' : <>({timeout})</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
