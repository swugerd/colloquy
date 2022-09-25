import React from 'react';
import { Link } from 'react-router-dom';
import s from './DropDownLayout.module.scss';
import arrow from '../../../assets/img/header/arrow.svg';
import gemIcon from '../../../assets/img/icons/gem.svg';

type DropDownLayoutProps = {
  title: string;
  myCount: number;
  allCount: number;
  currency?: number;
  link: string;
  linkText: string;
  children: React.ReactNode;
};

const DropDownLayout: React.FC<DropDownLayoutProps> = ({
  title,
  myCount,
  allCount,
  currency,
  link,
  linkText,
  children,
}) => {
  return (
    <div className={s['wrapper']}>
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
                <img src={gemIcon} alt="currency" />
              </div>
            </div>
          </>
        ) : (
          <div className={s['quantity']}>
            <span className={s['my-count']}>{myCount}</span>
            <span className={s['all-count']}>{allCount}</span>
          </div>
        )}
      </div>
      <div className={s['wrapper-content']}>{children}</div>
      <div className={s['wrapper-bottom']}>
        <Link to={link}>
          {linkText}
          <div className={s['arrow-icon']}>
            <img src={arrow} alt="open" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DropDownLayout;
