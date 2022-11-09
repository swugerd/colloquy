import React from 'react';
import HeaderAvatar from '../../UI/HeaderAvatar/HeaderAvatar';
import s from './FastMessagesItem.module.scss';
import sIndicator from '../../UI/OnlineIndicator/OnlineIndicator.module.scss';
import ebalo from '../../../assets/uploads/test/image.png';
import { Link } from 'react-router-dom';

type FastMessagesItemProps = {
  id: any;
  name: string;
  img: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const FastMessagesItem: React.FC<FastMessagesItemProps> = ({ id, name, img, onClick }) => {
  return (
    <Link className={s['chat']} to={`/fms/${id}`} title={name}>
      <HeaderAvatar
        className="chat-image"
        img={ebalo}
        title={'image'}
        indicatorClass={['sm-indicator', 'border-sub-bg']}
        onlineType="pc-offline"
      />
      <span className={s['chat-name']}>{name}</span>
    </Link>
  );
};

export default FastMessagesItem;
