import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import Input from '../UI/Input/Input'
import s from './MusicDropDown.module.scss'
import MyMusicDropDown from './MyMusicDropDown/MyMusicDropDown'
import PlaylistsDropDown from './PlaylistsDropDown/PlaylistsDropDown'
import RecsDropDown from './RecsDropDown/RecsDropDown'

const MusicDropDown: React.FC = () => {

    const links = [
        { id: 1, title: 'Моя музыка', path: '/music-dd' },
        { id: 2, title: 'Плейлисты', path: '/playlists-dd' },
        { id: 3, title: 'Рекомендации', path: '/recs-dd' },
    ]

    return (
        <div className={s['wrapper']}>
            <MusicPlayer />
            <Input className='music-dd-input' placeholder={'Искать музыку'} type='text' inputType='search' />
            <div className={s['nav']}>
                {links.map(({ id, title, path }) => <NavLink to={path} key={id} className={s['nav-link']}>{title}</NavLink>)}
            </div>
            <Routes>
                <Route path='/music-dd' element={<MyMusicDropDown />} />
                <Route path='/playlists-dd' element={<PlaylistsDropDown />} />
                <Route path='/recs-dd' element={<RecsDropDown />} />
            </Routes>
        </div>
    )
}

export default MusicDropDown