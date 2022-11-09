import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsSidebarShow } from '../../redux/mobile/slice';
import s from './MobileFooter.module.scss';

const MobileFooter: React.FC = () => {
  const dispatch = useDispatch();
  const { mobile } = useSelector(selectMobile);
  const { width } = useWindowSize();

  return width <= 1150 ? (
    <div className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          to="/feed">
          <svg
            className={s['feed']}
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="20" rx="2" stroke="#FFF" strokeWidth="2" />
            <rect x="4" y="4" width="12" height="2" rx="1" fill="#FFF" />
            <rect x="4" y="8" width="12" height="2" rx="1" fill="#FFF" />
            <rect x="4" y="12" width="12" height="2" rx="1" fill="#FFF" />
          </svg>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          to="/messages">
          <svg
            className={s['messages']}
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
        </NavLink>
        <div className={s['link']}></div>
        <button className={s['button']} onClick={() => dispatch(setIsSidebarShow(true))}>
          <svg
            width="50"
            height="42"
            viewBox="0 0 50 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              x="17.6994"
              y="7.30054"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 17.6994 7.30054)"
              fill="white"
            />
            <rect
              x="26.5491"
              y="16.1501"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 26.5491 16.1501)"
              fill="white"
            />
            <rect
              x="35.3988"
              y="25"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 35.3988 25)"
              fill="white"
            />
            <rect
              y="25"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 0 25)"
              fill="white"
            />
            <rect
              x="8.84969"
              y="16.1501"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 8.84969 16.1501)"
              fill="white"
            />
            <rect
              x="17.6994"
              y="25"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 17.6994 25)"
              fill="white"
            />
            <rect
              x="8.84969"
              y="33.8499"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 8.84969 33.8499)"
              fill="white"
            />
            <rect
              x="26.5491"
              y="33.8499"
              width="10.3246"
              height="10.3246"
              transform="rotate(-45 26.5491 33.8499)"
              fill="white"
            />
          </svg>
        </button>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          to="/groups">
          <svg
            className={s['groups']}
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
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${s['active']} ${s['link']}` : s['link'])}
          to="/music">
          <svg
            className={s['music']}
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
        </NavLink>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MobileFooter;
