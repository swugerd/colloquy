import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import SquareButton from '../UI/SquareButton/SquareButton';
import s from './ContentCard.module.scss';
import sideContentS from '../SideContent/SideContent.module.scss';
import messagesSvg from '../../assets/img/icons/chat.svg';
import userSvg from '../../assets/img/icons/user.svg';
import crownSvg from '../../assets/img/icons/crown.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import moreSvg from '../../assets/img/icons/dots.svg';
import blockSvg from '../../assets/img/icons/block.svg';
import addSvg from '../../assets/img/icons/add.svg';
import numberWithSpaces from '../../utils/numberWithSpaces';
import convertMembers from '../../utils/convertMembers';
import Icon from '../UI/Icon/Icon';
import useWindowSize from '../../hooks/useWindowResize';
import { useAppDispatch } from './../../redux/store';
import { setConfirmModalType, setIsConfirmModalOpen } from '../../redux/modal/slice';
import moment from 'moment';
import 'moment/locale/ru';
import { User } from '../../hooks/useAuth';
import axios from 'axios';

type ContentCardProps = {
  size: 'lg' | 'sm';
  type: string | null;
  contentData: {
    img: string;
    status?: string;
    lastSeen?: string;
    members?: number;
    isPrivate?: boolean;
    name: string;
    link: string;
  };
  isSearchPage: boolean;
  isAdmin?: boolean;
  currentUser?: User | null | undefined;
  user?: User | null | undefined;
  setResponse?: (response: any) => void;
  responseLink?: string;
  onlineType?: string;
};

