import React from 'react';
import s from './MembersModal.module.scss';
import ModalLayout from './../../layouts/ModalLayout/ModalLayout';
import Input from '../../components/UI/Input/Input';
import img from '../../assets/uploads/test/image.png';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import closeSvg from '../../assets/img/icons/close.svg';
import crownSvg from '../../assets/img/icons/crown.svg';
import { Link } from 'react-router-dom';
import Icon from '../../components/UI/Icon/Icon';

type MembersModalProps = {
  onClose: () => void;
};

const MembersModal: React.FC<MembersModalProps> = ({ onClose }) => {
  const members = [
    { id: 1, img, name: 'Egor_B', isModerator: true },
    { id: 2, img, name: 'Egor_B', isModerator: true },
    { id: 3, img, name: 'Egor_B', isModerator: true },
    { id: 4, img, name: 'Egor_B', isModerator: false },
    { id: 5, img, name: 'Egor_B', isModerator: true },
    { id: 6, img, name: 'Egor_B', isModerator: false },
    { id: 7, img, name: 'Egor_B', isModerator: false },
  ];

  const isAdmin = true;
  return (
    <ModalLayout className={'members'} onClose={onClose} title="Участники" hasBackButton={true}>
      <Input
        className={'members-modal'}
        placeholder={'Начните вводить'}
        type={'text'}
        inputType={'search'}
        name={''}
        value={''}
        setValue={() => {}}
      />
      <ul className={s['members-list']}>
        {members.map(({ id, img, name, isModerator }) => (
          <li className={s['member-item']} key={id}>
            <Link className={s['user-link']} to={'/profile/swugerd'}>
              <HeaderAvatar
                className={'members-modal'}
                img={img}
                title={name}
                indicatorClass={['md-indicator', 'border-elem']}
                onlineType={'pc-online'}
              />
              <span className={'user-name'}>{name}</span>
            </Link>
            {isAdmin && !isModerator && (
              <button className={s['action-btn']}>
                <Icon src={crownSvg} id={'crown'} className={'white'} />
              </button>
            )}
            {isAdmin && (
              <button className={s['action-btn']}>
                <Icon src={closeSvg} id={'close'} className={'white'} />
              </button>
            )}
            {isModerator && (
              <button className={s['admin']}>
                <Icon src={crownSvg} id={'crown'} className={'white'} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </ModalLayout>
  );
};

export default MembersModal;
