import React, { useRef } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import closeSvg from '../../assets/img/icons/close.svg';
import s from './ModalLayout.module.scss';

type ModalLayoutProps = {
  className: string;
  children: React.ReactNode;
  onClose: () => void;
  button: any;
  title?: string;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  className,
  children,
  onClose,
  button,
  title,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose, button);
  return (
    <div className={s['wrapper']}>
      <div className={`${s['modal']} ${s[className]}`} ref={ref}>
        <div className={s['top']}>
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
