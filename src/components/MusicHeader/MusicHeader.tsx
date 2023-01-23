import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import musicSvg from '../../assets/img/icons/music.svg';
import s from './MusicHeader.module.scss';
import MusicDropDown from './MusicDropDown/MusicDropDown';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';

const MusicHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__music-btn']} ${s['header-hover']} ${isOpen ? s['active'] : ''}`}
      ref={ref}>
      <Link to="/music-dd" onClick={() => setIsOpen(!isOpen)}>
        <Icon src={musicSvg} id={'music'} className={'header-icon'} />
      </Link>
      {isOpen && <MusicDropDown setState={setIsOpen} />}
    </div>
  );
};

export default MusicHeader;
