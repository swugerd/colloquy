import React from 'react';
import DropDownLayout from '../../UI/DropDownLayout/DropDownLayout';
import s from './NotifyDropDown.module.scss';
import img from '../../../assets/uploads/test/image.png';
import Notify from '../../Notify/Notify';

type NotifyDropDownProps = {
  setIsActive: () => void;
};

const NotifyDropDown: React.FC<NotifyDropDownProps> = ({ setIsActive }) => {
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
    { id: 7, img, name: 'Пашок Кубыркин', action: 'suggest', date, content: 'запись' },
  ];

  return (
    <DropDownLayout
      title="Уведомления"
      link={'/notifies'}
      linkText={'Просмотреть все'}
      isNotify={true}
      setIsActive={setIsActive}>
      {notifies.map(({ id, img, name, action, date, content }) => (
        <Notify
          id={id}
          img={img}
          name={name}
          action={action}
          date={date}
          key={id}
          content={content}
          className={'dropdown'}
          type={'dropdown'}
        />
      ))}
    </DropDownLayout>
  );
};

export default NotifyDropDown;
