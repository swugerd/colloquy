import React from 'react';
import s from './InputButton.module.scss';

type InputButtonProps = {
  className?: string;
  checked: any;
  onChange: any;
  name: string;
  id: string;
  type: 'radio' | 'checkbox';
};

const InputButton: React.FC<InputButtonProps> = ({
  className,
  checked,
  onChange,
  name,
  id,
  type,
}) => {
  return (
    <div className={`${s['radio-btn']} ${className ? s[className] : ''}`}>
      <input
        type={type}
        name={name}
        className={`${s['inp-disabled']}`}
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <div className={`${s['custom-btn']} ${s['custom-btn-small']}`}></div>
    </div>
  );
};

export default InputButton;
