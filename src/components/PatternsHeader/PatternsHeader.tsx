import React, { useRef, useState } from 'react';
import s from './PatternsHeader.module.scss';
import patterns from '../../assets/img/header/patterns.svg';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import PatternsDropDown from './PatternsDropDown/PatternsDropDown';

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
        <img className={s['header-icon']} src={patterns} alt="patterns" />
      </button>
      {isOpen && <PatternsDropDown />}
    </div>
  );
};

export default PatternsHeader;
