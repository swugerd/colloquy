import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Wall from '../../components/Wall/Wall';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { useAppDispatch } from '../../redux/store';
import exitSvg from '../../assets/img/icons/exit.svg';
import lockSvg from '../../assets/img/icons/lock.svg';
import settingsSvg from '../../assets/img/icons/settings.svg';
import s from './Group.module.scss';
import Icon from '../../components/UI/Icon/Icon';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import { setIsInfoName } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import { useAxios } from '../../hooks/useAxios';
import Preloader from '../../components/Preloader/Preloader';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import axios from 'axios';

const Group: React.FC = () => {
  const { name } = useParams();
  useSetPageTitle(name ? name : 'Сообщество');

  const { width } = useWindowSize();

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const { pathname } = useLocation();

  const groupRoute = pathname.split('/')[pathname.split('/').length - 1];

  const {
    response: group,
    isLoading: isGroupLoading,
    error: groupError,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/groups/getByAdress/${groupRoute}`,
  });

  const isBlacklisted =
    group && userId && group.blacklistedUsers.some((user: any) => user.blocked_user_id === userId);

  const isAdmin =
    group && userId && group.members.find((member: any) => member.user_id === userId)?.is_admin
      ? true
      : false;

  const isClosed =
    group &&
    userId &&
    group.is_private &&
    !group.members.some((member: any) => member.user_id === userId);

  const isMember =
    group && userId && group.members.some((member: any) => member.user_id === userId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (name) {
      dispatch(setIsInfoName(name));
    }
    return () => {
      dispatch(setIsInfoName(''));
    };
  }, []);

  const dispatch = useAppDispatch();

  const members = group && group.members;

  const photos = group && group.photos;

  const videos = group && group.videos;

  const [isReqSent, setIsReqSent] = useState(false);

  const createReq = async () => {
    if (userId && group) {
      const response: any = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/req/${userId}`,
        data: {
          group_id: group.id,
        },
      });
      setIsReqSent(true);
    }
  };

  const isUserReq = group && group.requests.some((req: any) => req.user_id === userId);

  const navigate = useNavigate();

  if (!isGroupLoading && !group) {
    return <NotFoundBlock className={'profile'} text={'Группа не найдена'} />;
  }

  const handleQuit = async () => {
    if (userId && group) {
      const response: any = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups/exit/${userId}`,
        data: {
          group_id: group.id,
        },
      });

      navigate('/groups');
    }
  };

  return (
    <>
      {group && !isGroupLoading ? (
        <>
          {isClosed ? (
            <div className={s['closed']}>
              {isBlacklisted && (
                <>
                  <div className={s['lock']}>
                    <Icon src={lockSvg} id={'lock'} className={'green'} />
                  </div>
                  <p className={s['close-text']}>Вы в чёрном списке</p>
                </>
              )}
              {(isReqSent || isUserReq) && !isBlacklisted ? (
                <>
                  <div className={s['lock']}>
                    <Icon src={lockSvg} id={'lock'} className={'green'} />
                  </div>
                  <p className={s['close-text']}>Заявка отправлена</p>
                </>
              ) : !isBlacklisted ? (
                <>
                  <div className={s['lock']}>
                    <Icon src={lockSvg} id={'lock'} className={'green'} />
                  </div>
                  <p className={s['close-text']}>
                    Это закрытое сообщество, чтобы просмотривать содержимое, нужно быть участником
                  </p>
                  <button className={s['close-request']} onClick={createReq}>
                    Подать заявку
                  </button>
                </>
              ) : (
                ''
              )}
            </div>
          ) : (
            <Wall
              className={'group'}
              page={'group'}
              placeholder={isAdmin ? 'Что произошло сегодня?' : 'Предложите новость сообществу'}
              isAdmin={isAdmin}
              withoutForm={isMember ? false : true}
            />
          )}
          <div className={s['group']}>
            <div className={s['top']}>
              <div className={s['avatar']}>
                <img src={`${process.env.REACT_APP_HOSTNAME}/${group.group_avatar}`} alt="Аватар" />
              </div>
              <div className={s['group-info']}>
                <div className={s['group-top']}>
                  <div className={s['row']}>
                    <h6 className={s['group-title']}>{group.group_name}</h6>
                    <div className={s['buttons']}>
                      {isMember && group && group.creator_id !== userId ? (
                        <button className={s['group-action']} onClick={handleQuit}>
                          <Icon src={exitSvg} id={'exit'} className={'white'} />
                        </button>
                      ) : (
                        ''
                      )}
                      {isAdmin && (
                        <Link
                          className={s['group-action']}
                          to={`/groups/${group.group_adress}/edit`}>
                          <Icon src={settingsSvg} id={'settings'} className={'white'} />
                        </Link>
                      )}
                    </div>
                  </div>
                  {group.group_status && <p className={s['group-status']}>{group.group_status}</p>}
                </div>
                {width > 550 && group.group_about && (
                  <p className={s['group-about']}>{group.group_about}</p>
                )}
              </div>
              {width <= 550 && group.group_about && (
                <p className={s['group-about']}>{group.group_about}</p>
              )}
            </div>
            <div className={s['group-content']}>
              <ProfileContent
                contentType={'members'}
                data={members}
                className={'members-content'}
                pageType={'group'}
              />
              {isClosed ? (
                ''
              ) : (
                <>
                  <ProfileContent
                    contentType={'photos'}
                    data={photos}
                    className={'photos-content'}
                    pageType={'group'}
                  />
                  <ProfileContent
                    contentType={'videos'}
                    data={videos}
                    className={'videos-content'}
                    pageType={'group'}
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <Preloader className="profile" />
      )}
    </>
  );
};

export default Group;
