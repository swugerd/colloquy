import React, { useState } from 'react';
import s from './Post.module.scss';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import formatTime from '../../utils/formatTime';
import classNames from 'classnames';

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
  const maxVisibleContent: {
    images: number;
    videos: number;
    voices: number;
    circles: number;
    circlesSolo: number;
    voicesSolo: number;
    music: number;
  } = {
    images: 6,
    videos: 3,
    voices: 2,
    circles: 2,
    circlesSolo: 3,
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
              [s['post-images-three']]: images.length === 3,
              [s['post-images-four']]: images.length === 4,
              [s['post-images-five']]: images.length === 5,
              [s['post-images-six']]: images.length >= maxVisibleContent.images,
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
              [s['post-videos-two']]: videos.length === 2,
              [s['post-videos-three']]: videos.length >= maxVisibleContent.videos,
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
          <div className={s['post-only-media']}>
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
            <button className={s['play-btn']}>
              <svg
                width="21"
                height="29"
                viewBox="0 0 21 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.5 25.1356V3.86437C0.5 2.24185 2.33029 1.29459 3.65493 2.23154L18.6915 12.8672C19.8183 13.6641 19.8183 15.3359 18.6915 16.1328L3.65493 26.7685C2.33028 27.7054 0.5 26.7581 0.5 25.1356Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className={s['track-info']}>
              <span className={s['track-name']}>{music[0].name}</span>
              <span className={s['track-separator']}>&mdash;</span>
              <span className={s['track-author']}>{music[0].author}</span>
              <span className={s['track-time']}>{formatTime(music[0].time)}</span>
            </div>
            {music.length > 1 && (
              <button className={s['more-btn']}>
                <span className={s['more-text']}>
                  Ещё {music.length - 1}{' '}
                  {wordDeclension(music.length - 1, ['трек', 'трека', 'треков'])}
                </span>
                <svg
                  width="34"
                  height="8"
                  viewBox="0 0 34 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" r="4" fill="white" />
                  <circle cx="17" cy="4" r="4" fill="white" />
                  <circle cx="30" cy="4" r="4" fill="white" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      <div className={s['actions']}>
        <button
          className={`${s['actions-info']} ${s['likes']} ${activeAction ? s['active'] : ''}`}
          onClick={() => setactiveAction(!activeAction)}>
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 0H5.64151C6.52731 0 7.3933 0.2622 8.13034 0.753557C8.37618 0.917452 8.60523 1.10523 8.81415 1.31415L10 2.5L11 10L10 17.5L6 14.5L3.10708 12.0204C2.70325 11.6742 2.33277 11.291 2.00051 10.8756L1.89643 10.7455C0.983327 9.60416 0.404034 8.23227 0.222736 6.78189L0.156104 6.24883C0.0533398 5.42672 0.13599 4.59203 0.397988 3.80604C0.788165 2.6355 1.55737 1.62842 2.584 0.944001L2.75192 0.83205C3.56573 0.289512 4.52192 0 5.5 0Z"
              fill="#9B9B9B"
            />
            <path
              d="M14.5 0H14.3585C13.4727 0 12.6067 0.2622 11.8697 0.753557C11.6238 0.917452 11.3948 1.10523 11.1858 1.31415L10 2.5L8.5 10L10 17.5L14 14.5L16.8929 12.0204C17.2968 11.6742 17.6672 11.291 17.9995 10.8756L18.1036 10.7455C19.0167 9.60416 19.596 8.23227 19.7773 6.78189L19.8439 6.24883C19.9467 5.42672 19.864 4.59203 19.602 3.80604C19.2118 2.6355 18.4426 1.62842 17.416 0.944001L17.2481 0.83205C16.4343 0.289512 15.4781 0 14.5 0Z"
              fill="#9B9B9B"
            />
          </svg>
          <span>{activeAction ? likes + 1 : likes}</span>
        </button>
        <button className={`${s['actions-info']} ${s['forwards']}`}>
          <svg
            width="38"
            height="30"
            viewBox="0 0 38 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.9986 8C19.5398 7.67914 21.9986 7.5 21.9986 7.5V1C21.9986 0.400341 22.4986 0 22.9986 0C23.4986 0 23.9986 0.5 23.9986 0.5L30.4986 7L36.9986 13L37.5 13.5L36.9986 14L35.4986 15.5L23.4986 27H22.4986L21.9986 26V19.5H18.9986C18.9986 19.5 16.8398 19.6717 15.4986 20C13.8782 20.3967 13.0167 20.8081 11.4986 21.5C10.704 21.8621 10.2429 22.0433 9.49864 22.5C9.12567 22.7289 7.92084 23.6557 6.99864 24.5C6.38761 25.0594 6.04506 25.3773 5.49864 26C4.85468 26.7338 3.99864 28 3.99864 28C3.60812 28.5858 3.29605 29.0556 2.99978 29.5C2.7035 29.9444 2.99864 30 1.99864 30C1.7225 30 1.49978 30 0.998641 29.5C0.860414 29.3621 0.999777 28 0.999777 28C0.999777 28 0.99933 27.5 0.999777 26.5C1 26 1.49864 24 1.49864 24C1.49864 24 2.02844 22.1419 2.49864 21C2.99737 19.7888 3.34374 19.1344 3.99864 18C4.70264 16.7806 5.09299 16.0782 5.99864 15C6.70909 14.1542 7.16103 13.7201 7.99864 13C8.73899 12.3636 9.19911 12.0603 9.99864 11.5C10.5752 11.096 10.8964 10.8647 11.4986 10.5C12.619 9.82145 13.2797 9.47949 14.4986 9C15.8215 8.47964 16.607 8.28974 17.9986 8Z"
              fill="white"
            />
          </svg>
          <span>{forwards}</span>
        </button>
        <button className={`${s['actions-info']} ${s['comments']}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 6.5H15.5" stroke="#9B9B9B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 10H14" stroke="#9B9B9B" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M9.95086 15.5313L4.65369 18.9022C4.58712 18.9446 4.5 18.8967 4.5 18.8178V16C4.5 15.7239 4.27614 15.5 4 15.5C2.34315 15.5 1 14.1569 1 12.5V4C1 2.34315 2.34315 1 4 1H16C17.6569 1 19 2.34315 19 4V12.5C19 14.1569 17.6569 15.5 16 15.5H10.0582C10.0202 15.5 9.98295 15.5108 9.95086 15.5313Z"
              stroke="#9B9B9B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>{comments}</span>
        </button>
        <div className={`${s['actions-info']} ${s['views']} `}>
          <svg
            width="26"
            height="15"
            viewBox="0 0 26 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="7.5" r="2.5" fill="#9B9B9B" />
            <path
              d="M9.5 0.5C10.8506 0.213388 13 0 13 0V1V2L12 2.25L11 2.5L10.5765 2.64117C9.86856 2.87715 9.2253 3.27471 8.69764 3.80236C8.23734 4.26266 7.87534 4.81165 7.63358 5.41605L7.52651 5.68371C7.18212 6.5447 7.08062 7.4837 7.23307 8.39839C7.40667 9.44004 7.90344 10.4034 8.65015 11.1502C9.20805 11.7081 9.88968 12.1299 10.6382 12.3794L11 12.5L12.5 12.8453V15C11.835 15 11.1715 14.9343 10.5194 14.8039L10.2028 14.7406C9.40261 14.5805 8.61878 14.3475 7.86112 14.0444L7.56725 13.9269C6.85689 13.6428 6.1704 13.3022 5.51434 12.9086C4.50858 12.3051 3.58062 11.5806 2.75124 10.7512L2.415 10.415C1.80577 9.80577 1.24055 9.15406 0.723593 8.46479L0.284718 7.87962C0.114099 7.65213 0.105484 7.34177 0.263222 7.10517C0.753209 6.37019 1.3146 5.6854 1.93921 5.06079L3.5 3.5C5.15368 2.17706 7.01319 1.09715 9.07125 0.597968C9.21933 0.562051 9.36315 0.529041 9.5 0.5Z"
              fill="#9B9B9B"
            />
            <path
              d="M13 0V2L14.5 2.5L14.9235 2.64117C15.6314 2.87715 16.2747 3.27471 16.8024 3.80236C17.2627 4.26266 17.6247 4.81165 17.8664 5.41605L17.9735 5.68371C18.3179 6.5447 18.4194 7.4837 18.2669 8.39839C18.0933 9.44004 17.5966 10.4034 16.8498 11.1502C16.2919 11.7081 15.6103 12.1299 14.8618 12.3794L14.5 12.5L12.5 12.8453V15H12.6771C13.5569 15 14.4345 14.9131 15.2972 14.7406C16.0974 14.5805 16.8812 14.3475 17.6389 14.0444L17.9327 13.9269C18.6431 13.6428 19.3296 13.3022 19.9857 12.9086C20.9914 12.3051 21.9194 11.5806 22.7488 10.7512L23.085 10.415C23.6942 9.80577 24.2595 9.15406 24.7764 8.46479L25.2153 7.87962C25.3859 7.65213 25.3945 7.34177 25.2368 7.10517C24.7468 6.37019 24.1854 5.6854 23.5608 5.06079L22 3.5C20.3498 2.17985 18.4536 1.20102 16.4216 0.620463L16 0.5L13 0Z"
              fill="#9B9B9B"
            />
          </svg>
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
