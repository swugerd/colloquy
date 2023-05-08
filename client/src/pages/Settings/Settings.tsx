import React, { useEffect, useRef, useState, FormEvent } from 'react';
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
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import useWindowSize from './../../hooks/useWindowResize';
import { useAppDispatch } from './../../redux/store';
import { setHasArrowButton } from '../../redux/mobile/slice';
import closeSvg from '../../assets/img/icons/close.svg';
import ContentCard from '../../components/ContentCard/ContentCard';
import { useAxios } from '../../hooks/useAxios';
import useAuth from './../../hooks/useAuth';
import Preloader from '../../components/Preloader/Preloader';
import { setIsAuth, setUserName, setUserNickname } from '../../redux/auth/slice';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import { PatternFormat } from 'react-number-format';
import { setConfirmModalType, setIsConfirmModalOpen } from '../../redux/modal/slice';

type SettingsProps = {
  page: 'profile' | 'privacy' | 'blacklist';
};

interface INITIAL_DATA_TYPE {
  user_nickname: string;
  user_name: string;
  user_surname: string;
  user_patronymic: string | null;
  city_id: number;
  user_telegram: string | null;
  user_status: string | null;
  user_phone: string | null;
  user_sub_phone: string | null;
  user_about: string | null;
  user_avatar: string;
  user_avatar_cache: string;
}

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

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setConfirmModalType('pageDelete'));
  };

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

  const { user, isLoading: isUserLoading } = useAuth();

  const [profileData, setProfileData] = useState<INITIAL_DATA_TYPE>({
    user_nickname: !isUserLoading && user?.user_nickname ? user.user_nickname : '',
    user_name: !isUserLoading && user?.user_name ? user.user_name : '',
    user_surname: !isUserLoading && user?.user_surname ? user.user_surname : '',
    user_patronymic: !isUserLoading && user?.user_patronymic ? user.user_patronymic : '',
    city_id: !isUserLoading && user?.city.id ? user.city.id : Number(''),
    user_avatar: !isUserLoading && user?.user_avatar ? user.user_avatar : '',
    user_telegram: !isUserLoading && user?.user_telegram ? user.user_telegram : '',
    user_phone: !isUserLoading && user?.user_phone ? user.user_phone : '',
    user_sub_phone: !isUserLoading && user?.user_sub_phone ? user.user_sub_phone : '',
    user_status: !isUserLoading && user?.user_status ? user.user_status : '',
    user_about: !isUserLoading && user?.user_about ? user.user_about : '',
    user_avatar_cache: '',
  });

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
      <Button
        className={'page-delete'}
        text={'Удалить страницу'}
        onClick={(e) => handleModalOpen(e)}
      />
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

  useEffect(() => {
    if (!isUserLoading) {
      setProfileData((prev) => {
        return {
          ...prev,
          user_nickname: user?.user_nickname ?? '',
          user_name: user?.user_name ?? '',
          user_surname: user?.user_surname ?? '',
          user_patronymic: user?.user_patronymic ?? '',
          city_id: user?.city.id ?? 0,
          user_avatar: '',
          user_telegram: user?.user_telegram ?? '',
          user_phone: user?.user_phone ?? '',
          user_sub_phone: user?.user_sub_phone ?? '',
          user_status: user?.user_status ?? '',
          user_about: user?.user_about ?? '',
          user_avatar_cache: user?.user_avatar ?? '',
        };
      });
    }
  }, [isUserLoading]);

  const inputRef = useRef<HTMLInputElement>(null);

  const formatPhoneNumber = (value: any) => {
    if (!value) {
      return '';
    }

    return value
      .replace(/\D/g, '')
      .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/, '+$1 ($2) $3 $4 $5');
  };

  const normalizePhoneNumber = (value: any) => {
    return value.replace(/\s/g, '');
  };

  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');

  const handleFileUpload = (e: any) => {
    const selectedImage = e.target.files[0];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(selectedImage?.type)) {
      setImageError('Неверный формат изображения (png, jpg, jpeg)');
      setImage('');
      setProfileData({
        ...profileData,
        user_avatar: '',
        user_avatar_cache: user?.user_avatar ?? '',
      });
      return;
    }
    setImage(URL.createObjectURL(selectedImage));
    setImageError('');
    setProfileData({
      ...profileData,
      user_avatar: selectedImage,
      user_avatar_cache: URL.createObjectURL(selectedImage),
    });
  };

  const clearInputValue = () => {
    setImage('');
    setProfileData({ ...profileData, user_avatar: '', user_avatar_cache: user?.user_avatar ?? '' });
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const updateFields = (fields: any) => {
    setProfileData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleTextAreaChange = (e: any) => {
    setProfileData((prev) => {
      return { ...prev, user_about: e.target.value };
    });
  };

  const [serverError, setServerError] = useState(false);
  const [phoneFormatError, setPhoneFormatError] = useState(false);

  const [validationError, setValidationError] = useState('');

  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (user) {
      try {
        setServerError(false);
        setPhoneFormatError(false);
        setValidationError('');
        setImageError('');
        setIsUpdated(false);

        if (!profileData.user_name || !profileData.user_surname || !profileData.user_nickname) {
          setValidationError('Заполните все обязательные поля');
          return;
        }

        for (const key in profileData) {
          // @ts-ignore
          formData.append(key, profileData[key]);
        }

        const { data, status } = await axios({
          method: 'put',
          url: `${process.env.REACT_APP_HOSTNAME}/api/users/${user.id}`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsUpdated(true);
        dispatch(setUserName(profileData.user_name));
        dispatch(setUserNickname(profileData.user_nickname));
      } catch (error: any) {
        if (error.response.status === 500) {
          setServerError(true);
        }
        if (error.response.status === 400) {
          setPhoneFormatError(true);
        }
        setIsUpdated(false);
      }
    }
  };

  // начать разбираться с вебсокетами + попробовать сделать статусы онлайна (возможно убрать из бд)

  return (
    <>
      {!isUserLoading && !isCitiesLoading ? (
        <div className={s['settings']}>
          <h4 className={s['title']}>{title}</h4>
          {page === 'profile' && (
            <>
              <form className={s['profile-settings']} onSubmit={handleSubmit}>
                <div className={s['top-info']}>
                  <label
                    className={`${s['avatar-label']} ${image ? s['avatar-preview'] : ''}`}
                    htmlFor="avatar-upload">
                    <div className={s['avatar']}>
                      <img
                        src={
                          image
                            ? image
                            : `${process.env.REACT_APP_HOSTNAME}/${profileData.user_avatar_cache}`
                        }
                        alt="avatar"
                      />
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
                        name={'user_name'}
                        value={profileData.user_name}
                        setValue={updateFields}
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
                        name={'user_surname'}
                        value={profileData.user_surname}
                        setValue={updateFields}
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
                        name={'user_patronymic'}
                        value={profileData.user_patronymic ? profileData.user_patronymic : ''}
                        setValue={updateFields}
                      />
                    </div>
                  </div>
                </div>
                <div className={s['input-grid']}>
                  <div className={s['input-block']}>
                    <label className={s['input-title']} htmlFor={'city'}>
                      Город
                    </label>
                    <SelectComponent
                      placeholder={'Выберите'}
                      options={cities}
                      className={'profile-select'}
                      noOptionsMessage={'Город не найден'}
                      id={'city'}
                      name={'city_id'}
                      value={String(user?.city.id)}
                      setValue={updateFields}
                    />
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
                      name={'user_nickname'}
                      value={profileData.user_nickname}
                      setValue={updateFields}
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
                    {/* <Input
                      className={'profile-settings'}
                      placeholder={'Ваш телефон'}
                      type={'tel'}
                      inputType={'default'}
                      id="mainPhone"
                      name={'user_phone'}
                      value={profileData.user_phone}
                      setValue={updateFields}
                    /> */}
                    <PatternFormat
                      format="+# (###) ### ##-##"
                      mask="_"
                      customInput={Input}
                      name={'user_phone'}
                      className={'profile-settings'}
                      placeholder={'Ваш телефон'}
                      value={profileData.user_phone || ''}
                      onChange={(e: any) => {
                        updateFields({ user_phone: e.target.value });
                      }}
                      setValue={() => {}}
                      inputType={'default'}
                    />
                  </div>
                  <div className={s['input-block']}>
                    <label className={s['input-title']} htmlFor={'subPhone'}>
                      {width >= 1300 ? 'Дополнительный телефон' : 'Доп. Телефон'}
                    </label>
                    {/* <Input
                      className={'profile-settings'}
                      placeholder={'Ваш доп. телефон'}
                      type={'tel'}
                      inputType={'default'}
                      id="subPhone"
                      name={'user_sub_phone'}
                      value={profileData.user_sub_phone}
                      setValue={updateFields}
                    /> */}
                    <PatternFormat
                      format="+# (###) ### ##-##"
                      mask="_"
                      customInput={Input}
                      name={'user_sub_phone'}
                      className={'profile-settings'}
                      placeholder={'Ваш доп. телефон'}
                      value={profileData.user_sub_phone || ''}
                      onChange={(e: any) => {
                        updateFields({ user_sub_phone: e.target.value });
                      }}
                      setValue={() => {}}
                      inputType={'default'}
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
                      name={'user_telegram'}
                      value={profileData.user_telegram}
                      setValue={updateFields}
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
                      name={'user_status'}
                      value={profileData.user_status}
                      setValue={updateFields}
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
                    id="about"
                    name="user_about"
                    value={profileData.user_about ? profileData.user_about : ''}
                    onChange={(e) => handleTextAreaChange(e)}></textarea>
                </div>
                <Button className={'group-create'} text={'Сохранить'} />
              </form>
              <>
                {imageError && (
                  <p className={s['error']}>Неверный формат изображения (png, jpg, jpeg)</p>
                )}
                {validationError && <p className={s['error']}>Заполните обязательные поля</p>}
                {serverError && (
                  <p className={s['error']}>Данные используются другим пользователем</p>
                )}
                {phoneFormatError && (
                  <p className={s['error']}>Неверный формат телефона +7 (777) 777 77-77</p>
                )}
                {isUpdated && <p className={s['success']}>Информация обновлена!</p>}
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
                    link: '',
                  }}
                  type={page === 'blacklist' || page === 'moderation' ? 'blacklist' : 'orders'}
                  isSearchPage={false}
                />
              </div>
            ))}
        </div>
      ) : (
        <Preloader className={'settings'} />
      )}
      <SideContent className={'notifies'} titles={['Навигация']}>
        {children}
      </SideContent>
    </>
  );
};

export default Settings;
