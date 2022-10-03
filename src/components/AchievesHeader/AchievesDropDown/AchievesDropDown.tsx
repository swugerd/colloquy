import React from 'react';
import DropDownLayout from '../../UI/DropDownLayout/DropDownLayout';
import s from './AchievesDropDown.module.scss';
import achieveIcons from '../../../assets/img/header/achieve.svg';
import Achievement from '../../Achievement/Achievement';

const AchievesDropDown: React.FC = () => {
  const achievements: {
    id: number;
    type: 'easy' | 'standard' | 'hard' | 'secret';
    img: string;
    name: string;
    desc: string;
    myProgress: number;
    allProgress: number;
    reward: number;
  }[] = [
    {
      id: 1,
      type: 'easy',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то  воыфо врыфорв фыровлыф выфв фывфы вофырвло фрыоврыфол рвофырв',
      myProgress: 0,
      allProgress: 1,
      reward: 1250,
    },
    {
      id: 2,
      type: 'standard',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 1,
      allProgress: 10,
      reward: 1250,
    },
    {
      id: 3,
      type: 'hard',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 15,
      allProgress: 75,
      reward: 1250,
    },
    {
      id: 4,
      type: 'secret',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 4,
      allProgress: 5,
      reward: 1250,
    },
    {
      id: 5,
      type: 'standard',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 7,
      allProgress: 15,
      reward: 1250,
    },
    {
      id: 6,
      type: 'hard',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 21,
      allProgress: 97,
      reward: 1250,
    },
    {
      id: 7,
      type: 'secret',
      img: achieveIcons,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 20,
      allProgress: 100,
      reward: 1250,
    },
  ];
  const closestAchieve = achievements
    .map(({ id, type, img, name, desc, reward, allProgress, myProgress }) => {
      return {
        percentage: Number((myProgress / allProgress).toFixed(2)),
        id,
        type,
        img,
        name,
        desc,
        reward,
        allProgress,
        myProgress,
      };
    })
    .sort((a, b) => b.percentage - a.percentage)[0];

  return (
    <DropDownLayout
      title={'Достижения'}
      myCount={5}
      allCount={achievements.length}
      link={'/achievements'}
      linkText={'Показать все'}>
      <h6 className={s['heading']}>Ближайшее</h6>
      <Achievement
        id={closestAchieve.id}
        type={closestAchieve.type}
        img={achieveIcons}
        name={closestAchieve.name}
        desc={closestAchieve.desc}
        myProgress={closestAchieve.myProgress}
        allProgress={closestAchieve.allProgress}
        reward={closestAchieve.reward}
      />
      <h6 className={s['heading']}>Все</h6>
      {achievements.map(({ id, type, img, name, desc, myProgress, allProgress, reward }) => (
        <Achievement
          id={id}
          type={type}
          img={img}
          name={name}
          desc={desc}
          myProgress={myProgress}
          allProgress={allProgress}
          reward={reward}
          key={id}
        />
      ))}
    </DropDownLayout>
  );
};

export default AchievesDropDown;
