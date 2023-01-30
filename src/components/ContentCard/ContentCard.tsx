import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import SquareButton from '../UI/SquareButton/SquareButton';
import s from './ContentCard.module.scss';
import sideContentS from '../SideContent/SideContent.module.scss';
import messagesSvg from '../../assets/img/icons/chat.svg';
import userSvg from '../../assets/img/icons/user.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import addSvg from '../../assets/img/icons/add.svg';
import numberWithSpaces from '../../utils/numberWithSpaces';
import convertMembers from '../../utils/convertMembers';
import Icon from '../UI/Icon/Icon';

type ContentCardProps = {
  size: 'lg' | 'sm';
  type: 'friend' | 'group';
  contentData: {
    img: string;
    status?: string;
    lastSeen?: string;
    members?: number;
    isPrivate?: boolean;
    name: string;
  };
  isSearchPage: boolean;
};

const ContentCard: React.FC<ContentCardProps> = ({ size, contentData, type, isSearchPage }) => {
  // сделать проп класснэйм и убрать условия (?)
  const { img, status, lastSeen, members, name, isPrivate } = contentData;
  return (
    <div className={size === 'lg' ? s['friend'] : sideContentS['user']}>
      <Link
        className={size === 'lg' ? s['link'] : ''}
        to={type === 'friend' ? '/profile/swugerd' : '/groups/colloquy'}>
        <HeaderAvatar
          className={size === 'lg' ? 'friend' : 'recs'}
          img={img}
          title={'image'}
          indicatorClass={
            type === 'friend'
              ? [
                  size === 'lg' ? 'friend-indicator' : 'sm-indicator',
                  size === 'lg' ? 'border-friend' : 'border-elem',
                ]
              : undefined
          }
          onlineType={type === 'friend' ? 'pc-online' : ''}
        />
        <div
          className={`${size === 'lg' ? s['friend-info'] : sideContentS['user-info']} ${
            status ? '' : s['align-center']
          }`}>
          <div className={s['row']}>
            <span className={`${size === 'lg' ? s['friend-name'] : sideContentS['user-name']}`}>
              {name}
            </span>
            {type === 'group' && size === 'sm' ? (
              <div className={s['row']}>
                <div className={s['rec-icon']}>
                  <Icon src={userSvg} id={'profile'} className={'green'} />
                </div>
                <span className={s['rec-members']}>{members && convertMembers(members)}</span>
              </div>
            ) : (
              ''
            )}
          </div>
          {status && (
            <span className={`${size === 'lg' ? s['friend-status'] : sideContentS['user-status']}`}>
              {status}
            </span>
          )}
          {type === 'group' && size === 'lg' ? (
            <p className={s['members']}>
              <span>{members && numberWithSpaces(members)}</span> участников
            </p>
          ) : (
            lastSeen && <span className={s['last-seen']}>Был в сети {lastSeen}</span>
          )}
        </div>
      </Link>
      <div className={`${s['friend-actions']}`}>
        {type === 'friend' && size === 'lg' && isSearchPage === false ? (
          <>
            <SquareButton
              className={'friend-button'}
              icon={messagesSvg}
              id={'messages'}
              hasLock={false}
            />
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
            />
          </>
        ) : type === 'friend' && size === 'lg' && isSearchPage === true ? (
          <>
            <SquareButton
              className={'friend-button'}
              icon={messagesSvg}
              id={'messages'}
              hasLock={false}
            />
            <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={false} />
          </>
        ) : type === 'friend' && size === 'sm' ? (
          <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={false} />
        ) : type === 'group' && size === 'lg' && isSearchPage === false ? (
          <SquareButton className={'friend-button'} icon={closeSvg} id={'close'} hasLock={false} />
        ) : type === 'group' && size === 'lg' && isSearchPage === true ? (
          <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={isPrivate} />
        ) : (
          <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={isPrivate} />
        )}
      </div>
    </div>
  );
};

export default ContentCard;
