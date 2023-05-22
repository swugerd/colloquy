import React from 'react';
import s from './FastMessagesDropDown.module.scss';
import FastMessagesList from './FastMessagesList/FastMessagesList';
import FastMessagesChat from './FastMessagesChat/FastMessagesChat';
import { useSelector } from 'react-redux';
import { selectDropdowns } from './../../../redux/dropdowns/selector';
import NotFoundBlock from '../../NotFoundBlock/NotFoundBlock';

type FastMessagesDropDownProps = {
  isOpenHandler?: React.MouseEventHandler<HTMLButtonElement>;
  componentIndexHandler?: React.MouseEventHandler<HTMLButtonElement>;
  componentIndex?: 0 | 1;
};

const FastMessagesDropDown = React.forwardRef<HTMLDivElement, FastMessagesDropDownProps>(
  ({ isOpenHandler, componentIndexHandler, componentIndex }, ref) => {
    const { dropdowns } = useSelector(selectDropdowns);
    return (
      <div ref={ref} className={s.wrapper}>
        {
          <NotFoundBlock className={'dropdowns'} text={'В разработке'} />
          // dropdowns.fmsComponentIndex === 0 ? (
          //   <FastMessagesList />
          // ) : (
          //   <FastMessagesChat userId={dropdowns.fmsComponentIndex} />
          // )
          // <Routes>
          //   <Route path="/fms" element={<FastMessagesList onClick={onClick} />} />
          //   <Route path="/fms/:dialogId" element={<FastMessagesChat />} />
          // </Routes>
        }
      </div>
    );
  },
);

export default FastMessagesDropDown;
