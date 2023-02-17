import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  return (
    <div className={`${s['wrapper']}`}>
      {
        <>
          <Header />
          <MobileHeader />
          {mobile.chatId ? '' : <MobileFooter />}
        </>
      }
      <div className="container">
        <div className={s['content']}>
          {
            <>
              <MobileSidebar />
              <Sidebar />
            </>
          }
          <main
            className={`${s['main']} ${mobile.title === 'Сообщения' ? s['messages'] : ''} ${
              mobile.chatId ? s['selected'] : ''
            }`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
