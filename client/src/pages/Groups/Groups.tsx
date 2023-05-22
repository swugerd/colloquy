import React, { useEffect, useState } from 'react';
import NavContent from '../../components/NavContent/NavContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Groups.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import ContentCard from '../../components/ContentCard/ContentCard';
import SideContent from '../../components/SideContent/SideContent';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import InputButton from '../../components/UI/InputButton/InputButton';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';
import { useAxios } from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Preloader from '../../components/Preloader/Preloader';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import { useSearchParams } from 'react-router-dom';

type GroupsProps = {
  isSearchPage: boolean;
};

const Groups: React.FC<GroupsProps> = ({ isSearchPage }) => {
  useSetPageTitle(isSearchPage ? 'Поиск сообществ' : 'Сообщества', isSearchPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    if (isSearchPage) {
      dispatch(setHasBackButton('К списку сообществ'));
      dispatch(setBackButtonType('button'));
    }
    return () => {
      if (isSearchPage) dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
    };
  }, [isSearchPage]);

  const { width } = useWindowSize();

  const { user, isLoading: isUserLoading } = useAuth();

  const [params, setParams] = useSearchParams();

  const [filterData, setFilterData] = useState<{ [key: string]: any }>({
    city: '',
    thematic: '',
    isPrivate: '',
    membersFrom: '',
    membersTo: '',
    userId: 0,
    q: '',
  });

  const [groupsUrl, setGroupsUrl] = useState('');

  const handleFilterUrl = (fields: any) => {
    setFilterData((prev) => {
      return { ...prev, ...fields };
    });

    if (fields['isPrivate']) {
      if (filterData.isPrivate !== '') {
        setFilterData((prev) => {
          return { ...prev, isPrivate: '' };
        });
      }
    }
  };

  useEffect(() => {
    if (isSearchPage && user) {
      setFilterData({ ...filterData, userId: user.id });
    }
    if (!isSearchPage) {
      setFilterData({});
    }
  }, [isSearchPage, user]);

  useEffect(() => {
    if (isSearchPage) {
      const timeout = setTimeout(() => {
        setGroupsUrl(
          user
            ? `${process.env.REACT_APP_HOSTNAME}/api/groups/filter?userId=${user.id}${
                filterData?.q ? `&q=${filterData.q}` : ''
              }${filterData?.city ? `&city=${filterData.city}` : ''}${
                filterData?.thematic ? `&thematic=${filterData.thematic}` : ''
              }${filterData?.membersFrom ? `&membersFrom=${filterData.membersFrom}` : ''}${
                filterData?.membersTo ? `&membersTo=${filterData.membersTo}` : ''
              }${filterData?.isPrivate ? `&isPrivate=${filterData.isPrivate}` : ''}`
            : '',
        );
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setGroupsUrl(
        user ? `${process.env.REACT_APP_HOSTNAME}/api/groups/filter?userId=${user.id}` : '',
      );
    }
  }, [filterData, user]);

  const {
    response: userGroups,
    isLoading: isUserGroupsLoading,
    error: userGroupsError,
    setResponse: setUserGroups,
  } = useAxios({
    method: 'get',
    url: user
      ? `${process.env.REACT_APP_HOSTNAME}/api/groups/${
          params.get('filter') === null
            ? user.id
            : `filter?filterType=${params.get('filter')}&userId=${user.id}`
        }`
      : '',
  });

  const {
    response: groups,
    isLoading: isGroupsLoading,
    error: groupsError,
    setResponse: setGroups,
  } = useAxios({
    method: 'get',
    url: groupsUrl,
  });

  const {
    response: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/cities`,
  });

  const {
    response: themes,
    isLoading: isThemesLoading,
    error: themesError,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/thematics`,
  });

  const children = [
    <div key="1">
      <ul className={sideContentS['friend-list']}>
        {groups &&
          groups.map(({ group }: any, index: number) =>
            width <= 1150 && index < 2 ? (
              <li className={s['item']} key={group.id}>
                <ContentCard
                  size={'sm'}
                  contentData={{
                    img: group.group_avatar,
                    status: group.group_status,
                    name: group.group_name,
                    members: group.members.length,
                    link: group.group_adress,
                  }}
                  type={'group'}
                  isSearchPage={false}
                  setResponse={setGroups}
                  group={group}
                  user={user}
                />
              </li>
            ) : width > 1150 ? (
              <li className={s['item']} key={group.id}>
                <ContentCard
                  size={'sm'}
                  contentData={{
                    img: group.group_avatar,
                    status: group.group_status,
                    name: group.group_name,
                    members: group.members.length,
                    link: group.group_adress,
                    isPrivate: group.is_private,
                  }}
                  type={'group'}
                  isSearchPage={false}
                  setResponse={setGroups}
                  group={group}
                  user={user}
                />
              </li>
            ) : null,
          )}
      </ul>
    </div>,
    isSearchPage && (
      <div className={`${sideContentS['mobile-wrapper']} ${sideContentS['group-search']}`} key="2">
        <div>
          <h4 className={sideContentS['sub-title']}>Город</h4>
          <div className={sideContentS['margin-bottom']}>
            <SelectComponent
              placeholder={'Выберите'}
              options={cities}
              noOptionsMessage={'Город не найден'}
              className={'side-select'}
              name={'city'}
              value={filterData.city}
              setValue={handleFilterUrl}
            />
          </div>
        </div>
        <div className={sideContentS['align-end']}>
          <h4 className={sideContentS['sub-title']}>Участники</h4>
          <div className={`${sideContentS['row']} ${sideContentS['input']}`}>
            <Input
              className={'side-count'}
              placeholder={'От'}
              type={'text'}
              inputType="default"
              name={'membersFrom'}
              value={filterData.membersFrom}
              setValue={handleFilterUrl}
            />
            <Input
              className={'side-count'}
              placeholder={'До'}
              type={'text'}
              inputType="default"
              name={'membersTo'}
              value={filterData.membersTo}
              setValue={handleFilterUrl}
            />
          </div>
        </div>
        <div>
          <h4 className={sideContentS['sub-title']}>Тематика</h4>
          <div className={sideContentS['row']}>
            <SelectComponent
              placeholder={'Выберите'}
              options={themes}
              noOptionsMessage={'Тема не найдена'}
              className={'side-select'}
              name={'thematic'}
              value={filterData.thematic}
              setValue={handleFilterUrl}
            />
          </div>
        </div>
        <div className={`${sideContentS['online-row']} ${sideContentS['align-end']}`}>
          <InputButton
            checked={filterData.isPrivate ? true : false}
            onChange={handleFilterUrl}
            name={'isPrivate'}
            id="isPrivate"
            type={'checkbox'}
            className={'side-online'}
            value="true"
          />
          <label htmlFor="isPrivate">Закрытые сообщества</label>
        </div>
      </div>
    ),
  ];
  return (
    <>
      <div className={s['groups']}>
        <NavContent
          page={'groups'}
          isSearchPage={isSearchPage}
          setValue={handleFilterUrl}
          value={filterData.q}
        />
        {(isGroupsLoading || isUserGroupsLoading) && <Preloader className="friends" />}
        {!isUserGroupsLoading && !isSearchPage && userGroups?.length === 0 && (
          <NotFoundBlock className={'friends'} text={'Ты ещё не вступал в группы'} />
        )}
        <ul className={s['list']}>
          {!isSearchPage &&
            userGroups &&
            userGroups?.map(({ group }: any) => (
              <li className={s['item']} key={group.id}>
                <ContentCard
                  size={'lg'}
                  contentData={{
                    img: group.group_avatar,
                    status: group.group_status,
                    members: group.members?.length,
                    name: group.group_name,
                    isPrivate: group.is_private,
                    link: group.group_adress,
                  }}
                  type={'group'}
                  isSearchPage={isSearchPage}
                  setResponse={setUserGroups}
                  group={group}
                  user={user}
                />
              </li>
            ))}
          {isSearchPage &&
            groups &&
            groups?.map(({ group }: any) => (
              <li className={s['item']} key={group.id}>
                <ContentCard
                  size={'lg'}
                  contentData={{
                    img: group.group_avatar,
                    status: group.group_status,
                    members: group.members?.length,
                    name: group.group_name,
                    isPrivate: group.is_private,
                    link: group.group_adress,
                  }}
                  type={'group'}
                  isSearchPage={isSearchPage}
                  setResponse={setGroups}
                  group={group}
                  user={user}
                />
              </li>
            ))}
        </ul>
      </div>
      <SideContent
        className={'friends'}
        isReverse={isSearchPage ? true : false}
        titles={['Рекомендуем посетить', 'Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default Groups;
