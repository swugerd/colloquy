import React, { useState } from 'react';
import s from './Pattern.module.scss';
import trashSvg from '../../assets/img/icons/trash.svg';
import settingsSvg from '../../assets/img/icons/settings.svg';
import forwardSvg from '../../assets/img/icons/forward.svg';
import editSvg from '../../assets/img/icons/edit.svg';
import InputButton from '../UI/InputButton/InputButton';
import Icon from '../UI/Icon/Icon';

type PatternProps = {
  id: number;
  name: string;
  hasRadio: boolean;
  index: number;
};

const Pattern: React.FC<PatternProps> = ({ id, name, hasRadio, index }) => {
  // Переделать верстку под каждый шаблон индивидуально
  // Нарисовать свгшки
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={s['pattern']}>
      <div className={s['wrapper']}>
        <div className={s['pattern-items']}>
          <div className={s['item1']}></div>
          <div className={s['item2']}></div>
          <div className={s['item3']}></div>
        </div>
        <button className={`${s['action-btn']} ${s['delete-btn']}`}>
          <Icon src={trashSvg} id={'trash'} className={'gray'} />
        </button>
        <button className={`${s['action-btn']} ${s['forward-btn']}`}>
          <Icon src={forwardSvg} id={'forward'} className={'gray'} />
        </button>
        <button className={`${s['action-btn']} ${s['settings-btn']}`}>
          <Icon src={settingsSvg} id={'settings'} className={'gray'} />
        </button>
        {hasRadio && (
          <InputButton
            checked={selectedIndex === index}
            onChange={() => setSelectedIndex(index)}
            name={'pattern'}
            id=""
            type={'radio'}
          />
        )}
      </div>
      <div className={s['info']}>
        <span className={s['name']}>{name}</span>
        <button className={s['edit-btn']}>
          <Icon src={editSvg} id={'edit'} className={'gray'} />
        </button>
      </div>
    </div>
  );
};

export default Pattern;
