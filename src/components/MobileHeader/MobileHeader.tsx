import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import { setIsHeaderShow, setTitle } from '../../redux/mobile/slice';
import s from './MobileHeader.module.scss';
import backSvg from '../../assets/img/icons/back.svg';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import { useAppDispatch } from './../../redux/store';
import Icon from '../UI/Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';

const MobileHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { mobile } = useSelector(selectMobile);
  const navigate = useNavigate();

  const [isSideContentActive, setIsSideContentActive] = useState(false);

  const arrowHandler = () => {
    dispatch(setIsHeaderShow(!mobile.isHeaderShow));
    setIsSideContentActive(!isSideContentActive);
  };

  useEffect(() => {
    dispatch(setTitle(document.title));
  }, [mobile]);

  return width <= 1150 ? (
    <header className={s['wrapper']}>
      <div className={s['wrapper-inner']}>
        {mobile.membersCount ? (
          <h2 className={s['title']}>
            Список участников - <span className={s['members']}>{mobile.membersCount}</span>
          </h2>
        ) : (
          <h2 className={s['title']}>{mobile.infoName ? `@${mobile.infoName}` : mobile.title}</h2>
        )}
        {mobile.hasArrowButton && (
          <button
            className={`${s['arrow']} ${isSideContentActive ? s['active'] : ''}`}
            onClick={arrowHandler}>
            <Icon src={arrowSvg} id={'arrow'} className={'white'} />
          </button>
        )}
        {mobile.backText && mobile.backButtonType === 'button' && (
          <button className={`${s['back-text']} ${s['margin-auto']}`} onClick={() => navigate(-1)}>
            <div className={s['arrow']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            {width >= 550 && (
              <span className={mobile.membersCount ? s['members-text'] : ''}>
                {mobile.backText}
              </span>
            )}
          </button>
        )}
        {mobile.backText && mobile.backButtonType === 'link' && (
          <Link className={`${s['back-text']} ${s['margin-auto']}`} to={'/groups/colloquy'}>
            <div className={s['arrow']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            {width >= 550 && (
              <span className={mobile.membersCount ? s['members-text'] : ''}>
                {mobile.backText}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
};

export default MobileHeader;
