import classNames from 'classnames';
import React from 'react';
import s from './Achievement.module.scss';
import gemIcon from '../../assets/img/icons/gem.svg';

type AchievementProps = {
  id: number;
  type: 'easy' | 'standard' | 'hard' | 'secret';
  img: React.ReactNode;
  name: string;
  desc: string;
  myProgress: number;
  allProgress: number;
  reward: number;
};

const Achievement: React.FC<AchievementProps> = ({
  id,
  type,
  img,
  name,
  desc,
  myProgress,
  allProgress,
  reward,
}) => {
  return (
    <div className={s['achievement']}>
      <div className={s['preview']}>
        <div className={s['desc']}>{desc}</div>
        <svg
          className={classNames({
            [s['background']]: true,
            [s['easy']]: type === 'easy',
            [s['standard']]: type === 'standard',
            [s['hard']]: type === 'hard',
            [s['secret']]: type === 'secret',
          })}
          viewBox="0 0 352 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M318.839 2H13.0996C11.2159 2 9.49201 3.05871 8.64011 4.7388L2.25143 17.3384C1.47279 18.874 1.53901 20.7022 2.42671 22.1775L30.3468 68.5779C31.2512 70.0808 32.877 71 34.631 71H339.484C341.34 71 343.044 69.9719 343.908 68.3297L349.743 57.2498C350.528 55.76 350.51 53.9755 349.695 52.5018L323.216 4.58175C322.335 2.98885 320.659 2 318.839 2Z"
            fill=""
            stroke="white"
            strokeWidth="3"
          />
        </svg>
        <div
          className={classNames({
            [s['icon']]: true,
            [s['easy-icon']]: type === 'easy',
            [s['standard-icon']]: type === 'standard',
            [s['hard-icon']]: type === 'hard',
            [s['secret-icon']]: type === 'secret',
          })}>
          {img}
        </div>
        <span className={s['name']}>{name}</span>
      </div>
      <div className={s['progress']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="37 -5 120 100"
          width="120"
          height="100">
          <path
            className={s['green']}
            d="M55,90
               A55,55 0 1,1 140,90"
            style={{ fill: 'none' }}
          />
          <path
            className={s['white']}
            d="M55,90
               A55,55 0 1,1 140,90"
            style={{ fill: 'none', strokeDashoffset: -248 * (myProgress / allProgress) }}
          />
        </svg>
        <div className={s['count']}>
          <span className={s['my-progress']}>{myProgress}</span>
          <span>{allProgress}</span>
        </div>
        <div className={s['reward']}>
          <span>{reward}</span>
          <div className={s['reward-icon']}>
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 4.79997L5.1 3.59998L7.2 4.79997V10.2L5.1 11.4L3 10.2V4.79997Z"
                fill="white"
              />
              <path
                d="M9.90028 2.7L5.10029 0L0.300293 2.7L2.70029 4.2L5.10029 2.7L7.50029 4.2L9.90028 2.7Z"
                fill="white"
              />
              <path
                d="M9.90028 12.3L5.10029 15L0.300293 12.3L2.70029 10.8L5.10029 12.3L7.50029 10.8L9.90028 12.3Z"
                fill="white"
              />
              <path
                d="M7.80029 10.1999V4.79993L10.2003 3.29993V11.6999L7.80029 10.1999Z"
                fill="white"
              />
              <path
                d="M2.3999 10.1999V4.79993L-9.53674e-05 3.29993V11.6999L2.3999 10.1999Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
