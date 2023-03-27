import React from 'react';
import Icon from '../Icon/Icon';
import OnlineIndicator from '../OnlineIndicator/OnlineIndicator';
import closeSvg from '../../../assets/img/icons/close.svg';
import s from './HeaderAvatar.module.scss';

type HeaderAvatarProps = {
  hasDelete?: boolean;
  className: string;
  img: string;
  title: string;
  indicatorClass?: [
    'sm-indicator' | 'md-indicator' | 'lg-indicator' | 'friend-indicator',
    'border-elem' | 'border-sub-bg' | 'border-friend',
  ];
  hasAnimation?: boolean;
  onlineType?: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline' | string;
};

const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  className,
  img,
  title,
  hasDelete,
  indicatorClass,
  onlineType,
  hasAnimation,
}) => {
  return (
    <div className={s[className]} title={title}>
      <div className={s['image-block']}>
        <img src={`${process.env.REACT_APP_HOSTNAME}/${img}`} alt="profile" />
        {indicatorClass && onlineType && (
          <OnlineIndicator
            onlineType={onlineType}
            cName={indicatorClass}
            isMobile={false}
            hasAnimation={hasAnimation}
          />
        )}
      </div>
      {hasDelete && (
        <div className={s['cross']}>
          <Icon src={closeSvg} id={'close'} className={'fms-cross'} />
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
