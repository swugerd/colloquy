import React, { useRef, useState } from 'react';
import s from './ShopHeader.module.scss';
import shopSvg from '../../assets/img/icons/shop.svg';
import { Link } from 'react-router-dom';
import ShopDropDown from './ShopDropDown/ShopDropDown';
import useOnClickOutside from './../../hooks/useOnClickOutside';
import Icon from '../UI/Icon/Icon';

const ShopHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className={`${s['header__actions-shop']} ${s['header-hover']} ${isOpen ? s['active'] : ''}`}
      ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon src={shopSvg} id={'shop'} className={'header-icon'} />
      </button>
      {isOpen ? <ShopDropDown /> : ''}
    </div>
  );
};

export default ShopHeader;
