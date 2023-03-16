import React from 'react';
import s from './PatternsDropDown.module.scss';
import addSvg from '../../../assets/img/icons/add.svg';
import DropDownLayout from './../../UI/DropDownLayout/DropDownLayout';
import Pattern from '../../Pattern/Pattern';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';
import Icon from '../../UI/Icon/Icon';

const PatternsDropDown: React.FC = () => {
  const patterns: { id: number; name: string }[] = [
    { id: 1, name: 'ОсновнойЛОВЫРФОВРЫФОВРЫФОД' },
    { id: 2, name: 'Основной' },
    { id: 3, name: 'Основной' },
    { id: 4, name: 'Основной' },
    { id: 5, name: 'Основной' },
    { id: 6, name: 'Основной' },
    { id: 7, name: 'Основной' },
    { id: 8, name: 'Основной' },
    { id: 9, name: 'Основной' },
  ];

  return (
    <DropDownLayout
      title={'Шаблоны'}
      myCount={3}
      allCount={3}
      link={'constructor'}
      linkText={'Открыть конструктор'}>
      <h6 className={s['heading']}>Все шаблоны</h6>
      {patterns.length ? (
        ''
      ) : (
        <NotFoundBlock className={'patterns-nothing'} text={'У вас ещё нету шаблонов'} />
      )}
      <div className={`${s['wrapper']} ${patterns.length ? '' : s['wrapper-nothing']}`}>
        {patterns.length
          ? patterns.map(({ id, name }, index) => (
              <Pattern id={id} name={name} hasRadio={true} index={index} key={id} />
            ))
          : ''}
        <div className={s['add-pattern']}>
          <Icon src={addSvg} id={'add'} className={'white'} />
        </div>
      </div>
    </DropDownLayout>
  );
};

export default PatternsDropDown;
