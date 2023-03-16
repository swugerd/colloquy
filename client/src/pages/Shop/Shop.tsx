import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Shop.module.scss';

const Shop: React.FC = () => {
  useSetPageTitle('Магазин');
  return <div>Shop</div>;
};

export default Shop;
