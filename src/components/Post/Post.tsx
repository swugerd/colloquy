import React, { useState } from 'react';
import s from './Post.module.scss';
import hideSvg from '../../assets/img/icons/hide.svg';
import playSvg from '../../assets/img/icons/play.svg';
import dotsSvg from '../../assets/img/icons/dots.svg';
import likeSvg from '../../assets/img/icons/like.svg';
import forwardSvg from '../../assets/img/icons/forward.svg';
import commentsSvg from '../../assets/img/icons/comment.svg';
import viewsSvg from '../../assets/img/icons/views.svg';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import formatTime from '../../utils/formatTime';
import classNames from 'classnames';
import useWindowSize from './../../hooks/useWindowResize';
import Icon from '../UI/Icon/Icon';
import { Link } from 'react-router-dom';

type PostProps = {
  id: number;
  user: {
    id: number;
    name: string;
    img: string;
  };
  date: string;
  content: {
    text?: string;
    images?: {
      id: number;
      img: string;
    }[];
    videos?: {
      id: number;
      video: string;
      time: number;
    }[];
    circles?: {
      id: number;
      circle: string;
      time: number;
    }[];
    voices?: {
      id: number;
      voice: string;
      time: number;
    }[];
    music?: {
      id: number;
      track: string;
      time: number;
      name: string;
      author: string;
    }[];
  };
  likes: number;
  forwards: number;
  comments: number;
  views: number;
};

