import React from 'react';
import s from './Notify.module.scss';

const Notify: React.FC = () => {
  return (
    <div className={`${s.notify} ${s['notify--border']}`}>
      <span className={s.notify__text}>99+</span>
    </div>
  );
};

export default Notify;
