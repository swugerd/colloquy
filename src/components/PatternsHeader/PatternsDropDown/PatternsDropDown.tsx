import React from 'react';
import s from './PatternsDropDown.module.scss';
import DropDownLayout from './../../UI/DropDownLayout/DropDownLayout';

const PatternsDropDown: React.FC = () => {
  return (
    <DropDownLayout
      title={'Шаблоны'}
      myCount={3}
      allCount={3}
      link={'patterns'}
      linkText={'Открыть конструктор'}>
      <div>da</div>
    </DropDownLayout>
  );
};

export default PatternsDropDown;
