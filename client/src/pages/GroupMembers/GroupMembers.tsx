import React, { useEffect } from 'react';
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

const GroupMembers: React.FC = () => {
  const members = [
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

  const isAdmin = true;

  useSetPageTitle(`Список участников - ${members.length}`);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    dispatch(setMembersCount(members.length));
    dispatch(setHasBackButton('Вернуться к сообществу'));
    dispatch(setBackButtonType('button'));
    return () => {
      dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
      dispatch(setMembersCount(0));
    };
  }, []);

  const cities = [
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'ivanteevka', label: 'Ивантеевка' },
    { id: 3, value: 'pivo', label: 'Пиво' },
    { id: 4, value: 'da', label: 'Козел' },
  ];

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
            name={''}
            value={''}
            setValue={() => {}}
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
            name={''}
            value={''}
            setValue={() => {}}
          />
          <SelectComponent
            placeholder={'До'}
            options={age}
            noOptionsMessage={''}
            className={'side-select-age'}
            name={''}
            value={''}
            setValue={() => {}}
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
            checked={false}
            value={''}
            setValue={() => {}}
          />
          <GenderInput
            type={'female'}
            icon={femaleSvg}
            inputType={'checkbox'}
            checked={false}
            value={''}
            setValue={() => {}}
          />
        </div>
      </div>
      <div className={sideContentS['online-row']}>
        <InputButton
          checked={undefined}
          onChange={undefined}
          name={''}
          id="online"
          type={'checkbox'}
          className={'side-online'}
        />
        <label htmlFor="online">Сейчас в сети</label>
      </div>
    </div>,
  ];

  return (
    <>
      <div className={s['members']}>
        <NavContent page={'members'} isSearchPage={true} />
        <ul className={s['list']}>
          {members.map(({ id, name, img, status, lastSeen }) => (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'lg'}
                contentData={{
                  img,
                  status,
                  lastSeen,
                  name,
                }}
                type={'members'}
                isSearchPage={false}
                isAdmin={isAdmin}
              />
            </li>
          ))}
        </ul>
      </div>
      <SideContent className={'friends'} titles={['Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default GroupMembers;
