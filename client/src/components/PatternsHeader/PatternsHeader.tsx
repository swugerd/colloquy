import React, { useRef, useState } from 'react';
import s from './PatternsHeader.module.scss';
import patternsSvg from '../../assets/img/icons/patterns.svg';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import PatternsDropDown from './PatternsDropDown/PatternsDropDown';
import Icon from '../UI/Icon/Icon';

const PatternsHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__actions-patterns']} ${s['header-hover']} ${
        isOpen ? s['active'] : ''
      }`}
      ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon src={patternsSvg} id={'patterns'} className={'header-icon'} />
      </button>
      {isOpen && <PatternsDropDown />}
    </div>
  );
};

export default PatternsHeader;
