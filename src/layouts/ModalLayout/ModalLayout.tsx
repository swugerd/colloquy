import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import s from './ModalLayout.module.scss';

type ModalLayoutProps = {
  className: string;
  children: React.ReactNode;
  onClose: () => void;
  button: any;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({ className, children, onClose, button }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose, button);
  return (
    <div className={s['wrapper']}>
      <div className={`${s['modal']} ${s[className]}`} ref={ref}>
        <button className={s['close']} onClick={onClose}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M28 2L2 28" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M2 2L28 28" stroke="white" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
