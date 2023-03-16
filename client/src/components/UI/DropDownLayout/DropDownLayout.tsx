import React from 'react';
import { Link } from 'react-router-dom';
import s from './DropDownLayout.module.scss';
import arrowSvg from '../../../assets/img/icons/arrow.svg';
import gemSvg from '../../../assets/img/icons/gem.svg';
import Icon from '../Icon/Icon';

type DropDownLayoutProps = {
  title: string;
  myCount?: number;
  allCount?: number;
  currency?: number;
  link: string;
  linkText: string;
  isNotify?: boolean;
  setIsActive?: () => void;
  children: React.ReactNode;
};

const DropDownLayout: React.FC<DropDownLayoutProps> = ({
  title,
  myCount,
  allCount,
  currency,
  link,
  linkText,
  isNotify,
  children,
  setIsActive,
}) => {
  return (
    <div className={`${s['wrapper']} ${isNotify ? s['wrapper-notify'] : ''}`}>
      <div className={s['wrapper-top']}>
        <h5 className={currency ? s['heading-currency'] : s['heading']}>{title}</h5>
        {currency ? (
          <>
            <span className={s['separator']}>&mdash;</span>
            <div className={s['quantity']}>
              <span className={s['my-count']}>{myCount}</span>
              <span className={s['all-count']}>{allCount}</span>
            </div>
            <div className={s['currency']}>
              <span className={s['amount']}>{currency}</span>
              <div className={s['currency-icon']}>
                <Icon src={gemSvg} id={'gem'} className={'white'} />
              </div>
            </div>
          </>
        ) : allCount || myCount ? (
          <div className={s['quantity']}>
            <span className={s['my-count']}>{myCount}</span>
            <span className={s['all-count']}>{allCount}</span>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={s['wrapper-content']}>{children}</div>
      <div className={s['wrapper-bottom']}>
        <Link to={link} onClick={isNotify ? setIsActive : () => {}}>
          {linkText}
          <div className={s['arrow-icon']}>
            <Icon src={arrowSvg} id={'arrow'} className={'white'} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DropDownLayout;
