import React from 'react';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowResize';
import s from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { width } = useWindowSize();
  const id = 'swugerd';
  const links = [
    {
      id: 1,
      img: (
        <svg
          className={`${s['nav-img']} ${s['feed']}`}
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="18" height="20" rx="2" stroke="white" strokeWidth="2" />
          <rect x="4" y="4" width="12" height="2" rx="1" fill="white" />
          <rect x="4" y="8" width="12" height="2" rx="1" fill="white" />
          <rect x="4" y="12" width="12" height="2" rx="1" fill="white" />
        </svg>
      ),
      text: 'Новости',
      path: 'feed',
    },
    {
      id: 2,
      img: (
        <svg
          className={`${s['nav-img']} ${s['profile']}`}
          width="17"
          height="28"
          viewBox="0 0 17 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="8.61538" cy="5.02564" r="5.02564" fill="white" />
          <path
            d="M16.5128 19.7436C16.5128 17.5539 15.643 15.4538 14.0946 13.9054C12.5462 12.3571 10.4461 11.4872 8.25641 11.4872C6.06667 11.4872 3.96662 12.3571 2.41825 13.9054C0.86987 15.4538 3.30641e-07 17.5539 0 19.7436L8.25641 19.7436H16.5128Z"
            fill="white"
          />
        </svg>
      ),
      text: 'Профиль',
      path: `profile/${id}`,
    },
    {
      id: 3,
      img: (
        <svg
          className={`${s['nav-img']} ${s['friends']}`}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.69233" cy="4.48719" r="4.48719" fill="white" />
          <path
            d="M14.7436 17.6282C14.7436 15.673 13.9669 13.798 12.5845 12.4155C11.202 11.033 9.32693 10.2563 7.37181 10.2563C5.41668 10.2563 3.54163 11.033 2.15915 12.4155C0.776671 13.798 2.95216e-07 15.673 0 17.6282L7.37181 17.6282H14.7436Z"
            fill="white"
          />
          <circle cx="17.3077" cy="4.68759" r="3.64584" fill="white" />
          <path
            d="M23.9584 16.7068C23.9584 15.3361 23.624 13.9926 22.9928 12.8271C22.3616 11.6616 21.4585 10.7203 20.3851 10.1089C19.3117 9.49752 18.1104 9.24028 16.9161 9.36607C15.7218 9.49186 14.319 9.89188 13.3614 10.7172C15.4022 12.4563 16.1258 16.7068 16.1258 16.7068L23.9584 16.7068Z"
            fill="white"
          />
        </svg>
      ),
      text: 'Друзья',
      path: 'friends',
    },
    {
      id: 4,
      img: (
        <svg
          className={`${s['nav-img']} ${s['groups']}`}
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="4.5" cy="7.5" r="3.5" fill="white" />
          <circle cx="12.5" cy="4.5" r="4.5" fill="white" />
          <circle cx="20.5" cy="7.5" r="3.5" fill="white" />
          <path
            d="M9.70156 9.5H12.5H15.6716C16.202 9.5 16.7107 9.71071 17.0858 10.0858L17.3284 10.3284C18.0786 11.0786 18.5 12.096 18.5 13.1569V20.5C18.5 21.0523 18.0523 21.5 17.5 21.5H7.5C6.94772 21.5 6.5 21.0523 6.5 20.5V13.4225C6.5 12.2074 7.05236 11.0581 8.00122 10.299L8.45217 9.93826C8.8068 9.65456 9.24742 9.5 9.70156 9.5Z"
            fill="white"
          />
          <path
            d="M3.44187 11.5H5.5V21.5H3C2.35089 21.5 1.71929 21.2895 1.2 20.9C0.444583 20.3334 0 19.4443 0 18.5V15.0523C0 14.3711 0.231843 13.7102 0.657394 13.1783L1.09927 12.6259C1.66858 11.9143 2.53052 11.5 3.44187 11.5Z"
            fill="white"
          />
          <path
            d="M22.0581 11.5H19.5V21.5H22.5C23.1491 21.5 23.7807 21.2895 24.3 20.9C25.0554 20.3334 25.5 19.4443 25.5 18.5V15.0523C25.5 14.3711 25.2682 13.7102 24.8426 13.1783L24.4007 12.6259C23.8314 11.9143 22.9695 11.5 22.0581 11.5Z"
            fill="white"
          />
        </svg>
      ),
      text: 'Сообщества',
      path: 'groups',
    },
    {
      id: 5,
      img: (
        <svg
          className={`${s['nav-img']} ${s['messages']}`}
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.6796 8.5C18.0149 7.7849 16.6796 7 16.6796 7C16.6796 7 17.07 9.48746 16.6796 11C16.3523 12.2683 15.1796 14 15.1796 14L13.1796 16C12.3986 16.781 12 16.7007 11.1796 17C10.4233 17.276 9.97746 17.3922 9.17963 17.5C8.21211 17.6307 6.67963 17.5 6.67963 17.5C6.67963 17.5 7.2268 18.4609 7.67963 19C8.4838 19.9574 9.03895 20.4881 10.1796 21C11.4393 21.5653 12.3062 21.6421 13.6796 21.5C14.908 21.3729 16.6796 20.5 16.6796 20.5C16.6796 20.5 17.7113 21.2547 18.6796 21.5C20.1796 22 20.353 21.4312 20.6796 21.5L20.1796 20V18L20.6796 16C20.6796 16 21.079 13.5102 20.6796 12C20.2771 10.4781 19.0708 8.92086 18.6796 8.5Z"
            fill="white"
          />
          <path
            d="M2.17965 16.4998C1.60389 16.6078 0.679626 16.4998 0.679626 16.4998L1.17963 14.9998C1.17963 14.9998 1.25905 13.9851 1.17965 13.3429C1.08814 12.6027 0.897191 12.2132 0.679647 11.4998C0.499528 10.9092 0.309026 10.6036 0.179647 9.99983C-0.0658316 8.85426 -0.0538582 8.14789 0.179647 6.99983C0.389224 5.9694 0.605236 5.38059 1.17965 4.49983C1.78304 3.57463 2.31029 3.18121 3.17965 2.49983C4.07576 1.79747 5 1.20638 5.67963 0.999796C6.21527 0.836983 7.8384 0.73659 9.17965 0.999825C10.6389 1.28622 11.516 1.57387 12.6796 2.49983C13.658 3.27834 14.0942 3.89508 14.6796 4.99983C15.4336 6.42257 15.7623 7.39178 15.6796 8.99983C15.594 10.6659 14.9589 11.7333 14.1796 12.9998C13.5245 14.0647 12.1796 14.9998 12.1796 14.9998C12.1796 14.9998 10.7831 15.7193 9.67963 15.9998C8.73342 16.2404 7.67963 16.4999 7.17963 16.4998C5.94468 16.4998 4.17965 15.4998 4.17965 15.4998C4.17965 15.4998 3.03793 16.3389 2.17965 16.4998Z"
            fill="white"
          />
          <circle cx="4" cy="9" r="1" fill="black" />
          <circle cx="8" cy="9" r="1" fill="black" />
          <circle cx="12" cy="9" r="1" fill="black" />
        </svg>
      ),
      text: 'Сообщения',
      path: 'messages',
    },
    {
      id: 6,
      img: (
        <svg
          className={`${s['nav-img']} ${s['circles']}`}
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="11.5" cy="10" rx="11.5" ry="10" fill="white" />
          <path
            d="M3.85089 22H2.5C2.64022 21.7196 2.87312 21.3827 3.11407 21.066C3.66346 20.3441 4.094 19.53 4.27192 18.6404L4.5 17.5L9 19.5C8.01356 20.4864 6.81099 21.2297 5.48754 21.6708L5.1158 21.7947C4.70793 21.9307 4.28082 22 3.85089 22Z"
            fill="white"
          />
          <rect x="7" y="7" width="7" height="6" rx="1" fill="black" />
          <path d="M14.5 8.5V11.5L17 13V7L14.5 8.5Z" fill="black" />
        </svg>
      ),
      text: 'Кружочки',
      path: 'circles',
    },
    {
      id: 7,
      img: (
        <svg
          className={`${s['nav-img']} ${s['voices']}`}
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="11.5" cy="10" rx="11.5" ry="10" fill="white" />
          <path
            className={s['micro-path']}
            d="M3.85089 22H2.5C2.64022 21.7196 2.87312 21.3827 3.11407 21.066C3.66346 20.3441 4.094 19.53 4.27192 18.6404L4.5 17.5L9 19.5C8.01356 20.4864 6.81099 21.2297 5.48754 21.6708L5.1158 21.7947C4.70793 21.9307 4.28082 22 3.85089 22Z"
            fill="white"
          />
          <rect x="9" y="3" width="5" height="9" rx="2.5" fill="black" />
          <path
            d="M16 8C16 9.5913 15.5259 11.1174 14.682 12.2426C13.8381 13.3679 12.6935 14 11.5 14C10.3065 14 9.16193 13.3679 8.31802 12.2426C7.47411 11.1174 7 9.5913 7 8L8 8V8.58421C8 9.1897 8.10544 9.79214 8.34613 10.3477C8.5458 10.8086 8.79676 11.3386 9 11.6096C9.71799 12.5669 10.4846 13 11.5 13C12.5154 13 13.282 12.5669 14 11.6096C14.3499 11.143 14.4413 10.7824 14.682 10.1869C14.9351 9.56043 15 8.69407 15 8H16Z"
            fill="black"
          />
          <path
            d="M11 15V13.5H12V15H14C14.2761 15 14.5 15.2239 14.5 15.5C14.5 15.7761 14.2761 16 14 16H9C8.72386 16 8.5 15.7761 8.5 15.5C8.5 15.2239 8.72386 15 9 15H11Z"
            fill="black"
          />
        </svg>
      ),
      text: 'Войсы',
      path: 'voices',
    },
    {
      id: 8,
      img: (
        <svg
          className={`${s['nav-img']} ${s['photos']}`}
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1216_5034" fill="white">
            <rect x="5" width="22" height="18" rx="2" />
          </mask>
          <rect
            x="5"
            width="22"
            height="18"
            rx="2"
            stroke="white"
            strokeWidth="5"
            mask="url(#path-1-inside-1_1216_5034)"
          />
          <path
            d="M10.0226 10.0569L7.5 13V15.5H24.5V10.5L21.6272 6.80643C21.2315 6.29761 20.623 6 19.9784 6C19.3584 6 18.7705 6.27536 18.3737 6.7516L14 12L12.4788 10.0985C12.1762 9.72022 11.718 9.5 11.2335 9.5C10.7679 9.5 10.3256 9.70344 10.0226 10.0569Z"
            fill="white"
          />
          <circle cx="11.5" cy="5.5" r="2.5" fill="white" />
          <path
            d="M0 17.5L3 8V15.0371C3 15.6732 3.12138 16.3034 3.35762 16.894L3.40579 17.0145C3.79129 17.9782 4.48189 18.7891 5.37196 19.3232C6.11009 19.7661 6.95471 20 7.81551 20H23.5L22.7993 22.8026C22.6093 23.5626 22.0968 24.2016 21.3961 24.552C20.8182 24.8409 20.1554 24.9116 19.5295 24.7512L1 20C0.359711 19.3597 0 18.4913 0 17.5858V17.5Z"
            fill="white"
          />
        </svg>
      ),
      text: 'Фотографии',
      path: 'photos',
    },
    {
      id: 9,
      img: (
        <svg
          className={`${s['nav-img']} ${s['videos']}`}
          width="33"
          height="25"
          viewBox="0 0 33 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="33" height="25" rx="4" fill="white" />
          <path
            d="M13 8.18317V16.8168C13 16.896 13.0875 16.9437 13.1541 16.901L19.8692 12.5841C19.9304 12.5448 19.9304 12.4552 19.8691 12.4159L13.1541 8.09905C13.0875 8.05627 13 8.10405 13 8.18317Z"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
      ),
      text: 'Видео',
      path: 'videos',
    },
    {
      id: 10,
      img: (
        <svg
          className={`${s['nav-img']} ${s['music']}`}
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 2.89504V21.1492C7 21.3763 7.07728 21.5966 7.21913 21.7739C7.80964 22.5121 9 22.0945 9 21.1492V8.89858C9 8.38753 9.38533 7.95871 9.89347 7.90427L21.8935 6.61856C22.4845 6.55523 23 7.01842 23 7.61287V19.5858C23 19.851 23.1054 20.1054 23.2929 20.2929C23.9229 20.9229 25 20.4767 25 19.5858V1.11726C25 0.521254 24.4819 0.0575628 23.8896 0.123381L7.88957 1.90116C7.38314 1.95743 7 2.38549 7 2.89504Z"
            fill="white"
          />
          <ellipse cx="4.5" cy="21.5" rx="4.5" ry="3.5" fill="white" />
          <ellipse cx="20.5" cy="19.5" rx="4.5" ry="3.5" fill="white" />
        </svg>
      ),
      text: 'Музыка',
      path: 'music',
    },
    {
      id: 11,
      img: (
        <svg
          className={`${s['nav-img']} ${s['apps']}`}
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="11" height="11" rx="2" fill="white" />
          <rect x="14" width="11" height="11" rx="2" fill="white" />
          <rect y="14" width="11" height="11" rx="2" fill="white" />
          <circle cx="19.5" cy="19.5" r="5.5" fill="white" />
        </svg>
      ),
      text: 'Приложения',
      path: 'apps',
    },
    {
      id: 12,
      img: (
        <svg
          className={`${s['nav-img']} ${s['games']}`}
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className={s['games-path']}
            d="M13.8443 10.5H11.2499C10.4349 10.5 9.63813 10.2588 8.96 9.80666L8.87706 9.75137C8.6268 9.58454 8.35542 9.45181 8.07009 9.3567C7.37548 9.12516 6.62452 9.12516 5.92991 9.3567C5.64458 9.45181 5.3732 9.58454 5.12294 9.75137L4.83205 9.9453C4.28279 10.3115 3.81147 10.7828 3.4453 11.3321L2 13.5L0.836232 15.8275C0.61333 16.2733 0.458339 16.75 0.376399 17.2416L0.0680304 19.0918C0.0227542 19.3635 0 19.6384 0 19.9138V22.5V23.3486C0 23.7733 0.125723 24.1886 0.361325 24.542C0.760334 25.1405 1.43206 25.5 2.15139 25.5H2.38783C2.79041 25.5 3.18746 25.4063 3.54754 25.2262L4.27427 24.8629C4.75495 24.6225 5.19373 24.3063 5.57374 23.9263L6.14991 23.3501C6.38273 23.1173 6.63799 22.908 6.91195 22.7254L8.24038 21.8397C9.06172 21.2922 10.0268 21 11.0139 21H14.1229C15.3331 21 16.5022 21.4389 17.4133 22.2353L17.7162 22.5L20.0691 24.6496C20.668 25.1966 21.4498 25.5 22.2609 25.5H22.8486C23.5679 25.5 24.2397 25.1405 24.6387 24.542C24.8743 24.1886 25 23.7733 25 23.3486V22V19.7003C25 19.2357 24.9353 18.7734 24.8076 18.3267L24.1277 15.9468C24.0427 15.6496 23.9304 15.3609 23.7922 15.0844L22.7369 12.9738C22.5794 12.6588 22.3891 12.3614 22.1691 12.0864L21.1222 10.7778C20.7144 10.268 20.1814 9.87255 19.5752 9.63009C18.5733 9.22931 17.4478 9.27612 16.4826 9.75872L16.0337 9.98316C15.3539 10.3231 14.6043 10.5 13.8443 10.5Z"
            fill="white"
          />
          <path
            className={s['games-path']}
            d="M13 11.5L13.0153 11.4694C13.915 9.67005 13.6487 7.50677 12.3395 5.97936L11.8809 5.44435C11.6293 5.15091 11.4371 4.81144 11.3149 4.44479L11.2927 4.37812C11.1027 3.80812 11.1027 3.19188 11.2927 2.62188V2.62188C11.429 2.21292 11.6587 1.8413 11.9635 1.53647L12.5 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M10 16H13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 16H7" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5.5 17.5V14.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16.75" cy="15.75" r="0.75" fill="black" />
          <circle cx="18.75" cy="17.75" r="0.75" fill="black" />
          <circle cx="20.75" cy="15.75" r="0.75" fill="black" />
          <circle cx="18.75" cy="13.75" r="0.75" fill="black" />
        </svg>
      ),
      text: 'Игры',
      path: 'games',
    },
  ];
  return width > 1150 ? (
    <aside className={s['sidebar']}>
      <nav className={s['nav']}>
        <ul className={s['nav-list']}>
          {links.map(({ id, img, text, path }) => (
            <li className={s['nav-item']} key={id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${s['active']} ${s['nav-link']}` : s['nav-link']
                }
                to={`/${path}`}>
                {img}
                <span className={s['text']}>{text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  ) : (
    <></>
  );
};

export default Sidebar;