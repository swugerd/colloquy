import React, { useRef } from 'react';
import musicSvg from '../../assets/img/icons/music.svg';
import s from './MusicHeader.module.scss';
import MusicDropDown from './MusicDropDown/MusicDropDown';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';
import { useAppDispatch } from './../../redux/store';
import { setIsMusicOpen } from '../../redux/dropdowns/slice';
import { useSelector } from 'react-redux';
import { selectDropdowns } from '../../redux/dropdowns/selector';

const MusicHeader: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { dropdowns } = useSelector(selectDropdowns);

  useOnClickOutside(ref, () => dispatch(setIsMusicOpen(false)));

  return (
    <div
      className={`${s['header__music-btn']} ${s['header-hover']} ${
        dropdowns.isMusicOpen ? s['active'] : ''
      }`}
      ref={ref}>
      <button onClick={() => dispatch(setIsMusicOpen(!dropdowns.isMusicOpen))}>
        <Icon src={musicSvg} id={'music'} className={'header-icon'} />
      </button>
      {dropdowns.isMusicOpen && <MusicDropDown />}
    </div>
  );
};

export default MusicHeader;
