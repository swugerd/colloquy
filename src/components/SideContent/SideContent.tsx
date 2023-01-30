import React from 'react';
import { useSelector } from 'react-redux';
import { selectMobile } from '../../redux/mobile/selector';
import s from './SideContent.module.scss';

type SideContentProps = {
  children: React.ReactNode[];
  titles: string[];
  className?: string;
  isReverse?: boolean;
};

const SideContent: React.FC<SideContentProps> = ({ children, titles, className, isReverse }) => {
  const [firstTitle, secondStitle] = titles;
  const [firstChild, secondChild] = children;
  const { mobile } = useSelector(selectMobile);
  return (
    <div
      className={`${s['side-content']} ${className ? s[className] : ''} ${
        mobile.isHeaderShow ? s['active'] : ''
      } ${isReverse ? s['reverse'] : ''}`}>
      <div className={s['block']}>
        <h2 className={s['title']}>{firstTitle}</h2>
        {firstChild}
      </div>
      {secondChild && (
        <div className={s['block']}>
          <h2 className={s['title']}>{secondStitle}</h2>
          {secondChild}
        </div>
      )}
    </div>
  );
};

export default SideContent;
