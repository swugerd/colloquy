import React from 'react';
import { Link } from 'react-router-dom';
import s from './Button.module.scss';

type ButtonProps = {
  className: string;
  text: string;
  link?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ className, text, link, onClick }) => {
  return (
    <>
      {link ? (
        <Link className={`${s['button']} ${s[className]}`} to={link} onClick={onClick}>
          {text}
        </Link>
      ) : (
        <button className={`${s['button']} ${s[className]}`} onClick={onClick}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
