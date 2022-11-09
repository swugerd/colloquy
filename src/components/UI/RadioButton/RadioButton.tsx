import React from 'react';
import s from './RadioButton.module.scss';

type RadioButtonProps = {
  className?: string;
  checked: any;
  onChange: any;
  name: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({ className, checked, onChange, name }) => {
  return (
    <div className={`${s['radio-btn']} ${className ? s[className] : ''}`}>
      <input
        type="radio"
        name={name}
        className={`${s['inp-disabled']}`}
        checked={checked}
        onChange={onChange}
      />
      <div className={`${s['custom-btn']} ${s['custom-btn-small']}`}></div>
    </div>
  );
};

export default RadioButton;
