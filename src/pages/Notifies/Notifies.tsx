import React from 'react';
import SideContent from '../../components/SideContent/SideContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Notifies.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import InputButton from '../../components/UI/InputButton/InputButton';
import Icon from '../../components/UI/Icon/Icon';
import allSvg from '../../assets/img/icons/all.svg';
import pushSvg from '../../assets/img/icons/push.svg';
import forwardSvg from '../../assets/img/icons/forward.svg';
import commentsSvg from '../../assets/img/icons/comment.svg';
import likesSvg from '../../assets/img/icons/like.svg';
import achievesSvg from '../../assets/img/icons/achieve.svg';
import suggestSvg from '../../assets/img/icons/suggest.svg';
import requestsSvg from '../../assets/img/icons/request.svg';
import { useState, useEffect } from 'react';
import Notify from '../../components/Notify/Notify';
import img from '../../assets/uploads/test/image.png';
import { useAppDispatch } from './../../redux/store';
import { setHasArrowButton } from '../../redux/mobile/slice';

const Notifies: React.FC = () => {
  useSetPageTitle('Уведомления');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHasArrowButton(true));
    return () => {
      dispatch(setHasArrowButton(false));
    };
  }, []);

  const settings = [
    {
      id: 1,
      name: 'Все Уведомления',
      iconSettings: {
        src: allSvg,
        iconId: 'all',
        className: 'all',
      },
    },
    {
      id: 2,
      name: 'Упоминания',
      iconSettings: {
        src: pushSvg,
        iconId: 'push',
        className: 'push',
      },
    },
    {
      id: 3,
      name: 'Репосты',
      iconSettings: {
        src: forwardSvg,
        iconId: 'forward',
        className: 'forward',
      },
    },
    {
      id: 4,
      name: 'Комментарии',
      iconSettings: {
        src: commentsSvg,
        iconId: 'comments',
        className: 'comments',
      },
    },
    {
      id: 5,
      name: 'Лайки',
      iconSettings: {
        src: likesSvg,
        iconId: 'like',
        className: 'like',
      },
    },
    // {
    //   id: 6,
    //   name: 'Достижения',
    //   iconSettings: {
    //     src: achievesSvg,
    //     iconId: 'achieve',
    //     className: 'achieve',
    //   },
    // },
    {
      id: 7,
      name: 'Заявки',
      iconSettings: {
        src: requestsSvg,
        iconId: 'request',
        className: 'request',
      },
    },
    {
      id: 8,
      name: 'Предложка',
      iconSettings: {
        src: suggestSvg,
        iconId: 'suggest',
        className: 'suggest',
      },
    },
  ];

  const date = new Date().toLocaleDateString();

  const notifies = [
    {
      id: 1,
      img,
      name: 'Рабадонович Скамерулиовичграфович',
      action: 'push',
      date,
      content: 'ебанутая беседа лол',
      text: 'енкре спасибо за геншин импакт бразер дилюк скин норм данж das das ds adsd asd asd a dsaadsa',
    },
    { id: 2, img, name: 'Пашок Кубыркин', action: 'forward', date, content: 'записью' },
    {
      id: 3,
      img,
      name: 'Пашок Кубыркин',
      action: 'comment',
      date,
      content: 'фотографии',
      media: img,
      text: 'енкре спасибо за геншин импакт дилюк скин норм данж ответь',
    },
    { id: 4, img, name: 'Пашок Кубыркин', action: 'like', date, content: 'фотографии' },
    {
      id: 6,
      img,
      name: 'Пашок Кубыркин',
      action: 'request',
      date,
      content: 'очень крутая группа прикинь',
    },
  ];

  const [typeIndex, setTypeIndex] = useState(0);

  const children = [
    <div className={`${sideContentS['options']}`} key={2}>
      <div className={sideContentS['group']}>
        {settings.map(({ id, name, iconSettings }, index) => (
          <div
            className={`${sideContentS['option']} ${
              typeIndex === index ? sideContentS['active'] : ''
            }`}
            onClick={() => setTypeIndex(index)}
            key={id}>
            <div className={sideContentS['option-icon']}>
              <Icon
                src={iconSettings.src}
                id={iconSettings.iconId}
                className={iconSettings.className}
                hoverClass={typeIndex === index ? 'active' : ''}
              />
            </div>
            <span className={sideContentS['option-name']}>{name}</span>
            <InputButton
              checked={typeIndex === index}
              onChange={() => setTypeIndex(index)}
              className="relative"
              name={'type'}
              id={''}
              type={'radio'}
            />
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <>
      <div className={s['notifies']}>
        <h4 className={s['title']}>Уведомления</h4>
        <ul className={s['list']}>
          {notifies.map(({ id, img, name, action, date, content, text, media }) => (
            <li className={s['notify']} key={id}>
              <Notify
                id={id}
                img={img}
                name={name}
                action={action}
                content={content}
                date={date}
                className={'page'}
                text={text}
                media={media}
                type={'page'}
              />
            </li>
          ))}
        </ul>
      </div>
      <SideContent className={'notifies'} titles={['Фильтр уведомлений']}>
        {children}
      </SideContent>
    </>
  );
};

export default Notifies;
