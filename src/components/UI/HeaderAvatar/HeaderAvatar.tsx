import React from 'react';
import OnlineIndicator from '../OnlineIndicator/OnlineIndicator';
import s from './HeaderAvatar.module.scss';

type HeaderAvatarProps = {
  hasDelete?: boolean;
  className: string;
  img: string;
  title: string;
  indicatorClass?: [
    'sm-indicator' | 'md-indicator' | 'lg-indicator',
    'border-elem' | 'border-sub-bg',
  ];
  onlineType: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline';
};

const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  className,
  img,
  title,
  hasDelete,
  indicatorClass,
  onlineType,
}) => {
  return (
    <div className={s[className]} title={title}>
      <div className={s['image-block']}>
        <img src={img} alt="profile" />
        {indicatorClass && (
          <OnlineIndicator onlineType={onlineType} cName={indicatorClass} isMobile={false} />
        )}
      </div>
      {hasDelete && (
        <div className={s['cross']}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <line
              x1="4.96468"
              y1="4.96448"
              x2="12.0357"
              y2="12.0355"
              stroke="white"
              strokeLinecap="round"
            />
            <line
              x1="12.0356"
              y1="4.96443"
              x2="4.96458"
              y2="12.0355"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
