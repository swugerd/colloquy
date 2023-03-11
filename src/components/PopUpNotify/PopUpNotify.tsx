import React from 'react';
import { Notifies } from '../../types';
import s from './PopUpNotify.module.scss';
import notificationTypes from './../../constants/notificationTypes';
import Icon from '../UI/Icon/Icon';

type PopUpNotifyProps = {
  type: Notifies;
  user: { img: string; name: string };
  content: string;
  previewMeida?: string;
};

const PopUpNotify: React.FC<PopUpNotifyProps> = ({ type, user, content, previewMeida }) => {
  const notifyType = notificationTypes.find((notify) => notify.type === type);
  return (
    <div className={s['notify']}>
      <div className={s['user-img']}>
        <img src={user.img} alt="" />
        <div className={s['notify-type']}>
          <Icon src={notifyType?.icon} id={notifyType?.iconId || ''} className={'white'} />
        </div>
      </div>
      <div className={s['info']}>
        <span className={s['user-name']}>{user.name}</span>
        <p className={s['text']}>
          {notifyType?.text} <span className={s['content']}>{content}</span>
        </p>
      </div>
      {previewMeida && (
        <div className={s['preview-media']}>
          <img src={previewMeida} alt="" />
        </div>
      )}
    </div>
  );
};

export default PopUpNotify;
