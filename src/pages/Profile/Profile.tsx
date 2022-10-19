import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Profile.module.scss';

const Profile: React.FC = () => {
  useSetPageTitle('Профиль');
  return (
    <>
      <div className={s['profile']}>profile</div>
    </>
  );
};

export default Profile;
