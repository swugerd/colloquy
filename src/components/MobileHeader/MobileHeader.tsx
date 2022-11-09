import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsHeaderShow } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';

type MobileHeaderProps = {
  title: string;
  hasArrow: boolean;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ title, hasArrow }) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { mobile } = useSelector(selectMobile);
  return width <= 1150 ? (
    <header className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        <h2 className={s['title']}>{title}</h2>
        {hasArrow && (
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
