import React from 'react';
import s from './OnlineIndicator.module.scss';
import mobileSvg from '../../../assets/img/indicator/mobile.svg';

type OnlineIndicatorProps = {
  cName: string[];
  isMobile: boolean;
  onlineType: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline';
};

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ cName, isMobile, onlineType }) => {
  const [indicatorClass, borderClass] = cName;
  return (
    <div
      className={`${s[indicatorClass]} ${s[borderClass]} ${
        isMobile ? s['mobile-indicator'] : s['indicator']
      } ${s[onlineType]}`}>
      {isMobile && <img src={mobileSvg} alt="online" />}
    </div>
  );
};

export default OnlineIndicator;
