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
          {/* <svg
            className={s['header-icon']}
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.2116 2H2.03988C1.5594 2 1.14783 2.34137 1.09233 2.81864C0.991763 3.68331 0.907707 5.05035 1.2116 6C1.64074 7.34107 2.17686 8.04504 3.2116 9C4.62483 10.3043 7.7116 11 7.7116 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M19.7116 2H23.8833C24.3638 2 24.7754 2.34137 24.8309 2.81864C24.9315 3.68331 25.0155 5.05035 24.7116 6C24.2825 7.34107 23.7464 8.04504 22.7116 9C21.2984 10.3043 17.7116 11 17.7116 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M15.2116 18C15.7961 19.281 16.5 21 16.5 21H9C9 21 10.2033 19.3131 10.7116 18C11.2799 16.5319 11.2116 16 11.2116 14C11.2116 13.5 9.41208 12.6801 8.71161 12C7.38996 10.7168 7.46486 10.1811 6.71161 8.5C5.49022 5.7742 5.21161 1 5.21161 1H19.7116C19.7116 1 19.7116 4.5 19.2116 6.5C18.7173 8.47735 18.2116 9.5 17.7116 10.5C16.7116 12.5 14.2116 13.5 14.2116 14C14.2116 15.118 14.5432 16.5351 15.2116 18Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M6.21161 24H19.2116" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M17.2116 21V24H8.21161V21H17.2116Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M16.2021 5.65891C16.1782 5.58224 16.1136 5.52754 16.0372 5.519V5.519C14.6554 5.37197 13.4627 4.48523 12.9239 3.20425L12.889 3.1212C12.858 3.04799 12.7883 3 12.7115 3C12.6347 3 12.5651 3.04759 12.5341 3.12161L12.499 3.20493C11.9602 4.48562 10.7677 5.37209 9.38602 5.519V5.519C9.3096 5.52713 9.24482 5.58245 9.22116 5.65891C9.1973 5.73558 9.21903 5.81977 9.27644 5.87345L9.32064 5.91491C10.3357 6.86679 10.7832 8.27783 10.5021 9.64072L10.4787 9.75373C10.4626 9.83243 10.4921 9.91378 10.5544 9.96116C10.5883 9.98698 10.6283 10 10.6684 10C10.702 10 10.7357 9.99085 10.766 9.97214V9.97214C11.9605 9.24306 13.4626 9.24296 14.6571 9.97214V9.97214C14.7234 10.0122 14.8064 10.0083 14.8687 9.96014C14.9307 9.91357 14.9606 9.83142 14.9445 9.75272L14.9212 9.63978C14.6401 8.27674 15.0877 6.86556 16.103 5.9137L16.147 5.87244C16.204 5.81956 16.2259 5.73537 16.2021 5.65891ZM14.1256 7.22253C14.0737 7.27134 14.0506 7.34556 14.0653 7.41715L14.0784 7.48077C14.2279 8.20547 13.4407 8.75939 12.8091 8.37395V8.37395C12.7488 8.33694 12.6743 8.33694 12.614 8.37395V8.37395C11.9821 8.75942 11.1948 8.20533 11.3443 7.48045L11.3574 7.41715C11.3721 7.34556 11.349 7.27134 11.297 7.22253L11.267 7.19439C10.7164 6.67819 11.0264 5.75384 11.7769 5.67396V5.67396C11.8463 5.66684 11.9064 5.62027 11.9347 5.55357V5.55357C12.224 4.86592 13.1985 4.8659 13.4877 5.55357V5.55357C13.516 5.62027 13.5762 5.66684 13.6456 5.67396V5.67396C14.3961 5.75385 14.7062 6.67822 14.1555 7.19448L14.1256 7.22253Z"
              fill="white"
            />
          </svg> */}
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
