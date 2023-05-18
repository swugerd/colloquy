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
  withoutForm?: boolean;
};

const Wall: React.FC<WallProps> = ({ className, page, placeholder, isAdmin, withoutForm }) => {
  // const posts: PostType[] = [
  //   {
  //     id: 1,
  //     user: { id: 1, name: 'Пашок Кубыркин', img },
  //     date: 'Вчера',
  //     content: {
  //       text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
  //       images: [
  //         { id: 1, img },
  //         { id: 2, img },
  //         { id: 3, img },
  //         { id: 4, img },
  //         { id: 5, img },
  //         { id: 6, img },
  //         { id: 7, img },
  //         { id: 8, img },
  //       ],
  //       videos: [
  //         { id: 1, video, time: 5002 },
  //         { id: 2, video, time: 5122 },
  //         { id: 3, video, time: 1502 },
  //         { id: 4, video, time: 1502 },
  //         { id: 5, video, time: 1502 },
  //         { id: 6, video, time: 1502 },
  //       ],
  //       circles: [
  //         { id: 1, circle, time: 123 },
  //         { id: 2, circle, time: 51 },
  //         { id: 3, circle, time: 12 },
  //         { id: 4, circle, time: 12 },
  //         { id: 5, circle, time: 12 },
  //       ],
  //       voices: [
  //         { id: 1, voice, time: 123 },
  //         { id: 2, voice, time: 51 },
  //         { id: 3, voice, time: 12 },
  //         { id: 4, voice, time: 12 },
  //         { id: 5, voice, time: 12 },
  //         { id: 6, voice, time: 12 },
  //       ],
  //       music: [
  //         {
  //           id: 1,
  //           track,
  //           time: 123,
  //           name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
  //           author: 'NaRk0PaShOk21rus',
  //         },
  //         { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       ],
  //     },
  //     likes: 2812,
  //     forwards: 12,
  //     comments: 4,
  //     views: 12,
  //   },
  //   {
  //     id: 2,
  //     user: { id: 2, name: 'Пашок Кубыркин', img },
  //     date: 'Вчера',
  //     forwardPost: {
  //       id: 1,
  //       user: { id: 1, name: 'Павлентий Кубышкин', img },
  //       date: '01.03.2023',
  //       content: {
  //         text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
  //         images: [
  //           { id: 1, img },
  //           { id: 2, img },
  //           { id: 3, img },
  //           { id: 4, img },
  //           { id: 5, img },
  //           { id: 6, img },
  //           { id: 7, img },
  //           { id: 8, img },
  //         ],
  //         videos: [
  //           { id: 1, video, time: 5002 },
  //           { id: 2, video, time: 5122 },
  //           { id: 3, video, time: 1502 },
  //           { id: 4, video, time: 1502 },
  //           { id: 5, video, time: 1502 },
  //           { id: 6, video, time: 1502 },
  //         ],
  //         music: [
  //           {
  //             id: 1,
  //             track,
  //             time: 123,
  //             name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
  //             author: 'NaRk0PaShOk21rus',
  //           },
  //           { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
  //           { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
  //           { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
  //           { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
  //           { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         ],
  //       },
  //     },
  //     content: {
  //       text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
  //       // music: [
  //       //   {
  //       //     id: 1,
  //       //     track,
  //       //     time: 123,
  //       //     name: 'трек',
  //       //     author: 'NaRk0PaShOk21rus',
  //       //   },
  //       //   { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       //   { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       //   { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       //   { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       //   { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       // ],
  //     },
  //     likes: 2812,
  //     forwards: 12,
  //     comments: 4,
  //     views: 12,
  //   },
  //   {
  //     id: 3,
  //     user: { id: 3, name: 'Пашок Кубыркин', img },
  //     date: 'Вчера',
  //     content: {
  //       images: [
  //         { id: 1, img },
  //         { id: 2, img },
  //         { id: 3, img },
  //         { id: 4, img },
  //         { id: 5, img },
  //         { id: 6, img },
  //         { id: 7, img },
  //         { id: 8, img },
  //       ],
  //     },
  //     likes: 2812,
  //     forwards: 12,
  //     comments: 4,
  //     views: 12,
  //   },
  //   {
  //     id: 4,
  //     user: { id: 4, name: 'Пашок Кубыркин', img },
  //     date: 'Вчера',
  //     content: {
  //       text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
  //       images: [
  //         { id: 1, img },
  //         { id: 2, img },
  //         { id: 3, img },
  //         { id: 4, img },
  //         { id: 5, img },
  //         { id: 6, img },
  //         { id: 7, img },
  //         { id: 8, img },
  //       ],
  //       videos: [
  //         { id: 1, video, time: 5002 },
  //         { id: 2, video, time: 5122 },
  //         { id: 3, video, time: 1502 },
  //         { id: 4, video, time: 1502 },
  //         { id: 5, video, time: 1502 },
  //         { id: 6, video, time: 1502 },
  //       ],
  //       music: [
  //         {
  //           id: 1,
  //           track,
  //           time: 123,
  //           name: 'трек',
  //           author: 'NaRk0PaShOk21rus',
  //         },
  //         { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
  //         { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
  //       ],
  //     },
  //     likes: 2812,
  //     forwards: 12,
  //     comments: 4,
  //     views: 12,
  //   },
  // ];
  const posts: any = [];
  const isPostAdmin = true;
  const isLoading = true;
  return (
    <div className={`${s['wall']} ${s[className]}`}>
      {!withoutForm && (
        <WallForm page={page} className={''} placeholder={placeholder} isAdmin={isAdmin} />
      )}

      {posts &&
        posts.map((post: any) => (
          <Post
            id={post.id}
            user={post.user}
            content={post.content}
            key={post.id}
            isForwardPost={false}
            isAdmin={isPostAdmin}
            postType={{
              feed: {
                date: post.date,
                likes: post.likes,
                forwards: post.forwards,
                comments: post.comments,
                views: post.views,
              },
            }}
            page={page}
          />
        ))}
    </div>
  );
};

export default Wall;
