import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Feed.module.scss';

const Feed: React.FC = () => {
  useSetPageTitle('Новости');
  return (
    <>
      <div className={s['feed']}>Feed</div>
      <div className={s['options']}>options</div>
    </>
  );
};

export default Feed;
