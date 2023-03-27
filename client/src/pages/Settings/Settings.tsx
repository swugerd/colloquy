import React, { useEffect, useRef, useState } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Settings.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import userSvg from '../../assets/img/icons/user.svg';
import lockSvg from '../../assets/img/icons/lock.svg';
import friendsSvg from '../../assets/img/icons/friends.svg';
import groupSvg from '../../assets/img/icons/groups.svg';
import circlesSvg from '../../assets/img/icons/circles.svg';
import voicesSvg from '../../assets/img/icons/voices.svg';
import photosSvg from '../../assets/img/icons/photos.svg';
import videosSvg from '../../assets/img/icons/videos.svg';
import musicSvg from '../../assets/img/icons/music.svg';
import feedSvg from '../../assets/img/icons/feed.svg';
import blacklistSvg from '../../assets/img/icons/block.svg';
import InputButton from '../../components/UI/InputButton/InputButton';
import { Link } from 'react-router-dom';
import ebalo from '../../assets/uploads/test/ebalo.png';
import Icon from '../../components/UI/Icon/Icon';
import Button from '../../components/UI/Button/Button';
import SideContent from '../../components/SideContent/SideContent';
import Input from '../../components/UI/Input/Input';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import useWindowSize from './../../hooks/useWindowResize';
import { useAppDispatch } from './../../redux/store';
import { setHasArrowButton } from '../../redux/mobile/slice';
import closeSvg from '../../assets/img/icons/close.svg';
import ContentCard from '../../components/ContentCard/ContentCard';
import { useAxios } from '../../hooks/useAxios';

type SettingsProps = {
  page: 'profile' | 'privacy' | 'blacklist';
};

