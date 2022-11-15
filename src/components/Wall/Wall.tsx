import React, { useState } from 'react';
import s from './Wall.module.scss';
import Post from '../Post/Post';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import circle from '../../assets/videos/video.mp4';
import voice from '../../assets/uploads/test/voice.png';
import track from '../../assets/uploads/test/ebalo.png';

type WallProps = {
  className: string;
  page: 'feed' | 'profile';
};

const Wall: React.FC<WallProps> = ({ className, page }) => {
  const posts = [
    {
      id: 1,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуцтсфиыиыdasdsadsaфывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
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
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
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
  const [isActive, setIsActive] = useState(true);
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
      {page === 'profile' && (
        <form className={s['post-form']}>
          <div className={s['relative']}>
            <textarea className={s['input']} placeholder="Что произошло сегодня?"></textarea>
            <button className={`${s['controls-icon']} ${s['paperclip']}`}>
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 10.5L9.77976 2.55641C10.8869 1.55468 12.3268 1 13.8198 1V1C15.2285 1 16.5927 1.49388 17.6749 2.39571L17.7333 2.44446C18.5635 3.13625 19.1995 4.03202 19.5789 5.04383L19.6087 5.12308C20.1821 6.65231 20.1638 8.34058 19.5572 9.85698L19.223 10.6924C18.7467 11.8833 18.0178 12.9568 17.0867 13.8389L10.3313 20.2388C9.47644 21.0486 8.34371 21.5 7.16619 21.5V21.5C6.08959 21.5 5.04706 21.1226 4.22 20.4333L4.1033 20.3361C3.08739 19.4895 2.5 18.2354 2.5 16.913V16.913C2.5 15.6916 3.00138 14.5237 3.8869 13.6824L11.4419 6.50522C12.0867 5.89263 13.0293 5.71171 13.8551 6.04204V6.04204C14.5693 6.32774 15.091 6.95483 15.2418 7.70914L15.2564 7.78205C15.4093 8.54638 15.1836 9.33749 14.6505 9.90614L8 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className={`${s['controls-icon']} ${s['smile']}`}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5808 19.6349C21.994 19.9596 22.5956 19.8896 22.8879 19.4529C24.4579 17.1073 25.1933 14.2898 24.9565 11.4585C24.6933 8.30994 23.2475 5.37791 20.91 3.25219C18.5725 1.12647 15.5168 -0.0352167 12.3575 0.000812777C9.19815 0.0368423 6.16969 1.26792 3.88129 3.44639C1.59289 5.62486 0.214343 8.5891 0.0229546 11.7428C-0.168434 14.8965 0.841541 18.0057 2.84971 20.4449C4.85787 22.8841 7.71524 24.4724 10.847 24.8902C13.6633 25.2659 16.5135 24.6701 18.9335 23.2173C19.3841 22.9468 19.4835 22.3494 19.1796 21.9207V21.9207C18.8756 21.492 18.2835 21.395 17.8293 21.6593C15.8049 22.8373 13.438 23.3159 11.0987 23.0038C8.44371 22.6496 6.02137 21.3032 4.31895 19.2353C2.61652 17.1675 1.76031 14.5317 1.92256 11.8581C2.08481 9.18453 3.25348 6.67159 5.19347 4.82478C7.13347 2.97798 9.70085 1.93433 12.3792 1.90379C15.0575 1.87324 17.648 2.85807 19.6296 4.66015C21.6112 6.46223 22.8369 8.94787 23.0601 11.617C23.2567 13.9688 22.6622 16.3094 21.3861 18.2734C21.0998 18.7141 21.1675 19.3102 21.5808 19.6349V19.6349Z"
                  fill="white"
                />
                <path
                  d="M8 15L9.17818 16.0473C11.0726 17.7312 13.9274 17.7312 15.8218 16.0473L17 15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10 10V10C9.52464 7.86088 6.47536 7.86088 6 10V10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19 10V10C18.5246 7.86088 15.4754 7.86088 15 10V10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className={s['input-controls']}>
            <button className={`${s['controls-icon']} ${s['comments']}`}>
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
            </button>
            <div className={s['media-action']} onClick={() => setIsActive(!isActive)}>
              <div className={s['radio-btn']}>
                <input
                  type="checkbox"
                  className={`${s['inp-disabled']}`}
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <div className={`${s['custom-btn']}`}></div>
              </div>
              <div className={s['text']}>Добавить медиан на страницу</div>
            </div>
            <button className={`${s['controls-icon']} ${s['micro']}`}>
              <svg
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
            </button>
            <button className={`${s['controls-icon']} ${s['send']}`}>
              <svg
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M29 12.5L0 25V15L20.5 12.5H29Z" fill="white" />
                <path d="M29 12.5L0 0V9.5L20.5 12.5H29Z" fill="white" />
              </svg>
            </button>
          </div>
        </form>
      )}
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
  );
};

export default Wall;
