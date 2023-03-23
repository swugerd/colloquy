import React, { useEffect } from 'react';
import NavContent from '../../components/NavContent/NavContent';
import SideContent from '../../components/SideContent/SideContent';
import ebalo from '../../assets/uploads/test/ebalo.png';
import addSvg from '../../assets/img/icons/add.svg';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Friends.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import messagesSvg from '../../assets/img/icons/chat.svg';
import closeSvg from '../../assets/img/icons/close.svg';
import sideContentS from '../../components/SideContent/SideContent.module.scss';
import HeaderAvatar from '../../components/UI/HeaderAvatar/HeaderAvatar';
import Icon from '../../components/UI/Icon/Icon';
import { Link } from 'react-router-dom';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import GenderInput from '../../components/UI/GenderInput/GenderInput';
import InputButton from '../../components/UI/InputButton/InputButton';
import ContentCard from '../../components/ContentCard/ContentCard';
import { useAppDispatch } from '../../redux/store';
import { setBackButtonType, setHasArrowButton, setHasBackButton } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';

type FriendsProps = {
  isSearchPage: boolean;
};

const Friends: React.FC<FriendsProps> = ({ isSearchPage }) => {
  useSetPageTitle(isSearchPage ? 'Поиск друзей' : 'Друзья', isSearchPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasArrowButton(true));
    if (isSearchPage) {
      dispatch(setHasBackButton('К списку друзей'));
      dispatch(setBackButtonType('button'));
    }
    return () => {
      if (isSearchPage) dispatch(setHasBackButton(''));
      dispatch(setHasArrowButton(false));
    };
  }, [isSearchPage]);

  const { width } = useWindowSize();

  const recFriends = [
    {
      id: 1,
      img: ebalo,
      name: 'Egor_Bdвфывыф asdhjвыфash',
      status: 'егорчик топчикик кмон брооо',
    },
    {
      id: 2,
      img: ebalo,
      name: 'Egor_b',
    },
    {
      id: 3,
      img: ebalo,
      name: 'Egor_b',
      status: 'Егорчик топчик',
    },
  ];

  const friends = [
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
    <div key="1">
      <ul className={sideContentS['friend-list']}>
        {recFriends.map(({ id, img, status, name }, index) =>
          width <= 1150 && index < 2 ? (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'sm'}
                contentData={{
                  img,
                  status,
                  name,
                }}
                type={'friend'}
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
                }}
                type={'friend'}
                isSearchPage={false}
              />
            </li>
          ) : null,
        )}
      </ul>
    </div>,
    isSearchPage && (
      <div className={sideContentS['mobile-wrapper']} key="2">
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
          <div className={`${sideContentS['row']} ${sideContentS['age']}`}>
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
      </div>
    ),
  ];

  return (
    <>
      <div className={s['friends']}>
        <NavContent page={'friends'} isSearchPage={isSearchPage} />
        <ul className={s['list']}>
          {friends.map(({ id, name, img, status, lastSeen }) => (
            <li className={s['item']} key={id}>
              <ContentCard
                size={'lg'}
                contentData={{
                  img,
                  status,
                  lastSeen,
                  name,
                }}
                type={'friend'}
                isSearchPage={isSearchPage}
              />
            </li>
          ))}
        </ul>
      </div>
      <SideContent
        className={'friends'}
        isReverse={isSearchPage ? true : false}
        titles={['Возможно, вы знакомы', 'Улучшим поиск']}>
        {children}
      </SideContent>
    </>
  );
};

export default Friends;
