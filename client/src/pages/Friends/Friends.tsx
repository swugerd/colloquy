import React, { useContext, useEffect, useState } from 'react';
import NavContent from '../../components/NavContent/NavContent';
import SideContent from '../../components/SideContent/SideContent';
import ebalo from '../../assets/uploads/test/ebalo.png';
import addSvg from '../../assets/img/icons/add.svg';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Friends.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import messagesSvg from '../../assets/img/icons/chat.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import Icon from '../../components/UI/Icon/Icon';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import GenderInput from '../../components/UI/GenderInput/GenderInput';
import InputButton from '../../components/UI/InputButton/InputButton';
import ContentCard from '../../components/ContentCard/ContentCard';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';
import { useAxios } from '../../hooks/useAxios';
import useAuth, { User } from '../../hooks/useAuth';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import Preloader from '../../components/Preloader/Preloader';
import { SocketContext } from '../../contexts/SocketContext';
import moment from 'moment';

type FriendsProps = {
  isSearchPage: boolean;
};

const Friends: React.FC<FriendsProps> = ({ isSearchPage }) => {
  useSetPageTitle(isSearchPage ? 'Поиск друзей' : 'Друзья', isSearchPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    if (isSearchPage) {
      dispatch(setHasBackButton('К списку друзей'));
      dispatch(setBackButtonType('button'));
    }
    return () => {
      if (isSearchPage) dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
    };
  }, [isSearchPage]);

  const { width } = useWindowSize();

  const { user, isLoading, errorMessage } = useAuth();

  const [params, setSearchParams] = useSearchParams();

  const [usersUrl, setUsersUrl] = useState('');

  const [filterData, setFilterData] = useState<{ [key: string]: any }>({
    city: '',
    ageFrom: '',
    ageTo: '',
    maleGender: '',
    femaleGender: '',
    online: '',
    userId: 0,
    q: '',
  });

  // фильтрация

  const handleFilterUrl = (fields: any) => {
    setFilterData((prev) => {
      return { ...prev, ...fields };
    });

    if (fields['online']) {
      if (filterData.online !== '') {
        setFilterData((prev) => {
          return { ...prev, online: '' };
        });
      }
    }

    if (fields['maleGender'] || fields['femaleGender']) {
      if (filterData.maleGender !== '') {
        setFilterData((prev) => {
          return { ...prev, maleGender: '' };
        });
      }

      if (filterData.femaleGender !== '') {
        setFilterData((prev) => {
          return { ...prev, femaleGender: '' };
        });
      }
    }
  };

  useEffect(() => {
    if (isSearchPage && !isLoading && user) {
      setFilterData({ ...filterData, userId: user.id });
    }
    if (!isSearchPage) {
      setFilterData({});
    }
  }, [isSearchPage, user, isLoading]);

  useEffect(() => {
    if (isSearchPage) {
      const timeout = setTimeout(() => {
        setUsersUrl(
          !isLoading && user
            ? `${process.env.REACT_APP_HOSTNAME}/api/users/filter?userId=${user.id}${
                filterData?.q ? `&q=${filterData.q}` : ''
              }${filterData?.city ? `&city=${filterData.city}` : ''}${
                filterData?.ageFrom ? `&ageFrom=${filterData.ageFrom}` : ''
              }${filterData?.ageTo ? `&ageTo=${filterData.ageTo}` : ''}${
                filterData?.femaleGender ? `&femaleGender=${filterData.femaleGender}` : ''
              }${filterData?.maleGender ? `&maleGender=${filterData.maleGender}` : ''}${
                filterData?.online ? `&online=${filterData.online}` : ''
              }`
            : '',
        );
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setUsersUrl(
        !isLoading && user
          ? `${process.env.REACT_APP_HOSTNAME}/api/users/filter?userId=${user.id}`
          : '',
      );
    }
  }, [filterData, user]);

  // ответы от сервера

  const {
    response: users,
    error: usersError,
    isLoading: isUsersLoading,
    setResponse: setUsersResponse,
  } = useAxios({
    method: 'get',
    url: usersUrl,
  });

  const {
    response: friends,
    error: friendsError,
    isLoading: isFriendsLoading,
    setResponse: setFriendsResponse,
  } = useAxios({
    method: 'get',
    url:
      !isLoading && user
        ? `${process.env.REACT_APP_HOSTNAME}/api/friends/${
            params.get('filter') === null
              ? user.id
              : `filter?filterType=${params.get('filter')}&userId=${user.id}`
          }`
        : '',
  });

  const {
    response: cities,
    error: citiesError,
    isLoading: isCitiesLoading,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/cities`,
  });

  const age = Array.from({ length: 87 }, (_, i) => ({
    id: i + 14,
    value: (i + 14).toString(),
    label: (i + 14).toString(),
  }));

  const handleUserType = (currentUser: any) => {
    return user?.id ===
      currentUser[
        params.get('filter') === 'income' || params.get('filter') === 'outcome'
          ? 'user_outcome_id'
          : 'user1_id'
      ]
      ? 'friend'
      : 'user';
  };

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket && friends && users) {
      socket.on('statusChange', (data) => {
        setFriendsResponse((prevFriends: any) => {
          const updatedFriends = prevFriends.map((friend: any) => {
            if (friend.user1_id === data.id) {
              return {
                ...friend,
                user: {
                  ...friend.user,
                  online_type: data.online_type,
                  updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSZ'),
                },
              };
            }

            if (friend.user2_id === data.id) {
              return {
                ...friend,
                friend: {
                  ...friend.friend,
                  online_type: data.online_type,
                  updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSZ'),
                },
              };
            }
            return friend;
          });
          return updatedFriends;
        });
        setUsersResponse((prevUsers: any) => {
          const updatedUsers = prevUsers.map((user: any) => {
            if (user.id === data.id) {
              return {
                ...user,
                online_type: data.online_type,
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSZ'),
              };
            }
            return user;
          });
          return updatedUsers;
        });
      });
      return () => {
        socket.off('statusChange');
      };
    }
  }, [socket, friends, users]);

  const children = [
    <div key="1">
      <ul className={sideContentS['friend-list']}>
        {users &&
          users?.map((currentUser: User, index: number) =>
            width <= 1150 && index < 2 ? (
              <li className={s['item']} key={currentUser.id}>
                <ContentCard
                  size={'sm'}
                  contentData={{
                    img: currentUser.user_avatar,
                    status: currentUser.user_status,
                    lastSeen: currentUser.online_type === 'pc-offline' ? currentUser.updatedAt : '',
                    name: currentUser.user_name,
                    link: currentUser.user_nickname,
                  }}
                  type={'friend'}
                  isSearchPage={false}
                  onlineType={currentUser.online_type}
                />
              </li>
            ) : width > 1150 && index < 3 ? (
              <li className={s['item']} key={currentUser.id}>
                <ContentCard
                  size={'sm'}
                  contentData={{
                    img: currentUser.user_avatar,
                    status: currentUser.user_status,
                    lastSeen: currentUser.online_type === 'pc-offline' ? currentUser.updatedAt : '',
                    name: currentUser.user_name,
                    link: currentUser.user_nickname,
                  }}
                  type={'friend'}
                  isSearchPage={false}
                  user={user}
                  currentUser={currentUser}
                  setResponse={setUsersResponse}
                  onlineType={currentUser.online_type}
                />
              </li>
            ) : null,
          )}
      </ul>
    </div>,
    isSearchPage && (
      <div className={sideContentS['mobile-wrapper']} key="2">
        <div className={sideContentS['mobile-block']}>
          <h4 className={sideContentS['sub-title']}>Город</h4>
          <div className={sideContentS['margin-bottom']}>
            {!isCitiesLoading && (
              <SelectComponent
                placeholder={'Выберите'}
                options={cities}
                noOptionsMessage={'Город не найден'}
                className={'side-select'}
                name={'city'}
                value={filterData.city}
                setValue={handleFilterUrl}
              />
            )}
          </div>
        </div>
        <div className={sideContentS['mobile-block']}>
          <h4 className={sideContentS['sub-title']}>Возраст</h4>
          <div className={`${sideContentS['row']} ${sideContentS['age']}`}>
            <SelectComponent
              placeholder={'От'}
              options={age}
              noOptionsMessage={''}
              className={'side-select-age'}
              name={'ageFrom'}
              value={filterData.ageFrom}
              setValue={handleFilterUrl}
            />
            <SelectComponent
              placeholder={'До'}
              options={age}
              noOptionsMessage={''}
              className={'side-select-age'}
              name={'ageTo'}
              value={filterData.ageTo}
              setValue={handleFilterUrl}
            />
          </div>
        </div>
        <div className={sideContentS['gender-block']}>
          <h4 className={sideContentS['sub-title']}>Пол</h4>
          <div className={sideContentS['row']}>
            <GenderInput
              type={'male'}
              icon={maleSvg}
              inputType={'checkbox'}
              checked={filterData.maleGender === 'male' ? true : false}
              value={'male'}
              setValue={handleFilterUrl}
              name={'maleGender'}
            />
            <GenderInput
              type={'female'}
              icon={femaleSvg}
              inputType={'checkbox'}
              checked={filterData.femaleGender === 'female' ? true : false}
              value={'female'}
              setValue={handleFilterUrl}
              name={'femaleGender'}
            />
          </div>
        </div>
        <div className={sideContentS['online-row']}>
          <InputButton
            checked={filterData.online ? true : false}
            onChange={handleFilterUrl}
            name={'online'}
            id="online"
            type={'checkbox'}
            className={'side-online'}
            value={'online'}
          />
          <label htmlFor="online">Сейчас в сети</label>
        </div>
      </div>
    ),
  ];

  return (
    <>
      <div className={s['friends']}>
        <NavContent
          page={'friends'}
          isSearchPage={isSearchPage}
          value={filterData.q}
          setValue={handleFilterUrl}
        />
        <ul className={s['list']}>
          {(isFriendsLoading || isUsersLoading) && <Preloader className="friends" />}
          {!isFriendsLoading && !isSearchPage && friends?.length === 0 && (
            <NotFoundBlock className={'friends'} text={'У тебя ещё нету друзей'} />
          )}
          {isSearchPage &&
            users &&
            users?.map((currentUser: User) => (
              <li className={s['item']} key={currentUser.id}>
                <ContentCard
                  size={'lg'}
                  contentData={{
                    img: currentUser.user_avatar,
                    status: currentUser.user_status,
                    lastSeen: currentUser.online_type === 'pc-offline' ? currentUser.updatedAt : '',
                    name: currentUser.user_name,
                    link: currentUser.user_nickname,
                  }}
                  type={'friend'}
                  isSearchPage={isSearchPage}
                  user={user}
                  currentUser={currentUser}
                  setResponse={setUsersResponse}
                  onlineType={currentUser.online_type}
                />
              </li>
            ))}
          {!isSearchPage &&
            !isFriendsLoading &&
            friends &&
            user &&
            friends?.map((currentUser: any) => {
              if (
                (currentUser.user === null && currentUser.friend?.id === user.id) ||
                (currentUser.friend === null && currentUser.user?.id === user.id) ||
                (currentUser.friend === null && currentUser.user === null)
              )
                return null;
              return (
                <li
                  className={s['item']}
                  key={currentUser[handleUserType(currentUser)]?.id + Math.random()}>
                  <ContentCard
                    size={'lg'}
                    contentData={{
                      img: currentUser[handleUserType(currentUser)]?.user_avatar,
                      status: currentUser[handleUserType(currentUser)]?.user_status,
                      lastSeen:
                        currentUser[handleUserType(currentUser)]?.online_type === 'pc-offline'
                          ? currentUser[handleUserType(currentUser)]?.updatedAt
                          : '',
                      name: currentUser[handleUserType(currentUser)]?.user_name,
                      link: currentUser[handleUserType(currentUser)]?.user_nickname,
                    }}
                    type={
                      params.get('filter') === 'income' || params.get('filter') === 'outcome'
                        ? params.get('filter')
                        : 'friend'
                    }
                    isSearchPage={isSearchPage}
                    user={user}
                    currentUser={currentUser[handleUserType(currentUser)]}
                    setResponse={setFriendsResponse}
                    onlineType={currentUser[handleUserType(currentUser)]?.online_type}
                  />
                </li>
              );
            })}
        </ul>
      </div>
      <SideContent
        className={'friends'}
        isReverse={isSearchPage ? true : false}
        titles={['Возможно, вы знакомы', 'Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default Friends;
