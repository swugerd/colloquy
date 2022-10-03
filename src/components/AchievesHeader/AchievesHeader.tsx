import React, { useRef, useState } from 'react';
import Notify from '../UI/Notify/Notify';
import s from './AchievesHeader.module.scss';
import achieve from '../../assets/img/header/achieve.svg';
import AchievesDropDown from './AchievesDropDown/AchievesDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const AchievesHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const achieveIndicator = 12;
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__actions-achieve']} ${s['header-hover']} ${
        isOpen ? s['active'] : ''
      }`}
      ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className={s['header__notify-indicator']}>
          <img className={s['header-icon']} src={achieve} alt="achieve" />
          {achieveIndicator > 0 && (
            <Notify cName="header-notify" count={achieveIndicator} hasImage={false} />
          )}
        </div>
      </button>
      {isOpen && <AchievesDropDown />}
    </div>
  );
};

export default AchievesHeader;
