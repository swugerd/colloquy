import React, { useEffect, useRef } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import closeSvg from '../../assets/img/icons/close.svg';
import s from './ModalLayout.module.scss';
import backSvg from '../../assets/img/icons/back.svg';

type ModalLayoutProps = {
  className: string;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  hasBackButton?: boolean;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  className,
  children,
  onClose,
  title,
  hasBackButton,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  useOnClickOutside(ref, onClose);
  return (
    <div className={s['wrapper']}>
      <div className={`${s['modal']} ${s[className]}`} ref={ref}>
        <div className={s['top']}>
          {hasBackButton && (
            <button className={s['back']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </button>
          )}
          {title && <h3 className={s['title']}>{title}</h3>}
          <button className={s['close']} onClick={onClose}>
            <Icon src={closeSvg} id={'close'} className={'white'} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
