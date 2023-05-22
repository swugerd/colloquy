import React from 'react';
import HeaderAvatar from '../../UI/HeaderAvatar/HeaderAvatar';
import s from './FastMessagesItem.module.scss';
import ebalo from '../../../assets/uploads/test/image.png';
import { useAppDispatch } from './../../../redux/store';
import { setFmsComponentIndex } from '../../../redux/dropdowns/slice';

type FastMessagesItemProps = {
  id: any;
  name: string;
  img: string;
};

const FastMessagesItem: React.FC<FastMessagesItemProps> = ({ id, name, img }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={s['chat']} title={name} onClick={() => dispatch(setFmsComponentIndex(id))}>
      <HeaderAvatar
        className="chat-image"
        img={ebalo}
        title={'image'}
        indicatorClass={['sm-indicator', 'border-sub-bg']}
        onlineType="pc-offline"
      />
      <span className={s['chat-name']}>{name}</span>
    </div>
  );
};

export default FastMessagesItem;
