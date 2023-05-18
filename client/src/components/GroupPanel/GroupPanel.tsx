import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';
import backSvg from '../../assets/img/icons/back.svg';
import ebalo from '../../assets/uploads/test/ebalo.png';
import s from './GroupPanel.module.scss';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useWindowSize from '../../hooks/useWindowResize';
import SelectComponent from '../UI/SelectComponent/SelectComponent';
import InputButton from '../UI/InputButton/InputButton';
import track from '../../assets/uploads/test/ebalo.png';
import img from '../../assets/uploads/test/ebalo.png';
import closeSvg from '../../assets/img/icons/close.svg';
import video from '../../assets/videos/video.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { setBackButtonType, setHasBackButton } from '../../redux/mobile/slice';
import Post from '../Post/Post';
import ContentCard from '../ContentCard/ContentCard';
import avatar from '../../assets/img/big-icons/upload-photo.png';
import axios from 'axios';
import { useAxios } from '../../hooks/useAxios';
import NotFoundBlock from '../NotFoundBlock/NotFoundBlock';
import { selectIsAuth } from '../../redux/auth/selector';

interface GroupData {
  group_name: string;
  group_avatar: string;
  group_avatar_cache: string;
  group_status: string;
  group_about: string;
  group_adress: string;
  thematic_id: string;
  creator_id: string;
  city_id: string;
  is_private: boolean;
}

type GroupPanelProps = {
  page: 'create' | 'edit' | 'suggest' | 'blacklist' | 'moderation' | 'requests';
  title?: string;
  groupData?: any;
  updateFields?: (fields: any) => void;
  setGroupData?: (fields: any) => void;
  cities?: any;
  themes?: any;
  setUpdateGroupData?: (fields: any) => void;
  updateGroupData?: any;
  updateGroupFields?: (fields: any) => void;
  currentGroup?: any;
  group?: any;
};

