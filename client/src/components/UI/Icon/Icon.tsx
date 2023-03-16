import React from 'react';
import s from './Icon.module.scss';

type IconProps = {
  src: string;
  id: string;
  className: string;
  hoverClass?: string;
  isActive?: boolean;
};

const Icon: React.FC<IconProps> = ({ src, id, className, hoverClass, isActive }) => {
  return (
    <>
      <svg
        className={`${s[className]} ${hoverClass ? s[hoverClass] : ''} ${
          isActive ? s['active'] : ''
        }`}>
        <use xlinkHref={`${src}#${id}`} />
      </svg>
    </>
  );
};

export default Icon;
