import React, { useRef, useState } from 'react';
import Notify from '../UI/Notify/Notify';
import s from './AchievesHeader.module.scss';
import achieveSvg from '../../assets/img/icons/achieve.svg';
import AchievesDropDown from './AchievesDropDown/AchievesDropDown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';

const AchievesHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const achieveIndicator = 0;
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__actions-achieve']} ${s['header-hover']} ${
        isOpen ? s['active'] : ''
      }`}
      ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className={s['header__notify-indicator']}>
          <Icon src={achieveSvg} id={'achieve'} className={'header-icon'} />

          {achieveIndicator > 0 && (
            <Notify cName="header" count={achieveIndicator} hasImage={false} />
          )}
        </div>
      </button>
      {isOpen && <AchievesDropDown />}
    </div>
  );
};

export default AchievesHeader;
