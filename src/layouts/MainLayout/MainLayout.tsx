import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import s from './MainLayout.module.scss';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={`${s['wrapper']}`}>
      <Header />
      <div className="container">
        <Sidebar />
        <div className={s['content']}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
