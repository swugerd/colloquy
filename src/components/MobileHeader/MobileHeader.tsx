import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setHasArrowButton, setIsHeaderShow, setTitle } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';
import { useAppDispatch } from './../../redux/store';

const MobileHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { mobile } = useSelector(selectMobile);
  useEffect(() => {
    dispatch(setTitle(document.title));
  }, []);
  return width <= 1150 ? (
    <header className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        <h2 className={s['title']}>{mobile.infoName ? `@${mobile.infoName}` : mobile.title}</h2>
        {mobile.hasArrowButton && (
          <button
            className={s['arrow']}
            onClick={() => {
              dispatch(setIsHeaderShow(!mobile.isHeaderShow));
            }}>
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L6.79289 6.79289C7.18342 7.18342 7.81658 7.18342 8.20711 6.79289L14 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
};

export default MobileHeader;
