import React from 'react';
import { Link } from 'react-router-dom';
import s from './Button.module.scss';

type ButtonProps = {
  className: string;
  text: string;
  link?: string;
};

const Button: React.FC<ButtonProps> = ({ className, text, link }) => {
  return (
    <>
      {link ? (
        <Link className={`${s['button']} ${s[className]}`} to={`/${link}`}>
          {text}
        </Link>
      ) : (
        <button className={`${s['button']} ${s[className]}`}>{text}</button>
      )}
    </>
  );
};

export default Button;
