import classNames from 'classnames';
import React from 'react';
import s from './Achievement.module.scss';
import iconS from '../UI/Icon/Icon.module.scss';
import gemIcon from '../../assets/img/icons/gem.svg';
import Icon from '../UI/Icon/Icon';
import bgAchievementSvg from '../../assets/img/achievements/bg.svg';

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
    <div className={`${s['achievement']} ${iconS['hover']}`}>
      <div className={s['preview']}>
        <div className={s['desc']}>{desc}</div>
        <Icon
          src={bgAchievementSvg}
          id={'bg'}
          className={'achievement-bg'}
          hoverClass={classNames({
            easy: type === 'easy',
            standard: type === 'standard',
            hard: type === 'hard',
            secret: type === 'secret',
          })}
        />
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
          <Icon src={gemIcon} id={'gem'} className={'reward-icon'} />
        </div>
      </div>
    </div>
  );
};

export default Achievement;
