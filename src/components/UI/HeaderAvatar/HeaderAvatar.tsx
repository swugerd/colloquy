import React from 'react';
import OnlineIndicator from '../OnlineIndicator/OnlineIndicator';
import s from './HeaderAvatar.module.scss';
import sFM from '../../FastMessages/FastMessages.module.scss';

type HeaderAvatarProps = {
  hasIndicator: boolean;
  hasDelete: boolean;
  className: string;
  img: string;
  title: string;
};

const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  hasIndicator,
  className,
  img,
  title,
  hasDelete,
}) => {
  return (
    <div className={className} title={title}>
      <img src={img} alt="profile" />
      {hasIndicator && (
        <OnlineIndicator type="pc-online" cName="header-indicator" isMobile={false} />
      )}
      {hasDelete && (
        <div className={sFM['cross']}>
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
              stroke-linecap="round"
            />
            <line
              x1="12.0356"
              y1="4.96443"
              x2="4.96458"
              y2="12.0355"
              stroke="white"
              stroke-linecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
