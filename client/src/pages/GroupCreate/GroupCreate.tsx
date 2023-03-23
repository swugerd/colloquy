import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './GroupCreate.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import Input from '../../components/UI/Input/Input';
import InputButton from '../../components/UI/InputButton/InputButton';
import SideContent from '../../components/SideContent/SideContent';
import GroupPanel from '../../components/GroupPanel/GroupPanel';
import useWindowSize from '../../hooks/useWindowResize';

const GroupCreate: React.FC = () => {
  useSetPageTitle('Создание сообщества');

  const { width } = useWindowSize();

  const cities = [
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'ivanteevka', label: 'Ивантеевка' },
    { id: 3, value: 'pivo', label: 'Пиво' },
    { id: 4, value: 'da', label: 'Козел' },
  ];

  const themes = [
    { id: 1, value: 'politics', label: 'Политика' },
    { id: 2, value: 'games', label: 'Игры' },
    { id: 3, value: 'talking', label: 'Общение' },
    { id: 4, value: 'programming', label: 'Программирование' },
  ];

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
            name={''}
            value={''}
            setValue={() => {}}
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
            name={''}
            value={''}
            setValue={() => {}}
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
          name={''}
          value={''}
          setValue={() => {}}
        />
      </div>
      <div className={`${sideContentS['online-row']} ${sideContentS['align-end']}`}>
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
    </div>,
  ];

  return (
    <>
      <GroupPanel page={'create'} title={'Создание сообщества'} />
      {width > 1150 && <SideContent children={children} titles={['Дополнительно']} />}
    </>
  );
};

export default GroupCreate;
