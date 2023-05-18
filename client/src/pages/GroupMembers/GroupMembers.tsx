import React, { useEffect, useState } from 'react';
import ContentCard from '../../components/ContentCard/ContentCard';
import NavContent from '../../components/NavContent/NavContent';
import ebalo from '../../assets/uploads/test/ebalo.png';
import s from './GroupMembers.module.scss';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import GenderInput from '../../components/UI/GenderInput/GenderInput';
import InputButton from '../../components/UI/InputButton/InputButton';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import SideContent from '../../components/SideContent/SideContent';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { useAppDispatch } from '../../redux/store';
import {
  setBackButtonType,
  setHasArrowButton,
  setHasBackButton,
  setMembersCount,
} from '../../redux/mobile/slice';
import { selectMobile } from '../../redux/mobile/selector';
import { useSelector } from 'react-redux';
import { useAxios } from '../../hooks/useAxios';
import { useLocation, useSearchParams } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import { selectIsAuth } from '../../redux/auth/selector';

const GroupMembers: React.FC = () => {
  const { pathname } = useLocation();

  const groupRoute = pathname.split('/')[pathname.split('/').length - 2];

  const {
    response: group,
    isLoading: isGroupLoading,
    error: groupError,
  } = useAxios({
    method: 'get',
    url: groupRoute ? `${process.env.REACT_APP_HOSTNAME}/api/groups/getByAdress/${groupRoute}` : '',
  });

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

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
    groupId: 0,
    q: '',
  });

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
    if (userId && group) {
      setFilterData({ ...filterData, userId, groupId: group.id });
    }
  }, [group, userId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsersUrl(
        group && userId
          ? `${process.env.REACT_APP_HOSTNAME}/api/users/filter?groupId=${
              group.id
            }&userId=${userId}${filterData?.q ? `&q=${filterData.q}` : ''}${
              filterData?.city ? `&city=${filterData.city}` : ''
            }${filterData?.ageFrom ? `&ageFrom=${filterData.ageFrom}` : ''}${
              filterData?.ageTo ? `&ageTo=${filterData.ageTo}` : ''
            }${filterData?.femaleGender ? `&femaleGender=${filterData.femaleGender}` : ''}${
              filterData?.maleGender ? `&maleGender=${filterData.maleGender}` : ''
            }${filterData?.online ? `&online=${filterData.online}` : ''}`
          : '',
      );
    }, 500);
    return () => clearTimeout(timeout);
  }, [filterData, userId, group]);

  const {
    response: members,
    isLoading: isMembersLoading,
    error: membersError,
    setResponse: setMembers,
  } = useAxios({
    method: 'get',
    url: usersUrl,
  });

  useSetPageTitle(group ? `Список участников - ${group.group_name}` : 'Группа не найдена', group);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    dispatch(setMembersCount(members && isMembersLoading ? members.length : 0));
    dispatch(setHasBackButton('Вернуться к сообществу'));
    dispatch(setBackButtonType('button'));
    return () => {
      dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
      dispatch(setMembersCount(0));
    };
  }, []);

  const {
    response: cities,
    error: citiesError,
    isLoading: isCitiesLoading,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/cities`,
  });

  const age = Array.from({ length: 87 }, (_, i) => ({
    id: i,
    value: (i + 14).toString(),
    label: (i + 14).toString(),
  }));

  const children = [
    <div className={sideContentS['mobile-wrapper']} key="1">
      <div className={sideContentS['mobile-block']}>
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
      <div className={sideContentS['mobile-block']}>
        <h4 className={sideContentS['sub-title']}>Возраст</h4>
        <div className={sideContentS['row']}>
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
            name="maleGender"
          />
          <GenderInput
            type={'female'}
            icon={femaleSvg}
            inputType={'checkbox'}
            checked={filterData.femaleGender === 'female' ? true : false}
            value={'female'}
            setValue={handleFilterUrl}
            name="femaleGender"
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
          value="online"
        />
        <label htmlFor="online">Сейчас в сети</label>
      </div>
    </div>,
  ];

  return (
    <>
      <div className={s['members']}>
        <NavContent
          page={'members'}
          isSearchPage={true}
          setValue={handleFilterUrl}
          value={filterData.q}
        />
        <ul className={s['list']}>
          {members && !isMembersLoading ? (
            members.map((member: any, index: number) => (
              <li className={s['item']} key={member.id}>
                <ContentCard
                  size={'lg'}
                  contentData={{
                    img: member.user_avatar,
                    status: member.user_status,
                    lastSeen: member.online_type === 'pc-offline' ? member.updatedAt : '',
                    name: member.user_name,
                    link: member.user_nickname,
                  }}
                  type={'members'}
                  onlineType={member.online_type}
                  isSearchPage={false}
                  user={userId}
                  currentUser={member}
                  group={group}
                  setResponse={setMembers}
                />
              </li>
            ))
          ) : (
            <Preloader />
          )}
        </ul>
      </div>
      <SideContent className={'friends'} titles={['Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default GroupMembers;
