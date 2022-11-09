import React from 'react';
import Button from '../../components/UI/Button/Button';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './NotFound.module.scss';

const NotFound: React.FC = () => {
  useSetPageTitle('Страница не найдена!');
  return (
    <div className={`${s['wrapper']} container`}>
      <div className={s['image']}>
        <svg
          width="367"
          height="367"
          viewBox="0 0 367 367"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="183.5" cy="183.5" r="176" stroke="#0F9C72" strokeWidth="15" />
          <circle cx="118" cy="151" r="25" fill="#0F9C72" />
          <circle cx="248" cy="151" r="25" fill="#0F9C72" />
          <path d="M103 239H264" stroke="#0F9C72" strokeWidth="15" strokeLinecap="round" />
        </svg>
      </div>
      <div className={s['block']}>
        <h2 className={s['title']}>404</h2>
        <h2 className={s['sub-title']}>Страница не найдена!</h2>
        <p className={s['text']}>
          Этот адрес ведет на несуществующую страницу, проверьте, возможно вы допустили ошибку в
          адресной строке. Надеемся, что вы найдёте то, за чем пришли!
        </p>
        <Button className={'not-found'} text={'На главную'} link={'/'} />
      </div>
    </div>
  );
};

export default NotFound;
