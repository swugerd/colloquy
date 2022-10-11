import React from 'react';
import { Link } from 'react-router-dom';
import s from './DropDownLayout.module.scss';
import arrow from '../../../assets/img/header/arrow.svg';
import gemIcon from '../../../assets/img/icons/gem.svg';

type DropDownLayoutProps = {
  title: string;
  myCount?: number;
  allCount?: number;
  currency?: number;
  link: string;
  linkText: string;
  isNotify?: boolean;
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
                <svg
                  width="17"
                  height="25"
                  viewBox="0 0 17 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8L8.5 6L12 8V17L8.5 19L5 17V8Z" fill="white" />
                  <path d="M16.5 4.5L8.5 0L0.5 4.5L4.5 7L8.5 4.5L12.5 7L16.5 4.5Z" fill="white" />
                  <path
                    d="M16.5 20.5L8.5 25L0.5 20.5L4.5 18L8.5 20.5L12.5 18L16.5 20.5Z"
                    fill="white"
                  />
                  <path d="M13 17V8L17 5.5V19.5L13 17Z" fill="white" />
                  <path d="M4 17V8L0 5.5V19.5L4 17Z" fill="white" />
                </svg>
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
        <Link to={link}>
          {linkText}
          <div className={s['arrow-icon']}>
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DropDownLayout;
