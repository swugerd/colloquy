import React, { useEffect } from 'react';
import NavContent from '../../components/NavContent/NavContent';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Groups.module.scss';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import ebalo from '../../assets/uploads/test/ebalo.png';
import ContentCard from '../../components/ContentCard/ContentCard';
import SideContent from '../../components/SideContent/SideContent';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import GenderInput from '../../components/UI/GenderInput/GenderInput';
import InputButton from '../../components/UI/InputButton/InputButton';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';

type GroupsProps = {
  isSearchPage: boolean;
};

const Groups: React.FC<GroupsProps> = ({ isSearchPage }) => {
  useSetPageTitle(isSearchPage ? 'Поиск сообществ' : 'Сообщества', isSearchPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    if (isSearchPage) {
      dispatch(setHasBackButton('К списку сообществ'));
      dispatch(setBackButtonType('button'));
    }
    return () => {
      if (isSearchPage) dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
    };
  }, [isSearchPage]);

  const { width } = useWindowSize();

  const recGroups = [
    {
      id: 1,
      img: ebalo,
      members: 123,
      name: 'Egor_b',
    },
    {
      id: 2,
      img: ebalo,
      name: 'Egor_b',
      members: 123456,
      status: 'Егорчик топчик',
    },
    {
      id: 3,
      img: ebalo,
      name: 'Egor_b',
      members: 12,
      status: 'Егорчик топчик',
    },
  ];

  const groups = [
    { id: 1, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: true },
    { id: 2, name: 'Egor_B', img: ebalo, members: 12345, private: false },
    { id: 3, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: true },
    { id: 4, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: false },
    { id: 5, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: false },
    { id: 6, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: true },
    { id: 7, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: false },
    { id: 8, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: false },
    { id: 9, name: 'Egor_B', img: ebalo, members: 12, status: 'егорчик топчик', isPrivate: false },
  ];

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
    <div key="1">
      <ul className={sideContentS['friend-list']}>
        {recGroups.map(({ id, img, status, name, members }, index) =>
          width <= 1150 && index < 2 ? (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'sm'}
                contentData={{
                  img,
                  status,
                  name,
                  members,
                  link: '',
                }}
                type={'group'}
                isSearchPage={false}
              />
            </li>
          ) : width > 1150 ? (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'sm'}
                contentData={{
                  img,
                  status,
                  name,
                  members,
                  link: '',
                }}
                type={'group'}
                isSearchPage={false}
              />
            </li>
          ) : null,
        )}
      </ul>
    </div>,
    isSearchPage && (
      <div className={`${sideContentS['mobile-wrapper']} ${sideContentS['group-search']}`} key="2">
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
        <div className={sideContentS['align-end']}>
          <h4 className={sideContentS['sub-title']}>Участники</h4>
          <div className={`${sideContentS['row']} ${sideContentS['input']}`}>
            <Input
              className={'side-count'}
              placeholder={'От'}
              type={'text'}
              inputType="default"
              name={''}
              value={''}
              setValue={() => {}}
            />
            <Input
              className={'side-count'}
              placeholder={'До'}
              type={'text'}
              inputType="default"
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
        <div className={`${sideContentS['online-row']} ${sideContentS['align-end']}`}>
          <InputButton
            checked={undefined}
            onChange={undefined}
            name={''}
            id="online"
            type={'checkbox'}
            className={'side-online'}
          />
          <label htmlFor="online">Закрытые сообщества</label>
        </div>
      </div>
    ),
  ];
  return (
    <>
      <div className={s['groups']}>
        <NavContent page={'groups'} isSearchPage={isSearchPage} setValue={() => {}} value={''} />
        <ul className={s['list']}>
          {groups.map(({ id, name, img, status, members, isPrivate }) => (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'lg'}
                contentData={{
                  img,
                  status,
                  members,
                  name,
                  isPrivate,
                  link: '',
                }}
                type={'group'}
                isSearchPage={isSearchPage}
              />
            </li>
          ))}
        </ul>
      </div>
      <SideContent
        className={'friends'}
        isReverse={isSearchPage ? true : false}
        titles={['Рекомендуем посетить', 'Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default Groups;