const Post: React.FC<PostProps> = ({
  id,
  user,
  date,
  content,
  likes,
  forwards,
  comments,
  views,
}) => {
  const { name: userName, img: userImg } = user;
  const { text, images, videos, circles, voices, music } = content;
  const { width } = useWindowSize();
  const maxVisibleContent: {
    images: number;
    videos: number;
    voices: number;
    circles: number;
    circlesSolo: number;
    voicesSolo: number;
    music: number;
  } = {
    images: width <= 768 ? 2 : 6,
    videos: width <= 768 ? 1 : 3,
    voices: 2,
    circles: 2,
    circlesSolo: width <= 768 ? 2 : 3,
    voicesSolo: 2,
    music: 1,
  };

  const checkLastContent = (
    type: 'class' | 'element',
    contentType:
      | 'images'
      | 'videos'
      | 'circles'
      | 'circlesSolo'
      | 'voicesSolo'
      | 'voices'
      | 'music',
    content: any,
    index: number,
  ) => {
    if (type === 'class') {
      return index === maxVisibleContent[contentType] - 1 &&
        content.length > maxVisibleContent[contentType]
        ? s['last-media']
        : '';
    } else {
      return (
        index === maxVisibleContent[contentType] - 1 &&
        content.length > maxVisibleContent[contentType] && (
          <span className={s['more']}>+{content.length - maxVisibleContent[contentType]}</span>
        )
      );
    }
  };

  const wordDeclension = (value: number, words: string[]) => {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  const [activeAction, setactiveAction] = useState(false);

  return (
    <div className={s['post']}>
      <div className={s['top-row']}>
        <div className={s['user']}>
          <HeaderAvatar
            className="post"
            img={userImg}
            title={'image'}
            indicatorClass={['sm-indicator', 'border-elem']}
            onlineType="pc-dnd"
          />
          <div className={s['user-info']}>
            <span className={s['user-name']}>{userName}</span>
            <span className={s['post-date']}>{date}</span>
          </div>
        </div>
        <button className={s['hide']}>
          <Icon src={hideSvg} id={'hide'} className={'gray'} />
        </button>
      </div>
      <div className={s['content']}>
        {!!text && <p className={s['post-text']}>{text}</p>}
        {!!images?.length && (
          <div
            className={classNames({
              [s['post-images']]: true,
              [s['post-images-one']]: images.length === 1,
              [s['post-images-two']]: images.length === 2,
              [s['post-images-three']]: images.length === 3 && width > 768,
              [s['post-images-four']]: images.length === 4 && width > 768,
              [s['post-images-five']]: images.length === 5 && width > 768,
              [s['post-images-six']]: images.length >= maxVisibleContent.images && width > 768,
              [s['post-images-mobile']]: images.length > maxVisibleContent.images && width <= 768,
            })}>
            {images.map(({ id, img }, index) =>
              index > maxVisibleContent.images - 1 ? null : (
                <div
                  className={`${s['post-image']} ${s[`grid-area-${index}`]} ${checkLastContent(
                    'class',
                    'images',
                    images,
                    index,
                  )}`}
                  key={id}>
                  <img src={img} alt="post-img" />
                  {checkLastContent('element', 'images', images, index)}
                </div>
              ),
            )}
          </div>
        )}
        {!!videos?.length && (
          <div
            className={classNames({
              [s['post-videos']]: true,
              [s['post-videos-one']]: videos.length === 1,
              [s['post-videos-two']]: videos.length === 2 && width > 768,
              [s['post-videos-three']]: videos.length >= maxVisibleContent.videos && width > 768,
              [s['post-videos-mobile']]: videos.length > maxVisibleContent.videos && width <= 768,
            })}>
            {videos.map(({ id, video }, index) =>
              index > maxVisibleContent.videos - 1 ? null : (
                <div
                  className={`${s['post-video']} ${s[`grid-area-${index}`]} ${checkLastContent(
                    'class',
                    'videos',
                    videos,
                    index,
                  )}`}
                  key={id}>
                  <video controls>
                    <source src={video} type="video/mp4" />
                  </video>
                  {checkLastContent('element', 'videos', videos, index)}
                </div>
              ),
            )}
          </div>
        )}
        {!!circles?.length && voices?.length ? (
          <div className={s['media-wrapper']}>
            <div className={`${s['post-circles']} ${s['circles-separator']}`}>
              {circles.map(({ id, circle, time }, index) =>
                index > maxVisibleContent.circles - 1 ? null : (
                  <div
                    className={`${s['post-circle']} ${checkLastContent(
                      'class',
                      'circles',
                      circles,
                      index,
                    )} ${maxVisibleContent.circles - 1 === index ? s['last-circle'] : ''}`}
                    key={id}>
                    <video controls>
                      <source src={circle} type="video/mp4" />
                    </video>
                    {checkLastContent('element', 'circles', circles, index)}
                  </div>
                ),
              )}
            </div>
            <div className={s['post-voices']}>
              {voices.map(({ id, voice, time }, index) =>
                index > maxVisibleContent.voices - 1 ? null : (
                  <div
                    className={`${s['post-voice']} ${checkLastContent(
                      'class',
                      'voices',
                      voices,
                      index,
                    )} ${maxVisibleContent.voices - 1 === index ? s['last-voice'] : ''}`}
                    key={id}>
                    <img src={voice} alt="voice" />
                    {checkLastContent('element', 'voices', voices, index)}
                  </div>
                ),
              )}
            </div>
          </div>
        ) : !voices?.length && !circles?.length ? (
          ''
        ) : !circles?.length ? (
          <div className={`${s['post-only-media']} ${s['only-voices']}`}>
            {voices &&
              voices.map(({ id, voice, time }, index) =>
                index > maxVisibleContent.voicesSolo - 1 ? null : (
                  <div
                    className={`${s['post-voice']} ${checkLastContent(
                      'class',
                      'voicesSolo',
                      voices,
                      index,
                    )}`}
                    key={id}>
                    <img src={voice} alt="voice" />
                    {checkLastContent('element', 'voicesSolo', voices, index)}
                  </div>
                ),
              )}
          </div>
        ) : !voices?.length ? (
          <div className={s['post-only-media']}>
            {circles.map(({ id, circle, time }, index) =>
              index > maxVisibleContent.circlesSolo - 1 ? null : (
                <div
                  className={`${s['post-circle']} ${checkLastContent(
                    'class',
                    'circlesSolo',
                    circles,
                    index,
                  )}`}
                  key={id}>
                  <video>
                    <source src={circle} type="video/mp4" />
                  </video>
                  {checkLastContent('element', 'circlesSolo', circles, index)}
                </div>
              ),
            )}
          </div>
        ) : (
          ''
        )}
        {music?.length && (
          <div className={s['post-track']}>
            <div className={s['track-left']}>
              <button className={s['play-btn']}>
                <Icon src={playSvg} id={'play'} className={'white'} />
              </button>
              <div className={s['track-info']}>
                <span className={s['track-name']}>{music[0].name}</span>
                <span className={s['track-separator']}>&mdash;</span>
                <Link className={s['track-author']} to="/profile/swugerd">
                  {music[0].author}
                </Link>
                <span className={s['track-time']}>{formatTime(music[0].time)}</span>
              </div>
            </div>
            {music.length > 1 && (
              <button className={s['more-btn']}>
                <span className={s['more-text']}>
                  Ещё {music.length - 1}{' '}
                  {wordDeclension(music.length - 1, ['трек', 'трека', 'треков'])}
                </span>
                <Icon src={dotsSvg} id={'dots'} className={'only-gray'} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className={s['actions']}>
        <button
          className={`${s['actions-info']} ${s['likes']} ${activeAction ? s['active'] : ''}`}
          onClick={() => setactiveAction(!activeAction)}>
          <Icon
            src={likeSvg}
            id={'like'}
            className={'only-gray'}
            hoverClass={activeAction ? 'active' : ''}
          />
          <span>{activeAction ? likes + 1 : likes}</span>
        </button>
        <button className={`${s['actions-info']} ${s['forwards']}`}>
          <Icon src={forwardSvg} id={'forward'} className={'only-gray'} />
          <span>{forwards}</span>
        </button>
        <button className={`${s['actions-info']} ${s['comments']}`}>
          <Icon src={commentsSvg} id={'comments'} className={'only-gray'} />
          <span>{comments}</span>
        </button>
        <div className={`${s['actions-info']} ${s['views']} `}>
          <Icon src={viewsSvg} id={'views'} className={'only-gray'} />
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
