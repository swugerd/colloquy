import React from 'react';
import s from './Notify.module.scss';

type NotifyProps = {
  cName: string;
  count: number;
  hasImage: boolean;
};

const Notify: React.FC<NotifyProps> = ({ cName, count, hasImage }) => {
  return (
    <div className={s[cName]}>
      {hasImage ? <img src="." alt="" /> : count >= 99 ? '99+' : count}
    </div>
  );
};

export default Notify;