const Settings: React.FC<SettingsProps> = ({ page }) => {
  const title = [
    { id: 1, title: 'Редактирование профиля', page: 'profile' },
    { id: 2, title: 'Настройки приватности', page: 'privacy' },
    { id: 3, title: 'Чёрный список', page: 'blacklist' },
  ].find((title) => title.page === page)?.title;

  useSetPageTitle(title ? title : 'Настройки', title);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHasArrowButton(true));
    return () => {
      dispatch(setHasArrowButton(false));
    };
  }, []);

  const routes = [
    {
      id: 1,
      name: 'Профиль',
      path: '/settings',
      iconSettings: {
        src: userSvg,
        iconId: 'profile',
        className: 'profile',
      },
    },
    {
      id: 2,
      name: 'Приватность',
      path: '/settings/privacy',
      iconSettings: {
        src: lockSvg,
        iconId: 'lock',
        className: 'lock',
      },
    },
    {
      id: 3,
      name: 'Чёрный список',
      path: '/settings/blacklist',
      iconSettings: {
        src: blacklistSvg,
        iconId: 'block',
        className: 'block',
      },
    },
  ];

  const privacySettings = [
    {
      id: 1,
      name: 'Закрытый профиль',
      label: 'profile',
      iconSettings: {
        src: lockSvg,
        iconId: 'lock',
        className: 'lock',
      },
    },
    {
      id: 2,
      name: 'Не показывать моих друзей',
      label: 'friends',
      iconSettings: {
        src: friendsSvg,
        iconId: 'friends',
        className: 'friends',
      },
    },
    {
      id: 3,
      name: 'Не показывать мои сообщества',
      label: 'groups',
      iconSettings: {
        src: groupSvg,
        iconId: 'groups',
        className: 'groups',
      },
    },
    {
      id: 4,
      name: 'Не показывать мои кружочки',
      label: 'circles',
      iconSettings: {
        src: circlesSvg,
        iconId: 'circles',
        className: 'circles',
      },
    },
    {
      id: 5,
      name: 'Не показывать мои войсы',
      label: 'voices',
      iconSettings: {
        src: voicesSvg,
        iconId: 'voices',
        className: 'voices',
      },
    },
    {
      id: 6,
      name: 'Не показывать мои фотографии',
      label: 'photos',
      iconSettings: {
        src: photosSvg,
        iconId: 'photos',
        className: 'photos',
      },
    },
    {
      id: 7,
      name: 'Не показывать мои видео',
      label: 'videos',
      iconSettings: {
        src: videosSvg,
        iconId: 'videos',
        className: 'videos',
      },
    },
    {
      id: 8,
      name: 'Не показывать мою музыку',
      label: 'music',
      iconSettings: {
        src: musicSvg,
        iconId: 'music',
        className: 'music',
      },
    },
    // {
    //   id: 9,
    //   name: 'Не показывать мою коллекцию',
    //   label: 'collection',
    //   iconSettings: {
    //     src: userSvg,
    //     iconId: 'profile',
    //     className: 'profile',
    //   },
    // },
    {
      id: 10,
      name: 'Запретить оставлять записи в моём профиле',
      label: 'feed',
      iconSettings: {
        src: feedSvg,
        iconId: 'feed',
        className: 'feed',
      },
    },
  ];

  const [typeIndex, setTypeIndex] = useState(0);
  const [checkboxes, setCheckboxes] = useState<{
    [key: string]: any;
  }>({});

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    if (name === 'profile') {
      const newCheckboxes: {
        [key: string]: any;
      } = {};
      for (const key in checkboxes) {
        if (key !== name) {
          newCheckboxes[key] = false;
        }
      }
      setCheckboxes({ ...newCheckboxes, [name]: checked });
    } else if (!checkboxes['profile']) {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
  };

  const { response: cities, isLoading: isCitiesLoading } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/cities`,
  });

  const children = [
    <div className={sideContentS['group']} key={'1'}>
      {routes.map(({ id, name, iconSettings, path }, index) => (
        <Link
          className={`${sideContentS['option']} ${
            typeIndex === index ? sideContentS['active'] : ''
          }`}
          onClick={() => setTypeIndex(index)}
          key={id}
          to={`${path}`}>
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
      <Button className={'page-delete'} text={'Удалить страницу'} />
    </div>,
  ];

  const { width } = useWindowSize();

  const users = [
    {
      id: 1,
      name: 'Egor_Bdвфывыф asdhjвыфash',
      img: ebalo,
      status: 'егорчик топчикик кмон брооо егорчик топчикик кмон брооо егорчик топчикик кмон брооо',
    },
    { id: 2, name: 'Egor_B', img: ebalo, lastSeen: 'вчера в 12:22' },
    { id: 3, name: 'Egor_B', img: ebalo },
    { id: 4, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 5, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 6, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 7, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 8, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  // const [image, setImage] = useState(user_avatar_cache || '');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');

  const handleFileUpload = (e: any) => {
    const selectedImage = e.target.files[0];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(selectedImage?.type)) {
      setImageError('Неверный формат изображения (png, jpg, jpeg)');
      setImage('');
      // updateFields({ user_avatar: '', user_avatar_cache: '' });
      return;
    }
    setImage(URL.createObjectURL(selectedImage));
    setImageError('');
    // updateFields({
    //   user_avatar: selectedImage,
    //   user_avatar_cache: URL.createObjectURL(selectedImage),
    // });
  };

  const clearInputValue = () => {
    setImage('');
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // вывести данные в настройках

  // сделать удаление страницы

  // начать разбираться с вебсокетами + попробовать сделать статусы онлайна (возможно убрать из бд)

  return (
    <>
      <div className={s['settings']}>
        <h4 className={s['title']}>{title}</h4>
        {page === 'profile' && (
          <>
            <div className={s['profile-settings']}>
              <div className={s['top-info']}>
                <label
                  className={`${s['avatar-label']} ${image ? s['avatar-preview'] : ''}`}
                  htmlFor="avatar-upload">
                  <div className={s['avatar']}>
                    <img src={image ? image : ebalo} alt="avatar" />
                  </div>
                  <button className={s['undo-preview']} onClick={clearInputValue}>
                    <Icon src={closeSvg} id={'close'} className={'white'} />
                  </button>
                  <input
                    className={s['inp-dis']}
                    onChange={handleFileUpload}
                    type="file"
                    id="avatar-upload"
                    name="avatar-upload"
                    ref={inputRef}
                  />
                </label>
                <div className={s['main-info']}>
                  <div className={s['input-block']}>
                    <label className={s['input-title']} htmlFor={'name'}>
                      Имя
                    </label>
                    <Input
                      className={'profile-settings'}
                      placeholder={'Ваше имя'}
                      type={'text'}
                      inputType={'default'}
                      id={'name'}
                      name={''}
                      value={''}
                      setValue={() => {}}
                    />
                  </div>
                  <div className={s['input-block']}>
                    <label className={s['input-title']} htmlFor={'surname'}>
                      Фамилия
                    </label>
                    <Input
                      className={'profile-settings'}
                      placeholder={'Ваша фамилия'}
                      type={'text'}
                      inputType={'default'}
                      id={'surname'}
                      name={''}
                      value={''}
                      setValue={() => {}}
                    />
                  </div>
                  <div className={`${s['input-block']} ${s['patronymic']}`}>
                    <label className={s['input-title']} htmlFor={'patronymic'}>
                      Отчество
                    </label>
                    <Input
                      className={'profile-settings'}
                      placeholder={'Ваше отчество'}
                      type={'text'}
                      inputType={'default'}
                      id={'patronymic'}
                      name={''}
                      value={''}
                      setValue={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div className={s['input-grid']}>
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'city'}>
                    Город
                  </label>
                  {!isCitiesLoading && (
                    <SelectComponent
                      placeholder={'Выберите'}
                      options={cities}
                      className={'profile-select'}
                      noOptionsMessage={'Город не найден'}
                      id={'city'}
                      name={''}
                      value={''}
                      setValue={() => {}}
                    />
                  )}
                </div>
                {/* <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'birthdate'}>
                    Дата рождения
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'__/__/____'}
                    type={'date'}
                    inputType={'default'}
                    id="birthDate"
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div> */}
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'nickname'}>
                    Никнейм
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваш никнейм'}
                    type={'text'}
                    inputType={'default'}
                    id={'nickname'}
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div>
                {/* <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'password'}>
                    Пароль
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваше имя'}
                    type={'password'}
                    inputType={'default'}
                    id={'password'}
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div> */}
              </div>
              <h4 className={s['sub-title']}>Дополнительно</h4>
              <div className={s['input-grid']}>
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'mainPhone'}>
                    {width >= 1300 ? 'Мобильный телефон' : 'Моб. Телефон'}
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваш телефон'}
                    type={'tel'}
                    inputType={'default'}
                    id="mainPhone"
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div>
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'subPhone'}>
                    {width >= 1300 ? 'Дополнительный телефон' : 'Доп. Телефон'}
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваш доп. телефон'}
                    type={'tel'}
                    inputType={'default'}
                    id="subPhone"
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div>
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'telegram'}>
                    Телеграм
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваш телеграм'}
                    type={'text'}
                    inputType={'default'}
                    id={'telegram'}
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div>
                <div className={s['input-block']}>
                  <label className={s['input-title']} htmlFor={'status'}>
                    Статус
                  </label>
                  <Input
                    className={'profile-settings'}
                    placeholder={'Ваш статус'}
                    type={'text'}
                    inputType={'default'}
                    id={'status'}
                    name={''}
                    value={''}
                    setValue={() => {}}
                  />
                </div>
              </div>
              <div className={s['about-block']}>
                <label className={s['input-title']} htmlFor="about">
                  О себе
                </label>
                <textarea
                  className={s['about-input']}
                  placeholder="Расскажите о себе"
                  id="about"></textarea>
              </div>
            </div>
            <>
              {imageError && (
                <p className={s['error']}>Неверный формат изображения (png, jpg, jpeg)</p>
              )}
              <Button className={'group-create'} text={'Сохранить'} />
            </>
          </>
        )}
        {page === 'privacy' && (
          <div className={s['privacy-settings']}>
            <ul>
              {privacySettings.map(({ id, iconSettings, label, name }) => (
                <li
                  className={`${s['option-item']} ${checkboxes[label] ? s['active'] : ''}`}
                  key={id}>
                  <div className={s['option-icon']}>
                    <Icon
                      src={iconSettings.src}
                      id={iconSettings.iconId}
                      className={iconSettings.className}
                    />
                  </div>
                  <label className={s['option-label']} htmlFor={label}>
                    {name}
                  </label>
                  <InputButton
                    checked={checkboxes[label] || false}
                    onChange={handleCheckboxChange}
                    name={label}
                    id={label}
                    type={'checkbox'}
                    className={'profile-option'}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {page === 'blacklist' &&
          users.map(({ id, name, img, status, lastSeen }) => (
            <div className={s['item']} key={id}>
              <ContentCard
                size={'lg'}
                contentData={{
                  img,
                  status,
                  lastSeen,
                  name,
                }}
                type={page === 'blacklist' || page === 'moderation' ? 'blacklist' : 'orders'}
                isSearchPage={false}
              />
            </div>
          ))}
      </div>
      <SideContent className={'notifies'} titles={['Навигация']}>
        {children}
      </SideContent>
    </>
  );
};

export default Settings;
