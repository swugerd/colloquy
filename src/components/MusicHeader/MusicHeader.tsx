import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import music from '../../assets/img/header/music.svg';
import s from './MusicHeader.module.scss';
import MusicDropDown from './MusicDropDown/MusicDropDown';
import useOnClickOutside from './../../hooks/useOnClickOutside';

const MusicHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__music-btn']} ${s['header-hover']} ${isOpen ? s['active'] : ''}`}
      ref={ref}>
      <Link to="/music-dd" onClick={() => setIsOpen(!isOpen)}>
        <img className={s['header-icon']} src={music} alt="music" />
      </Link>
      {isOpen && <MusicDropDown setState={setIsOpen} />}
    </div>
  );
};

export default MusicHeader;
