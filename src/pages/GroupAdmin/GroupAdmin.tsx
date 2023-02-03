import React, { useEffect, useState } from 'react';
import GroupPanel from '../../components/GroupPanel/GroupPanel';
import SideContent from '../../components/SideContent/SideContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import useWindowSize from '../../hooks/useWindowResize';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import s from './GroupAdmin.moudle.scss';
import settingsSvg from '../../assets/img/icons/settings.svg';
import suggestSvg from '../../assets/img/icons/suggest.svg';
import blacklistSvg from '../../assets/img/icons/block.svg';
import moderateSvg from '../../assets/img/icons/crown.svg';
import requestSvg from '../../assets/img/icons/request.svg';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import Input from '../../components/UI/Input/Input';
import InputButton from '../../components/UI/InputButton/InputButton';
import { Link, Route, Routes } from 'react-router-dom';
import Icon from '../../components/UI/Icon/Icon';
import Button from '../../components/UI/Button/Button';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';

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

  const [typeIndex, setTypeIndex] = useState(0);

  const dispatch = useAppDispatch();

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

  const children = [
    <div className={sideContentS['group']} key={'1'}>
      {routes.map(({ id, name, iconSettings, path }, index) => (
        <Link
          className={`${sideContentS['option']} ${
            typeIndex === index ? sideContentS['active'] : ''
          }`}
          onClick={() => setTypeIndex(index)}
          key={id}
          to={`/groups/colloquy${path}`}>
          <div className={sideContentS['option-icon']}>
            <Icon
              src={iconSettings.src}
              id={iconSettings.iconId}
              className={iconSettings.className}
              hoverClass={typeIndex === index ? 'active' : ''}
            />
          </div>
          <span className={sideContentS['option-name']}>{name}</span>
          <InputButton
            checked={typeIndex === index}
            onChange={() => setTypeIndex(index)}
            className="relative"
            name={'type'}
            id={''}
            type={'radio'}
          />
        </Link>
      ))}
      <Button className={'group-delete'} text={'Удалить сообщество'} />
    </div>,
  ];
  return (
    <>
      <GroupPanel page={page} title={title} />
      <SideContent children={children} titles={['Панель управления']} className={'friends'} />
    </>
  );
};

export default GroupAdmin;
