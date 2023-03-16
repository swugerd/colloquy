import React, { useRef, useState } from 'react';
import s from './Wall.module.scss';
import paperclipSvg from '../../assets/img/icons/paperclip.svg';
import smileSvg from '../../assets/img/icons/smile.svg';
import commentsSvg from '../../assets/img/icons/comment.svg';
import microSvg from '../../assets/img/icons/voices.svg';
import sendSvg from '../../assets/img/icons/send.svg';
import Post from '../Post/Post';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import circle from '../../assets/videos/video.mp4';
import voice from '../../assets/uploads/test/voice.png';
import track from '../../assets/uploads/test/ebalo.png';
import Icon from '../UI/Icon/Icon';
import WallForm from '../UI/WallForm/WallForm';
import { Post as PostType } from '../../types';
import Preloader from '../Preloader/Preloader';

type WallProps = {
  className: string;
  page: 'feed' | 'profile' | 'group';
  placeholder: string;
  isAdmin: boolean;
};

const Wall: React.FC<WallProps> = ({ className, page, placeholder, isAdmin }) => {
  const posts: PostType[] = [
    {
      id: 1,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
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
        videos: [
          { id: 1, video, time: 5002 },
          { id: 2, video, time: 5122 },
          { id: 3, video, time: 1502 },
          { id: 4, video, time: 1502 },
          { id: 5, video, time: 1502 },
          { id: 6, video, time: 1502 },
        ],
        circles: [
          { id: 1, circle, time: 123 },
          { id: 2, circle, time: 51 },
          { id: 3, circle, time: 12 },
          { id: 4, circle, time: 12 },
          { id: 5, circle, time: 12 },
        ],
        voices: [
          { id: 1, voice, time: 123 },
          { id: 2, voice, time: 51 },
          { id: 3, voice, time: 12 },
          { id: 4, voice, time: 12 },
          { id: 5, voice, time: 12 },
          { id: 6, voice, time: 12 },
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
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      forwardPost: {
        id: 1,
        user: { id: 1, name: 'Павлентий Кубышкин', img },
        date: '01.03.2023',
        content: {
          text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
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
      },
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        // music: [
        //   {
        //     id: 1,
        //     track,
        //     time: 123,
        //     name: 'трек',
        //     author: 'NaRk0PaShOk21rus',
        //   },
        //   { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        // ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 3,
      user: { id: 3, name: 'Пашок Кубыркин', img },
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
      user: { id: 4, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
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
  const isPostAdmin = true;
  const isLoading = true;
  return (
    <div className={`${s['wall']} ${s[className]}`}>
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

      <WallForm page={page} className={''} placeholder={placeholder} isAdmin={isAdmin} />

      {posts.map(({ id, user, date, content, likes, forwards, comments, views, forwardPost }) => (
        <Post
          id={id}
          user={user}
          content={content}
          key={id}
          isForwardPost={false}
          isAdmin={isPostAdmin}
          postType={{
            feed: {
              date: date,
              likes: likes,
              forwards: forwards,
              comments: comments,
              views: views,
              forwardPost:
                forwardPost && Object.entries(forwardPost).length
                  ? {
                      id: forwardPost.id,
                      user: {
                        id: forwardPost.user.id,
                        name: forwardPost.user.name,
                        img: forwardPost.user.img,
                      },
                      date: forwardPost.date,
                      content: forwardPost.content,
                    }
                  : undefined,
            },
          }}
          page={page}
        />
      ))}
    </div>
  );
};

export default Wall;
