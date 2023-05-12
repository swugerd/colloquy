import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Wall from '../../components/Wall/Wall';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { useAppDispatch } from '../../redux/store';
import ebalo from '../../assets/uploads/test/ebalo.png';
import exitSvg from '../../assets/img/icons/exit.svg';
import lockSvg from '../../assets/img/icons/lock.svg';
import video from '../../assets/videos/video.mp4';
import settingsSvg from '../../assets/img/icons/settings.svg';
import s from './Group.module.scss';
import Icon from '../../components/UI/Icon/Icon';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import { setIsInfoName } from '../../redux/mobile/slice';
import useWindowSize from '../../hooks/useWindowResize';

const Group: React.FC = () => {
  const { name } = useParams();
  useSetPageTitle(name ? name : 'Сообщество');

  const { width } = useWindowSize();

  const isAdmin = true;
  const isClosed = false;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (name) {
      dispatch(setIsInfoName(name));
    }
    return () => {
      dispatch(setIsInfoName(''));
    };
  }, []);

  const dispatch = useAppDispatch();

  const members: { id: number; img: string; name: string; onlineType: string }[] = [
    { id: 1, img: ebalo, name: 'Рабадонович скамерулевичивоынар', onlineType: 'pc-online' },
    { id: 2, img: ebalo, name: 'Рабадонович скамерулевич', onlineType: 'pc-dnd' },
    { id: 3, img: ebalo, name: 'Рабадонович скамерулевич', onlineType: 'pc-afk' },
    { id: 4, img: ebalo, name: 'Рабадонович скамерулевич', onlineType: 'pc-offline' },
    { id: 5, img: ebalo, name: 'Паша', onlineType: 'pc-offline' },
    { id: 6, img: ebalo, name: 'Паша', onlineType: 'pc-offline' },
  ];

  const photos: { id: number; img: string }[] = [
    { id: 1, img: ebalo },
    { id: 2, img: ebalo },
    { id: 3, img: ebalo },
    { id: 4, img: ebalo },
    { id: 5, img: ebalo },
    { id: 6, img: ebalo },
  ];

  const videos: { id: number; video: string; name: string; author: string; views: number }[] = [
    {
      id: 1,
      video,
      name: 'трек трек трек трек трек вырфо',
      author: 'фредбер медведь вроыфрвыфло',
      views: 123,
    },
    { id: 2, video, name: 'трек', author: 'фредбер медведь вроыфрвыфло', views: 123 },
    { id: 3, video, name: 'трек', author: 'фредбефредбер медведь вроыфрвыфлоедь', views: 123 },
    { id: 4, video, name: 'трек', author: 'фредбер медведь', views: 123 },
    { id: 5, video, name: 'трек', author: 'фредбер медведь', views: 123 },
  ];

  return (
    <>
      {isClosed ? (
        <div className={s['closed']}>
          <div className={s['lock']}>
            <Icon src={lockSvg} id={'lock'} className={'green'} />
          </div>
          <p className={s['close-text']}>
            Это закрытое сообщество, чтобы просмотривать содержимое, нужно быть участником
          </p>
          <div className={s['close-request']}>Подать заявку</div>
        </div>
      ) : (
        <Wall
          className={'group'}
          page={'group'}
          placeholder={isAdmin ? 'Что произошло сегодня?' : 'Предложите новость сообществу'}
          isAdmin={isAdmin}
        />
      )}
      <div className={s['group']}>
        <div className={s['top']}>
          <div className={s['avatar']}>
            <img src={ebalo} alt="Аватар" />
          </div>
          <div className={s['group-info']}>
            <div className={s['group-top']}>
              <div className={s['row']}>
                <h6 className={s['group-title']}>ламповый антонимыантонимы антонимыантонимы</h6>
                <div className={s['buttons']}>
                  <button className={s['group-action']}>
                    <Icon src={exitSvg} id={'exit'} className={'white'} />
                  </button>
                  {isAdmin && (
                    <Link className={s['group-action']} to="/groups/colloquy/edit">
                      <Icon src={settingsSvg} id={'settings'} className={'white'} />
                    </Link>
                  )}
                </div>
              </div>
              <p className={s['group-status']}>нет блять омонимы</p>
            </div>
            {width > 550 && (
              <p className={s['group-about']}>
                я просто хочу сказать всем ребятам, что я очень крутой и в принципе я просто
                ламповый ламповый ламповый ламповый паря
              </p>
            )}
          </div>
          {width <= 550 && (
            <p className={s['group-about']}>
              я просто хочу сказать всем ребятам, что я очень крутой и в принципе я просто ламповый
              ламповый ламповый ламповый паря
            </p>
          )}
        </div>
        <div className={s['group-content']}>
          <ProfileContent
            contentType={'members'}
            data={members}
            className={'members-content'}
            pageType={'group'}
          />
          {isClosed ? (
            ''
          ) : (
            <>
              <ProfileContent
                contentType={'photos'}
                data={photos}
                className={'photos-content'}
                pageType={'group'}
              />
              <ProfileContent
                contentType={'videos'}
                data={videos}
                className={'videos-content'}
                pageType={'group'}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Group;
