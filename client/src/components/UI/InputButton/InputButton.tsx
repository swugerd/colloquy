import React from 'react';
import s from './InputButton.module.scss';

type InputButtonProps = {
  className?: string;
  checked: any;
  onChange: any;
  name: string;
  id: string;
  type: 'radio' | 'checkbox';
  value?: string;
};

const InputButton: React.FC<InputButtonProps> = ({
  className,
  checked,
  onChange,
  name,
  id,
  value,
  type,
}) => {
  return (
    <div className={`${s['radio-btn']} ${className ? s[className] : ''}`}>
      <input
        type={type}
        name={name}
        className={`${s['inp-disabled']}`}
        checked={checked}
        onChange={(e: any) => onChange({ [name]: e.target.value })}
        id={id}
        value={value}
      />
      <div className={`${s['custom-btn']} ${s['custom-btn-small']}`}></div>
    </div>
  );
};

export default InputButton;
