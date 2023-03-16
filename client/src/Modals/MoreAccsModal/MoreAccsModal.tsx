import React from 'react';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import s from './MoreAccsModal.module.scss';
import { useAppDispatch } from '../../redux/store';
import AccountCard from '../../components/AccountCard/AccountCard';
import { setIsMoreAccsModalOpen } from '../../redux/modal/slice';
import { useSelector } from 'react-redux';
import { selectModal } from '../../redux/modal/selector';

type MoreAccsModalProps = {
  onClose: () => any;
};

const MoreAccsModal: React.FC<MoreAccsModalProps> = ({ onClose }) => {
  const { modal } = useSelector(selectModal);
  return (
    <ModalLayout className="accounts-modal" onClose={onClose}>
      <ul className={s['modal-list']}>
        {modal.moreAccsModal.accounts.map(({ id, img, name }) => (
          <li key={id}>
            <AccountCard id={id} name={name} img={img} className="modal-card" />
          </li>
        ))}
      </ul>
    </ModalLayout>
  );
};

export default MoreAccsModal;
