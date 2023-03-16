import React, { useRef } from 'react';
import s from './ConfirmModal.module.scss';
import { useSelector } from 'react-redux';
import { selectModal } from './../../redux/modal/selector';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import { useAppDispatch } from './../../redux/store';
import { setIsConfirmModalOpen } from '../../redux/modal/slice';

const ConfirmModal: React.FC = () => {
  // доделать модалки подтверждения под разные типы

  // везде наставить онклики для модалок

  // доверстать в списках блоки 'ничего не найдено'
  const { modal } = useSelector(selectModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(modalRef, () => dispatch(setIsConfirmModalOpen(false)));
  return (
    <div className={s['wrapper']}>
      <div className={s['modal']} ref={modalRef}>
        dasjkdjaslkdas
      </div>
    </div>
  );
};

export default ConfirmModal;
