import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setHasArrowButton, setIsHeaderShow, setTitle } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';

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
            <Icon src={arrowSvg} id={'arrow'} className={''} />
          </button>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
};

export default MobileHeader;
