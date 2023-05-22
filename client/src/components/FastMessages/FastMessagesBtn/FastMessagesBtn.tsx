import React from 'react';
import chatSvg from '../../../assets/img/icons/chat.svg';
import Icon from '../../UI/Icon/Icon';
import s from './FastMessagesBtn.module.scss';
import { useAppDispatch } from './../../../redux/store';
import { setIsFmsOpen } from '../../../redux/dropdowns/slice';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../../redux/dropdowns/selector';

type FastMessagesBtnProps = {
  className: string;
};

const FastMessagesBtn: React.FC<FastMessagesBtnProps> = ({ className }) => {
  const { dropdowns } = useSelector(selectDropdowns);
  const dispatch = useAppDispatch();
  return (
    <button className={className} onClick={() => dispatch(setIsFmsOpen(!dropdowns.isFmsOpen))}>
      <div className={s['header__messages-img']}>
        <Icon src={chatSvg} id={'messages'} className={'header-messages'} />
      </div>
    </button>
  );
};

export default FastMessagesBtn;