const ContentCard: React.FC<ContentCardProps> = ({
  size,
  contentData,
  type,
  isSearchPage,
  user,
  currentUser,
  setResponse,
  isAdmin,
  responseLink,
  onlineType,
}) => {
  const dispatch = useAppDispatch();

  const handleConfirmModalOpen = (
    e: any,
    modalType: 'friend' | 'group' | 'pageDelete' | 'passwordEnter',
  ) => {
    e.stopPropagation();
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setConfirmModalType(modalType));
  };
  // сделать проп класснэйм и убрать условия (?)
  const { img, status, lastSeen, members, name, isPrivate, link } = contentData;

  const { width } = useWindowSize();

  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const [params, setParams] = useSearchParams();

  const addFriend = async () => {
    if (currentUser && user) {
      const response: any = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/${user.id}`,
        data: {
          user2_id: currentUser.id,
        },
      });
      const users = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/filter?filterType=income&userId=${user.id}`,
      });
      setResponse && setResponse(users.data);
    }
  };

  const createFriendReq = async () => {
    if (currentUser && user) {
      const response: any = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/req/${user.id}`,
        data: {
          user_income_id: currentUser.id,
        },
      });
      const users = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/users/filter?userId=${user.id}`,
      });
      setResponse && setResponse(users.data);
    }
  };

  const deleteFriend = async () => {
    if (currentUser && user) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/${user.id}`,
        data: {
          user2_id: currentUser.id,
        },
      });
      const users = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/${
          params.get('filter') === 'online'
            ? `filter?filterType=${params.get('filter')}&userId=${user.id}`
            : user.id
        }`,
      });
      setResponse && setResponse(users.data);
    }
  };

  const deleteFriendReq = async () => {
    if (currentUser && user) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/req/${user.id}`,
        data: {
          user_income_id: currentUser.id,
        },
      });
      const users = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/friends/filter?${
          params.get('filter') && `filterType=${params.get('filter')}&`
        }userId=${user.id}`,
      });
      setResponse && setResponse(users.data);
    }
  };

  return (
    <div className={size === 'lg' ? s['friend'] : sideContentS['user']}>
      <Link
        className={size === 'lg' ? s['link'] : ''}
        to={
          type === 'friend' || type === 'income' || type === 'outcome'
            ? `/profile/${link}`
            : `/groups/${link}`
        }>
        <HeaderAvatar
          className={size === 'lg' ? 'friend' : 'recs'}
          img={img}
          title={'image'}
          indicatorClass={
            type === 'friend' || type === 'income' || type === 'outcome'
              ? [
                  size === 'lg' ? 'friend-indicator' : 'sm-indicator',
                  size === 'lg' ? 'border-friend' : 'border-elem',
                ]
              : undefined
          }
          onlineType={
            type === 'friend' || type === 'income' || type === 'outcome' ? onlineType : ''
          }
        />
        <div
          className={`${size === 'lg' ? s['friend-info'] : sideContentS['user-info']} ${
            status ? '' : s['align-center']
          }`}>
          <div className={s['row']}>
            <span
              className={`${size === 'lg' ? s['friend-name'] : sideContentS['user-name']} ${
                type === 'members' && isAdmin ? s['admin'] : ''
              }`}>
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
            <span
              className={`${size === 'lg' ? s['friend-status'] : sideContentS['user-status']} ${
                type === 'members' && isAdmin ? s['admin'] : ''
              }`}>
              {status}
            </span>
          )}
          {type === 'group' && size === 'lg' ? (
            <p className={s['members']}>
              <span>{members && numberWithSpaces(members)}</span> участников
            </p>
          ) : (
            lastSeen && (
              <span className={s[size === 'lg' ? 'last-seen' : 'last-seen-sm']}>
                Был в сети {moment(lastSeen).locale('ru').fromNow()}
              </span>
            )
          )}
        </div>
      </Link>
      <div className={`${s['friend-actions']}`}>
        {type === 'friend' && size === 'lg' && isSearchPage === false && (
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
              onClick={deleteFriend}
            />
          </>
        )}
        {type === 'friend' && size === 'lg' && isSearchPage && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={messagesSvg}
              id={'messages'}
              hasLock={false}
            />
            <SquareButton
              className={'friend-button'}
              icon={addSvg}
              id={'add'}
              hasLock={false}
              onClick={createFriendReq}
            />
          </>
        )}
        {type === 'friend' && size === 'sm' && (
          <SquareButton
            className={'friend-button'}
            icon={addSvg}
            id={'add'}
            hasLock={false}
            onClick={createFriendReq}
          />
        )}
        {type === 'group' && size === 'lg' && isSearchPage === false && (
          <SquareButton
            className={'friend-button'}
            icon={closeSvg}
            id={'close'}
            hasLock={false}
            onClick={(e) => handleConfirmModalOpen(e, 'group')}
          />
        )}
        {type === 'group' && size === 'lg' && isSearchPage && (
          <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={isPrivate} />
        )}
        {type === 'group' && size === 'sm' && (
          <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={isPrivate} />
        )}
        {type === 'members' && isAdmin && width > 550 && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={blockSvg}
              id={'block'}
              hasLock={isPrivate}
            />
            <SquareButton
              className={'friend-button'}
              icon={crownSvg}
              id={'crown'}
              hasLock={isPrivate}
            />
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
            />
          </>
        )}
        {type === 'members' && isAdmin && width <= 550 && (
          <div className={s['more']}>
            <button
              className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
              onClick={() => setIsActionsOpen(!isActionsOpen)}>
              <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
            </button>
            <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
              <SquareButton className={'more-btn'} icon={messagesSvg} id={'messages'} />
              <SquareButton className={'more-btn'} icon={addSvg} id={'add'} />
              <SquareButton className={'more-btn'} icon={blockSvg} id={'block'} />
            </div>
          </div>
        )}
        {type === 'members' && isAdmin === false && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={messagesSvg}
              id={'messages'}
              hasLock={false}
            />
            <SquareButton className={'friend-button'} icon={addSvg} id={'add'} hasLock={false} />
          </>
        )}
        {(type === 'blacklist' || type === 'moderation') && (
          <SquareButton className={'friend-button'} icon={closeSvg} id={'close'} hasLock={false} />
        )}
        {type === 'orders' && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
            />
            <SquareButton
              className={'friend-button'}
              icon={addSvg}
              id={'add'}
              hasLock={isPrivate}
            />
          </>
        )}
        {type === 'income' && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
              onClick={deleteFriendReq}
            />
            <SquareButton
              className={'friend-button'}
              icon={addSvg}
              id={'add'}
              hasLock={isPrivate}
              onClick={addFriend}
            />
          </>
        )}
        {type === 'outcome' && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
              onClick={deleteFriendReq}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
