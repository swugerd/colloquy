import React, { useRef, useState } from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Feed.module.scss';
import img from '../../assets/uploads/cool.jpg';
import video from '../../assets/videos/video.mp4';
import circle from '../../assets/videos/video.mp4';
import voice from '../../assets/uploads/test/voice.png';
import track from '../../assets/uploads/test/ebalo.png';
import Post from '../../components/Post/Post';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Story from '../../components/Story/Story';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { optionCSS } from 'react-select/dist/declarations/src/components/Option';
import RadioButton from '../../components/UI/RadioButton/RadioButton';
import { useSelector } from 'react-redux';
import { selectMobile } from '../../redux/mobile/selector';

const Feed: React.FC = () => {
  useSetPageTitle('Новости');
  const width = window.innerWidth;
  const { mobile } = useSelector(selectMobile);
  const posts = [
    {
      id: 1,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        images: [
          { id: 1, img },
          { id: 2, img },
          // { id: 3, img },
          // { id: 4, img },
          // { id: 5, img },
          // { id: 6, img },
          // { id: 7, img },
          // { id: 8, img },
        ],
        videos: [
          { id: 1, video, time: 5002 },
          { id: 2, video, time: 5122 },
          { id: 3, video, time: 1502 },
          { id: 4, video, time: 1502 },
          { id: 5, video, time: 1502 },
          { id: 6, video, time: 1502 },
        ],
        circles: [
          // { id: 1, circle, time: 123 },
          // { id: 2, circle, time: 51 },
          // { id: 3, circle, time: 12 },
          // { id: 4, circle, time: 12 },
          // { id: 5, circle, time: 12 },
        ],
        voices: [
          // { id: 1, voice, time: 123 },
          // { id: 2, voice, time: 51 },
          // { id: 3, voice, time: 12 },
          // { id: 4, voice, time: 12 },
          // { id: 5, voice, time: 12 },
          // { id: 6, voice, time: 12 },
        ],
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
            author: 'NaRk0PaShOk21rus',
          },
          { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 2,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек',
            author: 'NaRk0PaShOk21rus',
          },
          { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 3,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        images: [
          { id: 1, img },
          { id: 2, img },
          { id: 3, img },
          { id: 4, img },
          { id: 5, img },
          { id: 6, img },
          { id: 7, img },
          { id: 8, img },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 4,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        images: [
          // { id: 1, img },
          // { id: 2, img },
          // { id: 3, img },
          // { id: 4, img },
          // { id: 5, img },
          // { id: 6, img },
          // { id: 7, img },
          // { id: 8, img },
        ],
        videos: [
          { id: 1, video, time: 5002 },
          { id: 2, video, time: 5122 },
          { id: 3, video, time: 1502 },
          { id: 4, video, time: 1502 },
          { id: 5, video, time: 1502 },
          { id: 6, video, time: 1502 },
        ],
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек',
            author: 'NaRk0PaShOk21rus',
          },
          { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
  ];

  const stories = [
    { id: 1, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
    { id: 2, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
    { id: 3, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
    { id: 4, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
    { id: 5, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
    { id: 6, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
    { id: 7, story: video, user: { id: 1, name: 'Пашок Кубыркин', img } },
    { id: 8, story: video, user: { id: 2, name: 'Пашок Кубыркин', img } },
    { id: 9, story: video, user: { id: 3, name: 'Пашок Кубыркин', img } },
  ];

  const settings = {
    type: [
      {
        id: 1,
        name: 'Все записи',
        img: (
          <svg
            className={s['all']}
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_1409_4967" fill="white">
              <rect width="9" height="9" rx="1" />
            </mask>
            <rect
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-1-inside-1_1409_4967)"
            />
            <mask id="path-2-inside-2_1409_4967" fill="white">
              <rect x="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              x="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-2-inside-2_1409_4967)"
            />
            <mask id="path-3-inside-3_1409_4967" fill="white">
              <rect x="10" y="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              x="10"
              y="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-3-inside-3_1409_4967)"
            />
            <mask id="path-4-inside-4_1409_4967" fill="white">
              <rect y="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              y="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-4-inside-4_1409_4967)"
            />
          </svg>
        ),
      },
      {
        id: 2,
        name: 'Записи друзей',
        img: (
          <svg
            className={s['friends']}
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
      },
      {
        id: 3,
        name: 'Записи сообществ',
        img: (
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
        ),
      },
    ],
    content: [
      {
        id: 1,
        name: 'Все медиа',
        img: (
          <svg
            className={s['all']}
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_1409_4967" fill="white">
              <rect width="9" height="9" rx="1" />
            </mask>
            <rect
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-1-inside-1_1409_4967)"
            />
            <mask id="path-2-inside-2_1409_4967" fill="white">
              <rect x="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              x="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-2-inside-2_1409_4967)"
            />
            <mask id="path-3-inside-3_1409_4967" fill="white">
              <rect x="10" y="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              x="10"
              y="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-3-inside-3_1409_4967)"
            />
            <mask id="path-4-inside-4_1409_4967" fill="white">
              <rect y="10" width="9" height="9" rx="1" />
            </mask>
            <rect
              y="10"
              width="9"
              height="9"
              rx="1"
              stroke="white"
              strokeWidth="2.6"
              mask="url(#path-4-inside-4_1409_4967)"
            />
          </svg>
        ),
      },
      {
        id: 2,
        name: 'Кружочки',
        img: (
          <svg
            className={s['circles']}
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
      },
      {
        id: 3,
        name: 'Войсы',
        img: (
          <svg
            className={s['voices']}
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
      },
      {
        id: 4,
        name: 'Фотографии',
        img: (
          <svg
            className={s['photos']}
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
      },
      {
        id: 5,
        name: 'Видео',
        img: (
          <svg
            className={s['videos']}
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
      },
      {
        id: 6,
        name: 'Музыка',
        img: (
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
        ),
      },
      {
        id: 7,
        name: 'Шаблоны',
        img: (
          <svg
            className={s['patterns']}
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 18L9 20.5V25.5L5.5 23.5V18Z" fill="white" />
            <path d="M5.5 11L9 13.5V18.5L5.5 16.5V11Z" fill="white" />
            <path d="M0 7.5L4 10V15.5L0 13V7.5Z" fill="white" />
            <path d="M0 14.5L4 17V22.5L0 20V14.5Z" fill="white" />
            <path d="M16 4L19.5 6.5V11.5L16 9V4Z" fill="white" />
            <path d="M25 4L21 6.5V12L25 9V4Z" fill="white" />
            <path d="M19.5 14.5L16 17V22L19.5 20V14.5Z" fill="white" />
            <path d="M19 13L16 11V15L19 13Z" fill="white" />
            <path d="M14.3835 8.10854L14.3835 3.96189L11 5.99999L14.3835 8.10854Z" fill="white" />
            <path d="M14.5 18L10.5 20.5V25.5L14.5 23.5V18Z" fill="white" />
            <path d="M14.5 11L10.5 13.5V18.5L14.5 16.5V11Z" fill="white" />
            <path d="M10 7L6 9.5L10 12L14 9.5L10 7Z" fill="white" />
            <path d="M4.5 3.5L0.5 6L4.5 8.5L8.5 6L4.5 3.5Z" fill="white" />
            <path d="M10 0L6 2.5L10 5L14 2.5L10 0Z" fill="white" />
            <path d="M20.5 0L16.5 2.5L20.5 5L24.5 2.5L20.5 0Z" fill="white" />
          </svg>
        ),
      },
    ],
  };

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const [typeIndex, setTypeIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  return (
    <>
      <div className={s['feed']}>
        {/* <div className={s['hidden']}>
          <div className={s['img']}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.02051 22.4286L22.4491 1"
                stroke="#9B9B9B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17.8571 4.57143L17.4952 4.39044C16.384 3.83487 15.1865 3.4723 13.9538 3.31821C12.4895 3.13517 10.9914 3.25318 9.57248 3.65859C8.64218 3.92439 7.74306 4.31335 6.91341 4.81114L5.61224 5.59184L4.79649 6.24444C3.6432 7.16708 2.59565 8.21462 1.67301 9.36792L1.02041 10.1837L0.28301 11.2898C0.0984733 11.5666 0 11.8918 0 12.2245C0 12.5572 0.0984736 12.8824 0.283011 13.1592L1.53787 15.0415C1.87235 15.5432 2.25557 16.0107 2.68195 16.4371L4.08163 17.8367L7.14286 14.7755C6.80733 14.1045 6.63265 13.3645 6.63265 12.6143V12.4138C6.63265 11.9492 6.68963 11.4864 6.8023 11.0357L6.82588 10.9414C7.03509 10.1045 7.40946 9.31799 7.92701 8.62794L8.21429 8.2449C8.51886 7.8388 8.87961 7.47805 9.28571 7.17347C10.213 6.47799 11.3409 6.10204 12.5 6.10204H12.7732C13.4371 6.10204 14.0966 6.20907 14.7264 6.41901L15.3061 6.61225C15.6328 6.61225 15.9461 6.48247 16.1771 6.25148L17.8571 4.57143Z"
                fill="#9B9B9B"
              />
              <path
                d="M7.14286 19.3673L7.50484 19.5483C8.61597 20.1039 9.81348 20.4665 11.0462 20.6206C12.5105 20.8036 14.0086 20.6856 15.4275 20.2802C16.3578 20.0144 17.2569 19.6254 18.0866 19.1276L19.3878 18.3469L20.2035 17.6943C21.3568 16.7717 22.4044 15.7241 23.327 14.5709L23.9796 13.7551L24.717 12.649C24.9015 12.3722 25 12.047 25 11.7143C25 11.3816 24.9015 11.0564 24.717 10.7796L23.4621 8.89727C23.1276 8.39555 22.7444 7.9281 22.3181 7.50172L20.9184 6.10204L17.8571 9.16326C18.1927 9.83431 18.3673 10.5743 18.3673 11.3245V11.525C18.3673 11.9896 18.3104 12.4524 18.1977 12.9031L18.1741 12.9974C17.9649 13.8342 17.5905 14.6208 17.073 15.3108L16.7857 15.6939C16.4811 16.1 16.1204 16.4607 15.7143 16.7653C14.787 17.4608 13.6591 17.8367 12.5 17.8367H12.2268C11.5629 17.8367 10.9034 17.7297 10.2736 17.5198L9.69388 17.3265C9.3672 17.3265 9.0539 17.4563 8.8229 17.6873L7.14286 19.3673Z"
                fill="#9B9B9B"
              />
              <path
                d="M14.2379 7.95202C13.7395 7.47783 12.9984 7.29675 12.1674 7.44609C11.3365 7.59544 10.479 8.06383 9.77179 8.75471C9.06458 9.4456 8.56154 10.3063 8.36637 11.1594C8.17119 12.0125 8.29877 12.7929 8.72279 13.3398L11.5753 10.751L14.2379 7.95202Z"
                fill="#9B9B9B"
              />
              <path
                d="M11.2244 15.9213C11.79 16.4247 12.5857 16.6263 13.4473 16.4844C14.309 16.3426 15.1709 15.8681 15.8555 15.1588C16.5401 14.4496 16.9951 13.5596 17.1268 12.6724C17.2585 11.7852 17.0567 10.9683 16.5632 10.3903L14.0852 12.9281L11.2244 15.9213Z"
                fill="#9B9B9B"
              />
            </svg>
          </div>
          <div className={s['text']}>
            Вы больше не будете видедеть в ленте записи от <span>{posts[0].user.name}</span>
          </div>
          <button className={s['return']}>Я передумал</button>
        </div> */}
        {posts.map(({ id, user, date, content, likes, forwards, comments, views }) => (
          <Post
            id={id}
            user={user}
            date={date}
            content={content}
            likes={likes}
            forwards={forwards}
            comments={comments}
            views={views}
            key={id}
          />
        ))}
      </div>
      <div className={s['side-content']}>
        <div className={s['stories']}>
          <h2 className={s['title']}>Истории</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              500: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 5,
              },
              1150: {
                slidesPerView: 2,
              },
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined

                // сделать что-то с типизацией

                // @ts-ignore
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = navigationNextRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            modules={[Navigation]}>
            {stories.map(({ id, story, user }) => (
              <SwiperSlide key={id}>
                <Story id={id} story={story} user={user} />
              </SwiperSlide>
            ))}
            <button className={s['prev-button']} ref={navigationPrevRef}>
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
            <button className={s['next-button']} ref={navigationNextRef}>
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
          </Swiper>
        </div>
        <div className={`${s['options']} ${mobile.isHeaderShow ? s['active'] : ''}`}>
          <h2 className={s['title']}>Что будем показывать?</h2>
          <div className={s['group']}>
            {settings.type.map(({ id, name, img }, index) => (
              <div
                className={`${s['option']} ${typeIndex === index ? s['active'] : ''}`}
                onClick={() => setTypeIndex(index)}
                key={id}>
                <div className={s['option-icon']}>{img}</div>
                <span className={s['option-name']}>{name}</span>
                <RadioButton
                  checked={typeIndex === index}
                  onChange={() => setTypeIndex(index)}
                  className="relative"
                  name={'type'}
                />
              </div>
            ))}
          </div>
          <h2 className={s['title']}>Настройки контента</h2>
          <div className={s['group']}>
            {settings.content.map(({ id, name, img }, index) => (
              <div
                className={`${s['option']} ${contentIndex === index ? s['active'] : ''}`}
                onClick={() => setContentIndex(index)}
                key={id}>
                <div className={s['option-icon']}>{img}</div>
                <span className={s['option-name']}>{name}</span>
                <RadioButton
                  checked={contentIndex === index}
                  onChange={() => setContentIndex(index)}
                  className="relative"
                  name={'content'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
