import React from 'react';
import s from './OnlineIndicator.module.scss';
import mobileSvg from '../../../assets/img/indicator/mobile.svg';

type OnlineIndicatorProps = {
  cName: string[];
  isMobile: boolean;
  onlineType: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline' | string;
  hasAnimation?: boolean;
};

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({
  cName,
  isMobile,
  onlineType,
  hasAnimation,
}) => {
  const [indicatorClass, borderClass] = cName;
  return (
    <div
      className={`${s[indicatorClass]} ${s[borderClass]} ${
        isMobile ? s['mobile-indicator'] : s['indicator']
      } ${s[onlineType]} ${hasAnimation ? s['animation'] : ''}`}>
      {isMobile && <img src={mobileSvg} alt="online" />}
      {hasAnimation && (
        <>
          <div></div>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  );
};

export default OnlineIndicator;
