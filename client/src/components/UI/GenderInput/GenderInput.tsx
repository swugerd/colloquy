import React from 'react';
import Icon from '../Icon/Icon';
import s from './GenderInput.module.scss';
import iconS from '../Icon/Icon.module.scss';

type GenderInputProps = {
  className?: string;
  type: 'male' | 'female';
  icon: string;
  inputType: 'radio' | 'checkbox';
  checked: boolean;
  value: string;
  setValue: (value: any) => void;
};

const GenderInput: React.FC<GenderInputProps> = ({
  className,
  type,
  icon,
  inputType,
  value,
  setValue,
  checked,
}) => {
  return (
    <div className={`${s['radio-btn']} ${className ? s[className] : ''}`}>
      <input
        type={inputType}
        name="user_gender"
        value={value}
        checked={checked}
        onChange={(e: any) => setValue({ user_gender: e.target.value })}
        className={`${s['inp-disabled']} ${iconS['inp-check']}`}
      />
      <div className={`${s['custom-btn']} ${s[type === 'male' ? 'male' : 'female']}`}>
        <Icon src={icon} id={type === 'male' ? 'male' : 'female'} className={'white'} />
      </div>
    </div>
  );
};

export default GenderInput;
