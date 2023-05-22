import React from 'react';
import { Link } from 'react-router-dom';
import s from './Notify.module.scss';
import notificationTypes from '../../constants/notificationTypes';
import Icon from '../UI/Icon/Icon';

type NotifyProps = {
  id: number;
  img: string;
  name: string;
  action: string;
  content: string;
  date: string;
  className: string;
  text?: string;
  media?: string;
  type: 'page' | 'dropdown';
};

const Notify: React.FC<NotifyProps> = ({
  id,
  img,
  name,
  action,
  content,
  date,
  className,
  text,
  media,
  type,
}) => {
  const notifyType = notificationTypes.find(({ type }) => type === action);
  console.log(id, media);
  return (
    <div className={`${s['notify']} ${s[className]}`}>
      <div className={s['row']}>
        {notifyType?.type !== 'achieve' ? (
          <div className={s['image']}>
            <img src={img} alt="user" />
            <div className={s['ping']}>
              <Icon src={notifyType?.icon} id={notifyType?.iconId || ''} className={'white'} />
            </div>
          </div>
        ) : (
          'da'
        )}
        <div className={s['info']}>
          <div className={s['top-row']}>
            <Link to="/" className={s['name']}>
              {name}
            </Link>
            <span className={s['date']}>{'22 дня назад'}</span>
          </div>
          <div className={s['bottom-row']}>
            <p className={s['text']}>
              {notifyType?.text}{' '}
              {notifyType?.type !== 'achieve' && (
                <Link className={s['content']} to="">
                  {content}
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
      {(notifyType?.type === 'push' || notifyType?.type === 'comment') && (
        <div className={s['text-preview']}>
          {media && <img className={s['img-preview']} src={media} alt={'media'} />}
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default Notify;
