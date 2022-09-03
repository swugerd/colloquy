import React from 'react';
import chat from '../../assets/img/header/chat.svg';
import s from '../Header/Header.module.scss';
import sFM from './FastMessages.module.scss';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import ebalo from '../../assets/img/header/ebalo.png';

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
  return (
    <>
      {chats.length ? (
        <div className={sFM['fast-messages']}>
          {chats.map(({ id, name, img }) => (
            <HeaderAvatar
              hasIndicator={false}
              hasDelete={true}
              className={sFM['fast-message']}
              key={id}
              img={ebalo}
              title={name}
            />
          ))}
          <button className={s['header__messages-btn--wrapped']}>
            <img
              className={`${s['header__messages-img']} ${s['header-msgs']}`}
              src={chat}
              alt="fast-messages"
            />
          </button>
        </div>
      ) : (
        <button className={s['header__messages-btn']}>
          <img
            className={`${s['header__messages-img']} ${s['header-msgs']}`}
            src={chat}
            alt="fast-messages"
          />
        </button>
      )}
    </>
  );
};

export default FastMessages;
