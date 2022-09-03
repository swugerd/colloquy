import React from 'react';
import s from './OnlineIndicator.module.scss';
import mobileSvg from '../../../assets/img/indicator/mobile.svg';

type OnlineIndicatorProps = {
  type: string;
  cName: string;
  isMobile: boolean;
};

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ type, cName, isMobile }) => {
  return (
    <div className={`${s[cName]} ${isMobile ? s['mobile-indicator'] : s.indicator} ${s[type]}`}>
      {isMobile && <img src={mobileSvg} alt="online" />}
    </div>
  );
};

export default OnlineIndicator;
