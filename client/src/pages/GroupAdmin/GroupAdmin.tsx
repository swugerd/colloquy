import React, { useEffect, useState } from 'react';
import GroupPanel from '../../components/GroupPanel/GroupPanel';
import SideContent from '../../components/SideContent/SideContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import useWindowSize from '../../hooks/useWindowResize';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import settingsSvg from '../../assets/img/icons/settings.svg';
import suggestSvg from '../../assets/img/icons/suggest.svg';
import blacklistSvg from '../../assets/img/icons/block.svg';
import moderateSvg from '../../assets/img/icons/crown.svg';
import requestSvg from '../../assets/img/icons/request.svg';
import InputButton from '../../components/UI/InputButton/InputButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/UI/Icon/Icon';
import Button from '../../components/UI/Button/Button';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';
import { useAxios } from '../../hooks/useAxios';
import Preloader from '../../components/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import { setConfirmModalType, setIsConfirmModalOpen } from '../../redux/modal/slice';

type GroupAdminProps = {
  page: 'create' | 'edit' | 'suggest' | 'blacklist' | 'moderation' | 'requests';
};

const GroupAdmin: React.FC<GroupAdminProps> = ({ page }) => {
  const title = [
    { title: 'Создание сообщества', page: 'create' },
    { title: 'Настройки сообщества', page: 'edit' },
    { title: 'Предложка', page: 'suggest' },
    { title: 'Чёрный список', page: 'blacklist' },
    { title: 'Список модераторов', page: 'moderation' },
    { title: 'Заявки', page: 'requests' },
  ].find((item) => item.page === page)?.title;

  useSetPageTitle(title ? title : 'Редактирование сообщества', title);

  const { width } = useWindowSize();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    dispatch(setHasBackButton('Вернуться к сообществу'));
    dispatch(setBackButtonType('link'));
    return () => {
      dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
      dispatch(setBackButtonType('link'));
    };
  }, []);

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

  if (userId && group && !group.members.find((member: any) => member.user_id === userId).is_admin) {
    navigate('/groups');
  }

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setConfirmModalType('groupDelete'));
  };

  const [updateGroupData, setUpdateGroupData] = useState({
    group_name: '',
    group_avatar: '',
    group_avatar_cache: '',
    group_status: '',
    group_about: '',
    group_adress: '',
    thematic_id: '',
    city_id: '',
  });

  useEffect(() => {
    if (!isGroupLoading && group) {
      setUpdateGroupData((prev) => {
        return {
          ...prev,
          group_name: group?.group_name ?? '',
          group_avatar_cache: group?.group_avatar ?? '',
          group_status: group?.group_status ?? '',
          group_about: group?.group_about ?? '',
          group_adress: group?.group_adress ?? '',
          thematic_id: group?.thematic_id ?? 0,
          city_id: group?.city_id ?? 0,
        };
      });
    }
  }, [isGroupLoading, group]);

  const updateFields = (fields: any) => {
    setUpdateGroupData((prev) => {
      return { ...prev, ...fields };
    });
  };

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

  const routes = [
    {
      id: 1,
      name: 'Настройки',
      path: '/edit',
      iconSettings: {
        src: settingsSvg,
        iconId: 'settings',
        className: 'settings',
      },
    },
    {
      id: 2,
      name: 'Предложка',
      path: '/suggest',
      iconSettings: {
        src: suggestSvg,
        iconId: 'suggest',
        className: 'suggest',
      },
    },
    {
      id: 3,
      name: 'Чёрный список',
      path: '/blacklist',
      iconSettings: {
        src: blacklistSvg,
        iconId: 'block',
        className: 'block',
      },
    },
    {
      id: 4,
      name: 'Модерация',
      path: '/moderation',
      iconSettings: {
        src: moderateSvg,
        iconId: 'crown',
        className: 'crown',
      },
    },
    {
      id: 5,
      name: 'Заявки',
      path: '/requests',
      iconSettings: {
        src: requestSvg,
        iconId: 'request',
        className: 'request',
      },
    },
  ];

  const adminRoute = pathname.split('/')[pathname.split('/').length - 1];

  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    setSelectedFilter(
      adminRoute === 'suggest'
        ? 1
        : adminRoute === 'blacklist'
        ? 2
        : adminRoute === 'moderation'
        ? 3
        : adminRoute === 'requests'
        ? 4
        : 0,
    );
  }, []);

  const children = [
    <div className={sideContentS['group']} key={'1'}>
      {routes.map(({ id, name, iconSettings, path }, index) => (
        <Link
          className={`${sideContentS['option']} ${
            selectedFilter === index ? sideContentS['active'] : ''
          }`}
          onClick={() => setSelectedFilter(index)}
          key={id}
          to={group ? `/groups/${group.group_adress}${path}` : ''}>
          <div className={sideContentS['option-icon']}>
            <Icon
              src={iconSettings.src}
              id={iconSettings.iconId}
              className={iconSettings.className}
              hoverClass={selectedFilter === index ? 'active' : ''}
            />
          </div>
          <span className={sideContentS['option-name']}>{name}</span>
          <InputButton
            checked={selectedFilter === index}
            onChange={() => setSelectedFilter(index)}
            className="relative"
            name={'type'}
            id={''}
            type={'radio'}
          />
        </Link>
      ))}
      {userId && group && userId === group.creator_id && (
        <Button
          className={'group-delete'}
          text={'Удалить сообщество'}
          onClick={(e) => handleModalOpen(e)}
        />
      )}
    </div>,
  ];
  return group && cities && themes ? (
    <>
      <GroupPanel
        page={page}
        title={title}
        cities={cities}
        themes={themes}
        updateGroupData={updateGroupData}
        setUpdateGroupData={setUpdateGroupData}
        updateGroupFields={updateFields}
        currentGroup={group}
        group={group}
      />
      <SideContent children={children} titles={['Панель управления']} className={'friends'} />
    </>
  ) : (
    <Preloader className="profile" />
  );
};

export default GroupAdmin;
