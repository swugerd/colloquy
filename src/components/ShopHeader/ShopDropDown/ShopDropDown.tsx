import React, { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDownLayout from '../../UI/DropDownLayout/DropDownLayout';
import s from './ShopDropDown.module.scss';
import ebalo from '../../../assets/uploads/test/image2.png';
import smile from '../../../assets/uploads/test/smile.png';
import classNames from 'classnames';

const ShopDropDown: React.FC = () => {
  const categories = [
    {
      id: 1,
      type: 'bg',
      title: 'Фоны для чатов',
      count: 9,
      products: [
        { id: 1, img: ebalo, name: 'Жесткие котейки я уверен' },
        { id: 2, img: ebalo, name: 'Жесткие котейки' },
        { id: 3, img: ebalo, name: 'Жесткие котейки' },
        { id: 4, img: ebalo, name: 'Жесткие котейки' },
      ],
    },
    {
      id: 2,
      type: 'sounds',
      title: 'Звуки сообщений',
      count: 2,
      products: [
        { id: 1, img: ebalo, name: 'Крутой звук' },
        { id: 2, img: ebalo, name: 'Кру' },
        { id: 3, img: ebalo, name: 'Вообще невероятно' },
        { id: 4, img: ebalo, name: 'Вообще невероятно' },
        { id: 5, img: ebalo, name: 'Вообще невероятно' },
      ],
    },
    {
      id: 3,
      type: 'emoji',
      title: 'Смайлы',
      count: 12,
      products: [
        { id: 1, img: smile, name: 'егор' },
        { id: 2, img: smile, name: 'Крутой звук' },
        { id: 3, img: smile, name: 'Вообще невероятно' },
        { id: 4, img: smile, name: 'Вообще невероятно' },
        { id: 5, img: smile, name: 'Вообще невероятно' },
      ],
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // Переделать переключение радио кнопок

  const indexHandler = (index: number, categoryIndex: number): any => {
    setSelectedIndex(index);
    setSelectedCategoryIndex(categoryIndex);
  };

  return (
    <DropDownLayout
      link={'/shop'}
      linkText={'Открыть магазин'}
      title={'Куплено'}
      myCount={3}
      allCount={55}
      currency={2550}>
      {categories.map(({ id, type, title, count, products }, categoryIndex) => (
        <div className={s['category']} key={id}>
          <h6 className={s['heading']}>
            {title}
            <span className={s['separator']}>&mdash;</span>
            <span className={s['my-count']}>{products.length}</span>
            <span className={s['all-count']}>{count}</span>
          </h6>
          <div className={s['wrapper']}>
            {products.map(({ id, img, name }, index) => (
              <div
                className={`${s['item']} ${type === 'bg' ? s['item-big'] : s['item-small']}`}
                title={name}
                onClick={type !== 'emoji' ? () => indexHandler(index, categoryIndex) : () => {}}
                key={id}>
                <div
                  className={classNames({
                    [s['item-img']]: true,
                    [s['img-small']]: type === 'sounds',
                    [s['img-big']]: type === 'bg',
                    [s['img-very-small']]: type === 'emoji',
                  })}>
                  {type !== 'emoji' && (
                    <div
                      className={classNames({
                        [s['radio-btn']]: true,
                        [s['radio-btn-small']]: type === 'sounds',
                        [s['radio-btn-big']]: type === 'bg',
                      })}>
                      <input
                        type="radio"
                        name={type}
                        className={s['inp-disabled']}
                        checked={selectedIndex === index && categoryIndex === selectedCategoryIndex}
                        onChange={() => setSelectedIndex(index)}
                      />
                      <div
                        className={classNames({
                          [s['custom-btn']]: true,
                          [s['custom-btn-small']]: type === 'sounds',
                          [s['custom-btn-big']]: type === 'bg',
                        })}></div>
                    </div>
                  )}
                  <img src={img} alt="product" />
                </div>
                <span className={`${s['name']} ${type === 'bg' ? s['name-big'] : s['name-small']}`}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </DropDownLayout>
  );
};

export default ShopDropDown;
