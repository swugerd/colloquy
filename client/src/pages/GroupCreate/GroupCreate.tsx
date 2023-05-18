import React, { FormEvent, useEffect, useState } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './GroupCreate.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import Input from '../../components/UI/Input/Input';
import InputButton from '../../components/UI/InputButton/InputButton';
import SideContent from '../../components/SideContent/SideContent';
import GroupPanel from '../../components/GroupPanel/GroupPanel';
import useWindowSize from '../../hooks/useWindowResize';
import { useAxios } from '../../hooks/useAxios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';

const GroupCreate: React.FC = () => {
  useSetPageTitle('Создание сообщества');

  const { width } = useWindowSize();

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

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

  const [groupData, setGroupData] = useState({
    group_name: '',
    group_avatar: '',
    group_avatar_cache: '',
    group_status: '',
    group_about: '',
    group_adress: '',
    thematic_id: '',
    creator_id: 0,
    city_id: '',
    is_private: false,
  });

  const updateFields = (fields: any) => {
    setGroupData((prev) => {
      return { ...prev, ...fields };
    });
    if (fields['is_private']) {
      if (groupData.is_private) {
        setGroupData((prev) => {
          return { ...prev, is_private: false };
        });
      }
    }
  };

  useEffect(() => {
    userId && setGroupData({ ...groupData, creator_id: userId });
  }, [userId]);

  const children = [
    <div className={`${sideContentS['mobile-wrapper']} ${sideContentS['group-search']}`} key="1">
      <div>
        <h4 className={sideContentS['sub-title']}>Город</h4>
        <div className={sideContentS['margin-bottom']}>
          <SelectComponent
            placeholder={'Выберите'}
            options={cities}
            noOptionsMessage={'Город не найден'}
            className={'side-select'}
            name={'city_id'}
            value={groupData.city_id}
            setValue={updateFields}
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
            name={'thematic_id'}
            value={groupData.thematic_id}
            setValue={updateFields}
          />
        </div>
      </div>
      <div className={sideContentS['margin-top']}>
        <h4 className={sideContentS['sub-title']}>Адрес</h4>
        <Input
          className={'side-adress'}
          placeholder={'@example'}
          type={'text'}
          inputType="default"
          name={'group_adress'}
          value={groupData.group_adress}
          setValue={updateFields}
        />
      </div>
      <div className={`${sideContentS['online-row']} ${sideContentS['align-end']}`}>
        <InputButton
          checked={groupData.is_private ? true : false}
          onChange={updateFields}
          name={'is_private'}
          id="is_private"
          type={'checkbox'}
          className={'side-online'}
          value={'true'}
        />
        <label htmlFor="is_private">Закрытое сообщество</label>
      </div>
    </div>,
  ];

  return (
    <>
      <GroupPanel
        page={'create'}
        title={'Создание сообщества'}
        groupData={groupData}
        updateFields={updateFields}
        cities={cities}
        themes={themes}
        setGroupData={setGroupData}
      />
      {width > 1150 && <SideContent children={children} titles={['Дополнительно']} />}
    </>
  );
};

export default GroupCreate;
