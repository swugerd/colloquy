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
    { value: 'moscow', label: 'Москва' },
    { value: 'ivanteevka', label: 'Ивантеевка' },
    { value: 'pivo', label: 'Пиво' },
    { value: 'da', label: 'Козел' },
  ];

  const themes = [
    { value: 'politics', label: 'Политика' },
    { value: 'games', label: 'Игры' },
    { value: 'talking', label: 'Общение' },
    { value: 'programming', label: 'Программирование' },
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
