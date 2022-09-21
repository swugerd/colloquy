import React from 'react'
import PlaylistCard from '../../PlaylistCard/PlaylistCard'
import s from './PlaylistsDropDown.module.scss'
import ebalo from '../../../assets/uploads/test/image2.png'
import cat from '../../../assets/uploads/test/cat.png'

const PlaylistsDropDown: React.FC = () => {
    const playlists = [
        {
            id: 1, author: 'Олег Киреев', title: 'медведь)', count: 123, tracks: [
                { id: 1, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
                { id: 2, img: ebalo, title: 'Я пиздец круто да е чееене може тыбть', author: 'автор чайник деньги выбери', time: 200, file: '' },
                { id: 3, img: ebalo, title: 'Трекачок', author: 'Юрчик норм чел го в', time: 221, file: '' },
                { id: 4, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
                { id: 5, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
            ]
        },
        {
            id: 2, author: 'Максимильно Рабадонович', title: 'полный запивончик', count: 25, tracks: [
                { id: 6, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
                { id: 7, img: ebalo, title: 'Я пиздец круто да е чееене може тыбть', author: 'автор чайник деньги выбери', time: 200, file: '' },
                { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик норм чел го в', time: 221, file: '' },
                { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
                { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
            ]
        },
        {
            id: 3, author: 'Максимильно Рабадонович', title: 'полный запивончик', count: 25, tracks: [
                { id: 11, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
                { id: 12, img: ebalo, title: 'Я пиздец круто да е чееене може тыбть', author: 'автор чайник деньги выбери', time: 200, file: '' },
                { id: 8, img: ebalo, title: 'Трекачок', author: 'Юрчик норм чел го в', time: 221, file: '' },
                { id: 9, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 59, file: '' },
                { id: 10, img: ebalo, title: 'Трекачок', author: 'Юрчик', time: 100, file: '' },
            ]
        },
    ]
    return (
        <div className={s['playlists']}>
            {
                playlists.map(({ id, author, title, count }) => <PlaylistCard author={author} title={title} count={count} img={cat} key={id} />)
            }
            <div className={s['create']}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="13" y1="7" x2="1" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>

            </div>
        </div>
    )
}

export default PlaylistsDropDown