import React from 'react';
import Button from '../../components/UI/Button/Button';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './NotFound.module.scss';
import svg from '../../assets/img/big-icons/404.svg';
import Icon from '../../components/UI/Icon/Icon';

const NotFound: React.FC = () => {
  useSetPageTitle('Страница не найдена!');
  return (
    <div className={`${s['wrapper']} container`}>
      <Icon src={svg} id={'notFound'} className={'not-found'} />
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
