import React from 'react';
import MusicPlayer from '../../MusicPlayer/MusicPlayer';
import Input from '../../UI/Input/Input';
import MyMusicDropDown from '../MyMusicDropDown/MyMusicDropDown';
import PlaylistsDropDown from '../PlaylistsDropDown/PlaylistsDropDown';
import RecsDropDown from '../RecsDropDown/RecsDropDown';
import s from './MusicDropDown.module.scss';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../../redux/dropdowns/selector';
import { useAppDispatch } from './../../../redux/store';
import { setIsMusicComponentIndex } from '../../../redux/dropdowns/slice';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';

const MusicDropDown: React.FC = () => {
  const buttons = [
    { id: 1, title: 'Моя музыка' },
    { id: 2, title: 'Плейлисты' },
    { id: 3, title: 'Рекомендации' },
  ];

  const components = [
    <MyMusicDropDown className={'dropdown'} />,
    <PlaylistsDropDown className={'dropdown'} />,
    <RecsDropDown className={'dropdown'} />,
  ];

  const dispatch = useAppDispatch();
  const { dropdowns } = useSelector(selectDropdowns);

  return (
    <div className={s['wrapper']}>
      {/* <MusicPlayer className={'dropdown'} />
      <Input
        className="music-dd-input"
        placeholder={'Искать музыку'}
        type="text"
        inputType="search"
        name={''}
        value={''}
        setValue={() => {}}
      />
      <div className={s['nav']}>
        {buttons.map(({ id, title }, index) => (
          <button
            key={id}
            className={`${s['nav-link']} ${
              dropdowns.musicComponentIndex === index ? s['active'] : ''
            }`}
            onClick={() => dispatch(setIsMusicComponentIndex(index))}>
            {title}
          </button>
        ))}
      </div>
      {components[dropdowns.musicComponentIndex]} */}
      <NotFoundBlock className={'dropdowns'} text={'В разработке'} />
    </div>
  );
};

export default MusicDropDown;
