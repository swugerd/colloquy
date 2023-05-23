import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import axios from 'axios';
import wordDeclension from '../../utils/wordDeclension';

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
  currentUser?: any;
  user?: any;
  setResponse?: (response: any) => void;
  responseLink?: string;
  onlineType?: string;
  group?: any;
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
  group,
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

  // сообщение

  const handleMessage = async () => {
    navigate(`/messages/${currentUser.id}`);
  };

  // группы

  const joinGroup = async (isPrivate?: boolean) => {
    if (user && group) {
      const response: any = await axios({
        method: 'post',
        url: isPrivate
          ? `${process.env.REACT_APP_HOSTNAME}/api/groups/req/${user.id}`
          : `${process.env.REACT_APP_HOSTNAME}/api/groups/join/${user.id}`,
        data: {
          group_id: group.id,
        },
      });
      const groups = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/filter?userId=${user.id}`,
      });
      setResponse && setResponse(groups.data);
    }
  };

  const quitGroup = async () => {
    if (user && group) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/exit/${user.id}`,
        data: {
          group_id: group.id,
        },
      });
      const groups = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/${user.id}`,
      });
      setResponse && setResponse(groups.data);
    }
  };

  const handleGroupReq = async (type: 'approve' | 'reject') => {
    if (user && group) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/req/${user.id}?type=${type}`,
        data: {
          group_id: group.id,
        },
      });

      const reqs = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/req/${group.id}`,
      });
      setResponse && setResponse(reqs.data);
    }
  };

  const hadnleKickMember = async () => {
    if (currentUser && group) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/exit/${currentUser.id}`,
        data: {
          group_id: group.id,
        },
      });

      const members = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/users/filter?groupId=${group.id}&userId=${user}`,
      });
      setResponse && setResponse(members.data);
    }
  };

  const handleAdminAction = async (action: 'add' | 'remove') => {
    if (currentUser && group) {
      const response: any = await axios({
        method: 'put',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/mods/${group.id}?action=${action}`,
        data: {
          user_id: type === 'moderation' ? user.id : currentUser.id,
        },
      });

      if (action === 'remove') {
        const mods = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_HOSTNAME}/api/groups/mods/${group.id}?userId=${currentUser}`,
        });
        setResponse && setResponse(mods.data);
      }
    }
  };

  const handleBlacklist = async (method: 'post' | 'delete') => {
    if (currentUser && group) {
      const response: any = await axios({
        method,
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/blacklist/${group.id}`,
        data: {
          blocked_user_id: type === 'members' ? currentUser.id : user.id,
        },
      });

      if (method === 'delete') {
        const mods = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_HOSTNAME}/api/groups/blacklist/${group.id}`,
        });
        setResponse && setResponse(mods.data);
      }
    }
  };

  const hasCrownButton =
    type === 'members' &&
    group.members.find((member: any) => member.user_id === currentUser.id).is_admin;

  const isModerator =
    type === 'members' && group.members.find((member: any) => member.user_id === user)?.is_admin;

  return (
    <div className={size === 'lg' ? s['friend'] : sideContentS['user']}>
      <Link
        className={size === 'lg' ? s['link'] : ''}
        to={
          type === 'friend' ||
          type === 'income' ||
          type === 'outcome' ||
          type === 'blacklist' ||
          type === 'moderation' ||
          type === 'orders' ||
          type === 'members'
            ? `/profile/${link}`
            : `/groups/${link}`
        }>
        <HeaderAvatar
          className={size === 'lg' ? 'friend' : 'recs'}
          img={img}
          title={'image'}
          indicatorClass={
            type === 'friend' ||
            type === 'income' ||
            type === 'outcome' ||
            type === 'blacklist' ||
            type === 'moderation' ||
            type === 'orders' ||
            type === 'members'
              ? [
                  size === 'lg' ? 'friend-indicator' : 'sm-indicator',
                  size === 'lg' ? 'border-friend' : 'border-elem',
                ]
              : undefined
          }
          onlineType={onlineType}
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
              <span>{members && numberWithSpaces(members)}</span>{' '}
              {members && wordDeclension(members, ['участник', 'участника', 'участников'])}
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
              onClick={handleMessage}
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
              onClick={handleMessage}
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
        {type === 'group' &&
          size === 'lg' &&
          isSearchPage === false &&
          group &&
          user &&
          group.creator_id !== user.id && (
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
              onClick={quitGroup}
            />
          )}
        {type === 'group' && size === 'lg' && isSearchPage && (
          <SquareButton
            className={'friend-button'}
            icon={addSvg}
            id={'add'}
            hasLock={isPrivate}
            onClick={() => joinGroup(isPrivate)}
          />
        )}
        {type === 'group' && size === 'sm' && (
          <SquareButton
            className={'friend-button'}
            icon={addSvg}
            id={'add'}
            hasLock={isPrivate}
            onClick={() => joinGroup(isPrivate)}
          />
        )}
        {type === 'members' &&
          group.creator_id !== currentUser.id &&
          isModerator &&
          width > 550 &&
          currentUser &&
          currentUser.id !== user && (
            <>
              <SquareButton
                className={'friend-button'}
                icon={blockSvg}
                id={'block'}
                hasLock={isPrivate}
                onClick={() => handleBlacklist('post')}
              />
              {!hasCrownButton && (
                <SquareButton
                  className={'friend-button'}
                  icon={crownSvg}
                  id={'crown'}
                  hasLock={isPrivate}
                  onClick={() => handleAdminAction('add')}
                />
              )}
              <SquareButton
                className={'friend-button'}
                icon={closeSvg}
                id={'close'}
                hasLock={false}
                onClick={hadnleKickMember}
              />
            </>
          )}
        {type === 'members' &&
          isModerator &&
          width <= 550 &&
          group.creator_id !== currentUser.id &&
          currentUser &&
          isModerator &&
          currentUser.id !== user && (
            <div className={s['more']}>
              <button
                className={`${s['more-btn']} ${isActionsOpen ? s['active'] : ''}`}
                onClick={() => setIsActionsOpen(!isActionsOpen)}>
                <Icon src={moreSvg} id={'dots'} className={'profile-dots'} />
              </button>
              <div className={`${s['actions']} ${isActionsOpen ? s['active'] : ''}`}>
                {!hasCrownButton && (
                  <SquareButton
                    className={'more-btn'}
                    icon={crownSvg}
                    id={'crown'}
                    onClick={() => handleAdminAction('add')}
                  />
                )}

                <SquareButton
                  className={'more-btn'}
                  icon={closeSvg}
                  id={'close'}
                  onClick={hadnleKickMember}
                />

                <SquareButton
                  className={'more-btn'}
                  icon={blockSvg}
                  id={'block'}
                  onClick={() => handleBlacklist('post')}
                />
              </div>
            </div>
          )}
        {type === 'members' &&
          (group.creator_id === currentUser.id || !isModerator) &&
          currentUser &&
          currentUser.id !== user && (
            <>
              <SquareButton
                className={'friend-button'}
                icon={messagesSvg}
                id={'messages'}
                hasLock={false}
                onClick={handleMessage}
              />
            </>
          )}
        {(type === 'blacklist' || type === 'moderation') && group.creator_id === currentUser && (
          <SquareButton
            className={'friend-button'}
            icon={closeSvg}
            id={'close'}
            hasLock={false}
            onClick={
              type === 'moderation'
                ? () => handleAdminAction('remove')
                : () => handleBlacklist('delete')
            }
          />
        )}
        {type === 'orders' && (
          <>
            <SquareButton
              className={'friend-button'}
              icon={closeSvg}
              id={'close'}
              hasLock={false}
              onClick={() => handleGroupReq('reject')}
            />
            <SquareButton
              className={'friend-button'}
              icon={addSvg}
              id={'add'}
              hasLock={isPrivate}
              onClick={() => handleGroupReq('approve')}
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
