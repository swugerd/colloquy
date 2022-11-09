import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import MobileFooter from '../../components/MobileFooter/MobileFooter';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import useWindowSize from '../../hooks/useWindowResize';
import { selectMobile } from '../../redux/mobile/selector';
import s from './MainLayout.module.scss';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { mobile } = useSelector(selectMobile);
  // const { width } = useWindowSize();
  // console.log(width);

  return (
    <div className={`${s['wrapper']}`}>
      {/* {width <= 1153 ? (
        <>
          <MobileHeader title={mobile.title} hasArrow={true} />
          <MobileFooter />
        </>
      ) : (
        <Header />
      )} */}
      {
        <>
          <Header />
          <MobileHeader title={mobile.title} hasArrow={true} />
          <MobileFooter />
        </>
      }
      <div className="container">
        <div className={s['content']}>
          {/* {width <= 1153 ? <MobileSidebar /> : <Sidebar />} */}
          {
            <>
              <MobileSidebar />
              <Sidebar />
            </>
          }
          <main className={s['main']}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
