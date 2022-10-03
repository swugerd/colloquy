import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './Notify.module.scss';
import ping from '../../assets/img/icons/ping.svg';

type NotifyProps = {
  id: number;
  img: string;
  name: string;
  action: string;
  content: string;
  date: string;
};

const Notify: React.FC<NotifyProps> = ({ id, img, name, action, content, date }) => {
  return (
    <div className={s['notify']}>
      <div className={s['image']}>
        <img src={img} alt="user" />
        <div className={s['ping']}>
          <img src={ping} alt="ping" />
        </div>
      </div>
      <div className={s['info']}>
        <div className={s['top-row']}>
          <Link to="/" className={s['name']}>
            {name}
          </Link>
          <span className={s['date']}>{'2 дня назад'}</span>
        </div>
        <div className={s['bottom-row']}>
          <p className={s['text']}>
            Упомянул тебя в выфо врыфов <span className={s['content']}>{content}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notify;
