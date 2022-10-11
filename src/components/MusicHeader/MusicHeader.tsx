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
        <svg
          className={s['header-icon']}
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 2.89504V21.1492C7 21.3763 7.07728 21.5966 7.21913 21.7739C7.80964 22.5121 9 22.0945 9 21.1492V8.89858C9 8.38753 9.38533 7.95871 9.89347 7.90427L21.8935 6.61856C22.4845 6.55523 23 7.01842 23 7.61287V19.5858C23 19.851 23.1054 20.1054 23.2929 20.2929C23.9229 20.9229 25 20.4767 25 19.5858V1.11726C25 0.521254 24.4819 0.0575628 23.8896 0.123381L7.88957 1.90116C7.38314 1.95743 7 2.38549 7 2.89504Z"
            fill="white"
          />
          <ellipse cx="4.5" cy="21.5" rx="4.5" ry="3.5" fill="white" />
          <ellipse cx="20.5" cy="19.5" rx="4.5" ry="3.5" fill="white" />
        </svg>
      </Link>
      {isOpen && <MusicDropDown setState={setIsOpen} />}
    </div>
  );
};

export default MusicHeader;
