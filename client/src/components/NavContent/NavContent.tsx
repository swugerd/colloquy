import React, { useContext, useState } from 'react';
import s from './NavContent.module.scss';
import findFriendsSvg from '../../assets/img/icons/find-friends.svg';
import findGroupsSvg from '../../assets/img/icons/find-groups.svg';
import backSvg from '../../assets/img/icons/back.svg';
import createGroupSvg from '../../assets/img/icons/create-group.svg';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Icon from '../UI/Icon/Icon';
import Input from '../UI/Input/Input';
import numberWithSpaces from '../../utils/numberWithSpaces';
import useWindowSize from '../../hooks/useWindowResize';
import { useSelector } from 'react-redux';
import { selectMobile } from '../../redux/mobile/selector';

type NavContentProps = {
  page: 'friends' | 'groups' | 'members';
  isSearchPage: boolean;
};

const NavContent: React.FC<NavContentProps> = ({ page, isSearchPage }) => {
  const { width } = useWindowSize();

  const { mobile } = useSelector(selectMobile);

  const navigate = useNavigate();

  const filterLinks = {
    friends: [
      { id: 1, text: 'Все', path: '/friends' },
      { id: 2, text: 'В сети', path: '/friends?filter=online' },
      { id: 3, text: 'Входящие', path: '/friends?filter=income' },
      { id: 4, text: 'Исходящие', path: '/friends?filter=outcome' },
    ],
    groups: [
      { id: 1, text: 'Все', path: '/groups' },
      { id: 2, text: 'Созданные сообщества', path: '/groups?filter=created' },
    ],
  };

  const buttons = {
    friends: [
      {
        id: 1,
        img: <Icon src={findFriendsSvg} id={'find-friends'} className={'content-icon'} />,
        path: '/friends/search',
      },
    ],
    groups: [
      {
        id: 1,
        img: <Icon src={findGroupsSvg} id={'find-groups'} className={'content-icon'} />,
        path: '/groups/search',
      },
      {
        id: 2,
        img: <Icon src={createGroupSvg} id={'create-group'} className={'content-icon'} />,
        path: '/groups/create',
      },
    ],
  };

  const [selectedFilter, setSelectedFilter] = useState(0);
  const [onSearchPage, setOnsearchPage] = useState(false);

  const members = page === 'members' ? 123456 : 0;

  return (
    <div className={`${s['nav']} ${page === 'members' ? s['members'] : ''}`}>
      <div className={`${s['top']} ${mobile.backText ? s['dnone'] : ''}`}>
        {isSearchPage ? (
          <>
            <h4 className={s['title']}>
              {page === 'friends' ? (
                'Поиск друзей'
              ) : page === 'groups' ? (
                'Поиск сообществ'
              ) : (
                <>
                  Список участников -{' '}
                  <span className={s['members']}>{numberWithSpaces(members)}</span>
                </>
              )}
            </h4>
            <button className={s['row']} onClick={() => navigate(-1)}>
              <div className={s['back-icon']}>
                <Icon src={backSvg} id={'back'} className={'white'} />
              </div>
              <span className={s['back-text']}>
                {page === 'friends'
                  ? 'К списку друзей'
                  : page === 'groups'
                  ? 'К списку сообществ'
                  : 'Обратно к сообществу'}
              </span>
            </button>
          </>
        ) : (
          <>
            <ul className={s['links']}>
              {filterLinks[page === 'friends' ? 'friends' : 'groups'].map(
                ({ id, text, path }, index) => (
                  <li
                    className={`${s['link-item']} ${selectedFilter === id - 1 ? s['active'] : ''}`}
                    key={id}
                    onClick={() => setSelectedFilter(index)}>
                    <Link
                      className={`${s['link']} ${selectedFilter === id - 1 ? s['active'] : ''}`}
                      to={path}>
                      {text}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <div className={s['buttons']}>
              {buttons[page === 'friends' ? 'friends' : 'groups'].map(({ id, img, path }) =>
                path !== undefined ? (
                  <Link
                    className={s['action-link']}
                    to={path}
                    key={id}
                    onClick={() => setOnsearchPage(true)}>
                    {img}
                  </Link>
                ) : (
                  <button className={s['button']} key={id}>
                    {img}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </div>
      <div className={s['bottom']}>
        <Input
          className={'nav-content'}
          placeholder={'Начните вводить'}
          type={'text'}
          inputType={'search'}
          name={''}
          value={''}
          setValue={() => {}}
        />
        {width <= 550 && (
          <div className={`${s['buttons']} ${mobile.backText ? s['dnone'] : ''}`}>
            {buttons[page === 'friends' ? 'friends' : 'groups'].map(({ id, img, path }) =>
              path !== undefined ? (
                <Link to={path} key={id}>
                  {img}
                </Link>
              ) : (
                <button className={s['button']} key={id}>
                  {img}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavContent;
