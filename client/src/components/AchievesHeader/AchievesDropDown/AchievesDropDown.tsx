import React from 'react';
import DropDownLayout from '../../UI/DropDownLayout/DropDownLayout';
import s from './AchievesDropDown.module.scss';
import achieveSvg from '../../../assets/img/icons/achieve.svg';
import chatSvg from '../../../assets/img/icons/chat.svg';
import patternsSvg from '../../../assets/img/icons/patterns.svg';
import questionSvg from '../../../assets/img/icons/question.svg';
import Achievement from '../../Achievement/Achievement';
import Icon from '../../UI/Icon/Icon';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';

const AchievesDropDown: React.FC = () => {
  const achievements: {
    id: number;
    type: 'easy' | 'standard' | 'hard' | 'secret';
    img: React.ReactNode;
    name: string;
    desc: string;
    myProgress: number;
    allProgress: number;
    reward: number;
  }[] = [
    {
      id: 1,
      type: 'easy',
      img: <Icon src={achieveSvg} id={'achieve'} className={'achieve-header'} />,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то  воыфо врыфорв фыровлыф выфв фывфы вофырвло фрыоврыфол рвофырв',
      myProgress: 0,
      allProgress: 1,
      reward: 1250,
    },
    {
      id: 2,
      type: 'standard',
      img: (
        <Icon src={chatSvg} id={'messages'} className={'achieve-header'} hoverClass={'messages'} />
      ),
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 1,
      allProgress: 10,
      reward: 1250,
    },
    {
      id: 3,
      type: 'hard',
      img: <Icon src={patternsSvg} id={'patterns'} className={'achieve-header'} />,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 60,
      allProgress: 75,
      reward: 1250,
    },
    {
      id: 4,
      type: 'secret',
      img: <Icon src={questionSvg} id={'question'} className={'achieve-header'} />,
      name: 'Знакомство с шаблонами',
      desc: 'Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей Выполнить какое-то очень сложное условие, чтобы быть очень крутым парей',
      myProgress: 4,
      allProgress: 5,
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
    <DropDownLayout title={'Достижения'} myCount={0} allCount={0} link={'/'} linkText={''}>
      {/* <h6 className={s['heading']}>Ближайшее</h6>
      <Achievement
        id={closestAchieve.id}
        type={closestAchieve.type}
        img={closestAchieve.img}
        name={closestAchieve.name}
        desc={closestAchieve.desc}
        myProgress={closestAchieve.myProgress}
        allProgress={closestAchieve.allProgress}
        reward={closestAchieve.reward}
      /> */}
      {/* <h6 className={s['heading']}>Все</h6>
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
      ))} */}
      <NotFoundBlock className={'dropdowns'} text={'В разработке'} />
    </DropDownLayout>
  );
};

export default AchievesDropDown;
