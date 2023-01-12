import React from 'react';
import s from './ProfileContent.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Story from '../Story/Story';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';

type ProfileContentProps = {
  contentType: 'stories' | 'friends' | 'groups' | 'music' | 'videos' | 'photos' | 'collection';
  data: any;
};

const ProfileContent: React.FC<ProfileContentProps> = ({ contentType, data }) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const convertMembers = (count: number) => {
    if (count > 999999) {
      count = Math.floor(count / 1000000);
      return `${count} млн.`;
    } else if (count > 999) {
      count = Math.floor(count / 1000);
      return `${count} тыс.`;
    }
    return count;
  };
  return (
    <>
      {contentType === 'stories' && (
        <div className={`${s['content-block']} ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Истории</h5>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            // onSwiper={(swiper) => {
            //   setTimeout(() => {
            //     // Override prevEl & nextEl now that refs are defined

            //     // сделать что-то с типизацией

            //     // @ts-ignore
            //     swiper.params.navigation.prevEl = navigationPrevRef.current;
            //     // @ts-ignore
            //     swiper.params.navigation.nextEl = navigationNextRef.current;

            //     // Re-init navigation
            //     swiper.navigation.destroy();
            //     swiper.navigation.init();
            //     swiper.navigation.update();
            //   });
            // }}
            modules={[Navigation]}>
            {data.map((item: any) => (
              <SwiperSlide key={item.id}>
                <Story id={item.id} story={item.story} user={item.user} className={'profile'} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className={s['add-story']}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <line
                    x1="7"
                    y1="1"
                    x2="7"
                    y2="13"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="13"
                    y1="7"
                    x2="1"
                    y2="7"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </SwiperSlide>
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
      )}
      {contentType === 'friends' && (
        <div className={`${s['content-block']} ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Друзья</h5>
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/friends" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
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
                </div>
                <span className={s['count']}>{data.length}</span>
              </Link>
              <p className={s['online']}>
                Онлайн:{' '}
                <span>{data.filter((item: any) => item.onlineType !== 'pc-offline').length}</span>
              </p>
            </div>
            <div className={s['friend-list']}>
              {data.map((item: any, index: number) =>
                index >= 4 ? null : (
                  <Link to="/friends" className={s['friend']} key={item.id}>
                    <HeaderAvatar
                      className={'content-block'}
                      img={item.img}
                      title={''}
                      onlineType={item.onlineType}
                      indicatorClass={['sm-indicator', 'border-elem']}
                    />
                    <span className={s['name']}>{item.name}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {contentType === 'groups' && (
        <div className={`${s['content-block']} ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Сообщества</h5>
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
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
                </div>
                <span className={s['count']}>{data.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data.map((item: any, index: number) =>
                index >= 3 ? null : (
                  <Link to="/groups" className={s['group']} key={item.id}>
                    <HeaderAvatar
                      className={'content-block'}
                      img={item.img}
                      title={''}
                      onlineType={''}
                    />
                    <div className={s['group-info']}>
                      <span className={s['group-name']}>{item.name}</span>
                      <div className={s['members']}>
                        <svg
                          width="17"
                          height="28"
                          viewBox="0 0 17 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8.61538" cy="5.02564" r="5.02564" fill="white" />
                          <path
                            d="M16.5128 19.7436C16.5128 17.5539 15.643 15.4538 14.0946 13.9054C12.5462 12.3571 10.4461 11.4872 8.25641 11.4872C6.06667 11.4872 3.96662 12.3571 2.41825 13.9054C0.86987 15.4538 3.30641e-07 17.5539 0 19.7436L8.25641 19.7436H16.5128Z"
                            fill="white"
                          />
                        </svg>

                        <span>{convertMembers(item.members)}</span>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {contentType === 'music' && (
        <div className={`${s['content-block']} ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Музыка</h5>
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
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
                </div>
                <span className={s['count']}>{data.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data.map((item: any, index: number) =>
                index >= 3 ? null : (
                  <Link to="/music" className={s['group']} key={item.id}>
                    <div className={s['music-img']}>
                      <img src={item.img} alt="music" />
                    </div>
                    <div className={s['group-info']}>
                      <span className={s['group-name']}>{item.name}</span>
                      <span className={s['members']}>{item.author}</span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {contentType === 'videos' && (
        <div className={`${s['content-block']} ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Видео</h5>
          <div className={s['content']}>
            <div className={s['top']}>
              <Link to="/groups" className={s['link']}>
                <span className={s['all']}>Показать все</span>
                <div className={s['arrow']}>
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
                </div>
                <span className={s['count']}>{data.length}</span>
              </Link>
            </div>
            <div className={s['group-list']}>
              {data.map((item: any, index: number) =>
                index >= 3 ? null : (
                  <div className={s['group']} key={item.id}>
                    <div className={s['video']}>
                      <video>
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </div>
                    <div className={s['group-info']}>
                      <span className={s['group-name']}>{item.name}</span>
                      <Link to="/profile/swugerd" className={s['members']}>
                        {item.author}
                      </Link>
                      <div className={s['views']}>
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
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {contentType === 'photos' && (
        <div className={`${s[`${contentType}-area`]} ${s['photo-block']}`}>
          <div className={s['photo-top']}>
            <h5 className={s['photo-title']}>Фотографии</h5>
            <Link to="/photos" className={s['photo-link']}>
              <span className={s['all']}>Показать все</span>
              <div className={s['arrow']}>
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
              </div>
              <span className={s['count']}>{data.length}</span>
            </Link>
          </div>
          <div className={s['photos']}>
            {data.map((item: any, index: number) =>
              index >= 4 ? null : (
                <div className={s['photo']} key={item.id}>
                  <img src={item.img} alt="content" />
                </div>
              ),
            )}
          </div>
        </div>
      )}
      {contentType === 'collection' && (
        <div className={` ${s[`${contentType}-area`]}`}>
          <h5 className={s['sub-title']}>Коллекция</h5>
          <div className={s['row']}>
            <Link to="/achievements" className={s['collection']}>
              <div className={s['collection-icon']}>
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.2116 2H2.03988C1.5594 2 1.14783 2.34137 1.09233 2.81864C0.991763 3.68331 0.907707 5.05035 1.2116 6C1.64074 7.34107 2.17686 8.04504 3.2116 9C4.62483 10.3043 7.7116 11 7.7116 11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19.7116 2H23.8833C24.3638 2 24.7754 2.34137 24.8309 2.81864C24.9315 3.68331 25.0155 5.05035 24.7116 6C24.2825 7.34107 23.7464 8.04504 22.7116 9C21.2984 10.3043 17.7116 11 17.7116 11"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.2116 18C15.7961 19.281 16.5 21 16.5 21H9C9 21 10.2033 19.3131 10.7116 18C11.2799 16.5319 11.2116 16 11.2116 14C11.2116 13.5 9.41208 12.6801 8.71161 12C7.38996 10.7168 7.46486 10.1811 6.71161 8.5C5.49022 5.7742 5.21161 1 5.21161 1H19.7116C19.7116 1 19.7116 4.5 19.2116 6.5C18.7173 8.47735 18.2116 9.5 17.7116 10.5C16.7116 12.5 14.2116 13.5 14.2116 14C14.2116 15.118 14.5432 16.5351 15.2116 18Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.21161 24H19.2116"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.2116 21V24H8.21161V21H17.2116Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.2021 5.65891C16.1782 5.58224 16.1136 5.52754 16.0372 5.519V5.519C14.6554 5.37197 13.4627 4.48523 12.9239 3.20425L12.889 3.1212C12.858 3.04799 12.7883 3 12.7115 3C12.6347 3 12.5651 3.04759 12.5341 3.12161L12.499 3.20493C11.9602 4.48562 10.7677 5.37209 9.38602 5.519V5.519C9.3096 5.52713 9.24482 5.58245 9.22116 5.65891C9.1973 5.73558 9.21903 5.81977 9.27644 5.87345L9.32064 5.91491C10.3357 6.86679 10.7832 8.27783 10.5021 9.64072L10.4787 9.75373C10.4626 9.83243 10.4921 9.91378 10.5544 9.96116C10.5883 9.98698 10.6283 10 10.6684 10C10.702 10 10.7357 9.99085 10.766 9.97214V9.97214C11.9605 9.24306 13.4626 9.24296 14.6571 9.97214V9.97214C14.7234 10.0122 14.8064 10.0083 14.8687 9.96014C14.9307 9.91357 14.9606 9.83142 14.9445 9.75272L14.9212 9.63978C14.6401 8.27674 15.0877 6.86556 16.103 5.9137L16.147 5.87244C16.204 5.81956 16.2259 5.73537 16.2021 5.65891ZM14.1256 7.22253C14.0737 7.27134 14.0506 7.34556 14.0653 7.41715L14.0784 7.48077C14.2279 8.20547 13.4407 8.75939 12.8091 8.37395V8.37395C12.7488 8.33694 12.6743 8.33694 12.614 8.37395V8.37395C11.9821 8.75942 11.1948 8.20533 11.3443 7.48045L11.3574 7.41715C11.3721 7.34556 11.349 7.27134 11.297 7.22253L11.267 7.19439C10.7164 6.67819 11.0264 5.75384 11.7769 5.67396V5.67396C11.8463 5.66684 11.9064 5.62027 11.9347 5.55357V5.55357C12.224 4.86592 13.1985 4.8659 13.4877 5.55357V5.55357C13.516 5.62027 13.5762 5.66684 13.6456 5.67396V5.67396C14.3961 5.75385 14.7062 6.67822 14.1555 7.19448L14.1256 7.22253Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
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
              </div>
            </Link>
            <Link to="/shop" className={s['collection']}>
              <div className={s['collection-icon']}>
                <svg
                  width="17"
                  height="25"
                  viewBox="0 0 17 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8L8.5 6L12 8V17L8.5 19L5 17V8Z" fill="white" />
                  <path d="M16.5 4.5L8.5 0L0.5 4.5L4.5 7L8.5 4.5L12.5 7L16.5 4.5Z" fill="white" />
                  <path
                    d="M16.5 20.5L8.5 25L0.5 20.5L4.5 18L8.5 20.5L12.5 18L16.5 20.5Z"
                    fill="white"
                  />
                  <path d="M13 17V8L17 5.5V19.5L13 17Z" fill="white" />
                  <path d="M4 17V8L0 5.5V19.5L4 17Z" fill="white" />
                </svg>
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
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
              </div>
            </Link>
            <Link to="/patterns" className={s['collection']}>
              <div className={s['collection-icon']}>
                <svg
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
                  <path
                    d="M14.3835 8.10854L14.3835 3.96189L11 5.99999L14.3835 8.10854Z"
                    fill="white"
                  />
                  <path d="M14.5 18L10.5 20.5V25.5L14.5 23.5V18Z" fill="white" />
                  <path d="M14.5 11L10.5 13.5V18.5L14.5 16.5V11Z" fill="white" />
                  <path d="M10 7L6 9.5L10 12L14 9.5L10 7Z" fill="white" />
                  <path d="M4.5 3.5L0.5 6L4.5 8.5L8.5 6L4.5 3.5Z" fill="white" />
                  <path d="M10 0L6 2.5L10 5L14 2.5L10 0Z" fill="white" />
                  <path d="M20.5 0L16.5 2.5L20.5 5L24.5 2.5L20.5 0Z" fill="white" />
                </svg>
              </div>
              <div className={s['quantity']}>
                <span className={s['my-count']}>6</span>
                <span className={s['separator']}>/</span>
                <span className={s['all-count']}>12</span>
              </div>
              <div className={s['collection-arrow']}>
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
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileContent;
