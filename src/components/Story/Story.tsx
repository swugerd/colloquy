import React from 'react';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import s from './Story.module.scss';

type StoryProps = {
  id: number;
  story: string;
  user: {
    id: number;
    name: string;
    img: string;
  };
  className: string;
};

const Story: React.FC<StoryProps> = ({ id, story, user, className }) => {
  return (
    <div className={`${s['story']} ${s[className]}`}>
      <video>
        <source src={story} type="video/mp4" />
      </video>
      <div className={s['user']}>
        <HeaderAvatar
          className={'story'}
          img={user.img}
          title={user.name}
          indicatorClass={['sm-indicator', 'border-elem']}
          onlineType={'pc-online'}
        />
        <span className={s['user-name']}>{user.name.split(' ')[0]}</span>
      </div>
    </div>
  );
};

export default Story;