const GroupPanel: React.FC<GroupPanelProps> = ({
  page,
  title,
  groupData,
  updateFields,
  cities,
  themes,
  setGroupData,
  setUpdateGroupData,
  updateGroupData,
  updateGroupFields,
  currentGroup,
  group,
}) => {
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasBackButton('К списку сообществ'));
    dispatch(setBackButtonType('button'));
    return () => {
      dispatch(setHasBackButton(''));
    };
  }, []);

  const navigate = useNavigate();

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const {
    response: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useAxios({
    method: 'get',
    url:
      group && page === 'suggest'
        ? `${process.env.REACT_APP_HOSTNAME}/api/groups/suggest/${group.id}`
        : '',
  });

  const {
    response: blockedUsers,
    isLoading: isBlockedUsersLoading,
    error: blockedUsersError,
    setResponse: setBlacklist,
  } = useAxios({
    method: 'get',
    url:
      group && page === 'blacklist'
        ? `${process.env.REACT_APP_HOSTNAME}/api/groups/blacklist/${group.id}`
        : '',
  });

  const {
    response: moderators,
    isLoading: isModeratorsLoading,
    error: moderatorsError,
    setResponse: setModerators,
  } = useAxios({
    method: 'get',
    url:
      group && userId && page === 'moderation'
        ? `${process.env.REACT_APP_HOSTNAME}/api/groups/mods/${group.id}?userId=${userId}`
        : '',
  });

  const {
    response: requests,
    isLoading: isRequestsLoading,
    error: requestsError,
    setResponse: setReqs,
  } = useAxios({
    method: 'get',
    url:
      group && page === 'requests'
        ? `${process.env.REACT_APP_HOSTNAME}/api/groups/req/${group.id}`
        : '',
  });

  const [createImage, setCreateImage] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [imageError, setImageError] = useState('');

  const handleFileUpload = (e: any) => {
    const selectedImage = e.target.files[0];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(selectedImage?.type)) {
      setImageError('Неверный формат изображения (png, jpg, jpeg)');
      page === 'create' ? setCreateImage('') : setUpdateImage('');
      updateFields && updateFields({ group_avatar: '', group_avatar_cache: '' });
      updateGroupFields && updateGroupFields({ group_avatar: '', group_avatar_cache: '' });
      return;
    }
    page === 'create'
      ? setCreateImage(URL.createObjectURL(selectedImage))
      : setUpdateImage(URL.createObjectURL(selectedImage));
    setImageError('');
    updateFields &&
      updateFields({
        group_avatar: selectedImage,
        group_avatar_cache: URL.createObjectURL(selectedImage),
      });
    updateGroupFields &&
      updateGroupFields({
        group_avatar: selectedImage,
        group_avatar_cache: URL.createObjectURL(selectedImage),
      });
  };

  const [serverError, setServerError] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [uniqueError, setUniqueError] = useState('');
  const [statusLengthError, setStatusLengthError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInputValue = () => {
    page === 'create' ? setCreateImage('') : setUpdateImage('');
    setUpdateGroupData &&
      setUpdateGroupData({
        ...updateGroupData,
        group_avatar: '',
        group_avatar_cache: group?.group_avatar ?? '',
      });
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      setServerError(false);
      setValidationError('');
      setImageError('');
      setIsUpdated(false);

      if (
        !groupData.group_name ||
        !groupData.group_avatar ||
        !groupData.city_id ||
        !groupData.thematic_id ||
        !groupData.group_adress
      ) {
        setValidationError('Заполните все обязательные поля');
        return;
      }

      if (groupData.group_status.length > 50) {
        setStatusLengthError('Максимальная длина статуса 50 символов');
        return;
      }

      for (const key in groupData) {
        // @ts-ignore
        formData.append(key, groupData[key]);
      }

      const { data, status } = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/groups`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsUpdated(true);

      navigate(`/groups/${data.group_adress}`);
    } catch (error: any) {
      if (error.response.status === 500) {
        setServerError(true);
      }
      if (error.response.status === 400) {
        setUniqueError(error.response.data.message);
      }
      setIsUpdated(false);
    }
  };

  const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      setServerError(false);
      setValidationError('');
      setImageError('');
      setIsUpdated(false);

      if (
        !updateGroupData.group_name ||
        !updateGroupData.city_id ||
        !updateGroupData.thematic_id ||
        !updateGroupData.group_adress
      ) {
        setValidationError('Заполните все обязательные поля');
        return;
      }

      if (updateGroupData.group_status.length > 50) {
        setStatusLengthError('Максимальная длина статуса 50 символов');
        return;
      }

      for (const key in updateGroupData) {
        // @ts-ignore
        formData.append(key, updateGroupData[key]);
      }

      const { data, status } = await axios({
        method: 'put',
        url: currentGroup ? `${process.env.REACT_APP_HOSTNAME}/api/groups/${currentGroup.id}` : '',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsUpdated(true);
    } catch (error: any) {
      if (error.response.status === 500) {
        setServerError(true);
      }
      if (error.response.status === 400) {
        setUniqueError(error.response.data.message);
      }
      setIsUpdated(false);
    }
  };

  return (
    <div className={s['group-create']}>
      <div className={s['top']}>
        <h3 className={s['title']}>{title}</h3>
        {page === 'create' ? (
          <button className={s['row']} onClick={() => navigate(-1)}>
            <div className={s['back-icon']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            <span className={s['back-text']}>К списку сообществ</span>
          </button>
        ) : (
          <Link className={s['row']} to={`/groups/${group.group_adress}`}>
            <div className={s['back-icon']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            <span className={s['back-text']}>Обратно к сообществу</span>
          </Link>
        )}
      </div>
      {(page === 'create' || page === 'edit') && (
        <form onSubmit={page === 'create' ? handleCreateSubmit : handleUpdateSubmit}>
          <div className={`${s['content']}`}>
            <div className={s['avatar-block']}>
              <h4 className={s['sub-title']}>{page === 'edit' ? '' : 'Загрузим аватар'}</h4>
              <label htmlFor="uploadImage" className={s['upload-image']}>
                <div className={s['avatar-wrapper']}>
                  <div
                    className={
                      updateImage && page === 'edit'
                        ? s['avatar-preview']
                        : createImage || updateGroupData
                        ? s['uploaded-avatar']
                        : s['avatar']
                    }>
                    <img
                      src={
                        createImage
                          ? createImage
                          : updateImage
                          ? updateImage
                          : updateGroupData && page === 'edit'
                          ? `${process.env.REACT_APP_HOSTNAME}/${updateGroupData?.group_avatar_cache}`
                          : avatar
                      }
                      alt=""
                    />
                    {page === 'edit' && (
                      <button className={s['undo-preview']} onClick={clearInputValue} type="button">
                        <Icon src={closeSvg} id={'close'} className={'white'} />
                      </button>
                    )}
                  </div>
                  <p className={s['suggest']}>
                    Перетащите или <span>выберите</span> фото
                  </p>
                </div>
                <input
                  className={s['input']}
                  type="file"
                  name="photo"
                  id="uploadImage"
                  ref={inputRef}
                  onChange={(e: any) => handleFileUpload(e)}
                />
              </label>
            </div>
            <div className={s['main-info']}>
              <div className={s['block']}>
                <h4 className={s['sub-title']}>Название</h4>
                <Input
                  className={'group-info'}
                  placeholder={'Что-то гениальное'}
                  type={'text'}
                  inputType={'default'}
                  value={groupData ? groupData?.group_name : updateGroupData?.group_name}
                  setValue={
                    updateFields ? updateFields : updateGroupFields ? updateGroupFields : () => {}
                  }
                  name={'group_name'}
                />
              </div>
              <div className={s['mobile-block']}>
                <h4 className={s['sub-title']}>Статус</h4>
                <Input
                  className={'group-info'}
                  placeholder={'Девиз сообщества'}
                  type={'text'}
                  value={groupData ? groupData?.group_status : updateGroupData?.group_status}
                  setValue={
                    updateFields ? updateFields : updateGroupFields ? updateGroupFields : () => {}
                  }
                  name={'group_status'}
                  inputType={'default'}
                />
                <span className={s['max']}>Максимальная длина 50 символов</span>
              </div>
            </div>
            {(width <= 1150 || page === 'edit') && (
              <div className={s['sub-info']}>
                <div className={s['mobile-block']}>
                  <h4 className={s['sub-title']}>Город</h4>
                  <SelectComponent
                    placeholder={'Выберите'}
                    options={cities}
                    noOptionsMessage={'Город не найден'}
                    className={'side-select'}
                    name={'city_id'}
                    value={String(group?.city_id)}
                    setValue={updateGroupFields ? updateGroupFields : () => {}}
                  />
                </div>
                <div className={s['mobile-block']}>
                  <h4 className={s['sub-title']}>Тематика</h4>
                  <SelectComponent
                    placeholder={'Выберите'}
                    options={themes}
                    noOptionsMessage={'Тема не найдена'}
                    className={'side-select'}
                    name={'thematic_id'}
                    value={String(group?.thematic_id)}
                    setValue={updateGroupFields ? updateGroupFields : () => {}}
                  />
                </div>
                <div className={s['mobile-block']}>
                  <h4 className={s['sub-title']}>Адрес</h4>
                  <Input
                    className={'group-info'}
                    placeholder={'@example'}
                    type={'text'}
                    inputType="default"
                    name={'group_adress'}
                    value={updateGroupData.group_adress}
                    setValue={updateGroupFields ? updateGroupFields : () => {}}
                  />
                </div>
                {width > 550 && (
                  <div
                    className={`${s['online-row']} ${s['align-end']} ${
                      page === 'edit' ? s['edit'] : ''
                    }`}>
                    <InputButton
                      checked={undefined}
                      onChange={undefined}
                      name={''}
                      id="online"
                      type={'checkbox'}
                      className={'side-online'}
                    />
                    <label htmlFor="online">Закрытое сообщество</label>
                  </div>
                )}
              </div>
            )}
            <div className={`${s['about']} ${page === 'edit' ? s['edit'] : ''}`}>
              <h4 className={s['sub-title']}>Описание</h4>
              <textarea
                className={s['about-input']}
                onChange={
                  setGroupData
                    ? (e) => setGroupData({ ...groupData, group_about: e.target.value })
                    : setUpdateGroupData
                    ? (e) => setUpdateGroupData({ ...updateGroupData, group_about: e.target.value })
                    : () => {}
                }
                value={groupData ? groupData?.group_about : updateGroupData?.group_about}
                name="group_about"
                placeholder="Расскажите о своём сообществе"></textarea>
            </div>
            {width <= 550 && (
              <div
                className={`${s['online-row']} ${s['align-end']} ${
                  page === 'edit' ? s['edit'] : ''
                }`}>
                <InputButton
                  checked={undefined}
                  onChange={undefined}
                  name={''}
                  id="online"
                  type={'checkbox'}
                  className={'side-online'}
                />
                <label htmlFor="online">Закрытое сообщество</label>
              </div>
            )}
          </div>
          <Button className={'group-create'} text={page === 'create' ? 'Создать' : 'Сохранить'} />
        </form>
      )}
      {page === 'suggest' && posts && posts.length ? (
        posts.map((post: any) => (
          <Post
            id={post.id}
            user={post.user}
            content={{ text: post.suggest_text }}
            key={post.id}
            isAdmin={false}
            postType={{
              suggest: {
                isAnonym: post.is_anonym,
              },
            }}
            isForwardPost={false}
            page={'group'}
          />
        ))
      ) : page === 'suggest' ? (
        <NotFoundBlock className={'profile'} text={'Вашей группе ещё не предлогали записи'} />
      ) : (
        ''
      )}
      {page === 'blacklist' && blockedUsers && blockedUsers.length ? (
        blockedUsers.map(({ blockedUser }: any) => (
          <div className={s['item']} key={blockedUser.id}>
            <ContentCard
              size={'lg'}
              contentData={{
                img: blockedUser.user_avatar,
                status: blockedUser.user_status,
                lastSeen: blockedUser.online_type === 'pc-offline' ? blockedUser.updatedAt : '',
                name: blockedUser.user_name,
                link: blockedUser.user_nickname,
              }}
              onlineType={blockedUser.online_type}
              type={'blacklist'}
              isSearchPage={false}
              currentUser={userId}
              user={blockedUser}
              setResponse={setBlacklist}
              group={group}
            />
          </div>
        ))
      ) : page === 'blacklist' ? (
        <NotFoundBlock className={'profile'} text={'Чёрный список пуст'} />
      ) : (
        ''
      )}

      {page === 'moderation' && moderators && moderators.length ? (
        moderators.map(({ user }: any) => (
          <div className={s['item']} key={user.id}>
            <ContentCard
              size={'lg'}
              contentData={{
                img: user.user_avatar,
                status: user.user_status,
                lastSeen: user.online_type === 'pc-offline' ? user.updatedAt : '',
                name: user.user_name,
                link: user.user_nickname,
              }}
              onlineType={user.online_type}
              type={'moderation'}
              isSearchPage={false}
              user={user}
              currentUser={userId}
              setResponse={setModerators}
              group={group}
            />
          </div>
        ))
      ) : page === 'moderation' ? (
        <NotFoundBlock className={'profile'} text={'В группе ещё нет модераторов'} />
      ) : (
        ''
      )}

      {page === 'requests' && requests && requests.length ? (
        requests.map(({ user }: any) => (
          <div className={s['item']} key={user.id}>
            <ContentCard
              size={'lg'}
              contentData={{
                img: user.user_avatar,
                status: user.user_status,
                lastSeen: user.online_type === 'pc-offline' ? user.updatedAt : '',
                name: user.user_name,
                link: user.user_nickname,
              }}
              onlineType={user.online_type}
              type={'orders'}
              isSearchPage={false}
              setResponse={setReqs}
              user={user}
              group={group}
            />
          </div>
        ))
      ) : page === 'requests' ? (
        <NotFoundBlock className={'profile'} text={'Заявок нет'} />
      ) : (
        ''
      )}

      {imageError && <p className={s['error']}>Неверный формат изображения (png, jpg, jpeg)</p>}
      {validationError && <p className={s['error']}>{validationError}</p>}
      {statusLengthError && <p className={s['error']}>{statusLengthError}</p>}
      {uniqueError && <p className={s['error']}>{uniqueError}</p>}
      {isUpdated && page === 'edit' && <p className={s['success']}>Данные обновлены</p>}
    </div>
  );
};

export default GroupPanel;
