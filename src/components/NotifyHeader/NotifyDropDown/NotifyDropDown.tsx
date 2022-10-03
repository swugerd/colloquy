import React from 'react';
import DropDownLayout from '../../UI/DropDownLayout/DropDownLayout';
import s from './NotifyDropDown.module.scss';
import img from '../../../assets/uploads/test/image.png';
import Notify from '../../Notify/Notify';

const NotifyDropDown: React.FC = () => {
  const date = new Date().toLocaleDateString();
  const notifies = [
    { id: 1, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 2, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 3, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 4, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 5, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 6, img, name: 'Пашок Кубыркин', action: 'ping', date },
    { id: 7, img, name: 'Пашок Кубыркин', action: 'ping', date },
  ];

  return (
    <DropDownLayout
      title="Уведомления"
      link={'/notifies'}
      linkText={'Просмотреть все'}
      isNotify={true}>
      {notifies.map(({ id, img, name, action, date }) => (
        <Notify
          id={id}
          img={img}
          name={name}
          action={action}
          date={date}
          key={id}
          content={'ебанутая беседа лол'}
        />
      ))}
    </DropDownLayout>
  );
};

export default NotifyDropDown;
