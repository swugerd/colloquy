import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import MobileFooter from '../../components/MobileFooter/MobileFooter';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import useWindowSize from '../../hooks/useWindowResize';
import ForwardModal from '../../Modals/ForwardModal/ForwardModal';
import MoreAccsModal from '../../Modals/MoreAccsModal/MoreAccsModal';
import UploadFilesModal from '../../Modals/UploadFilesModal/UploadFilesModal';
import UploadMediaModal from '../../Modals/UploadMediaModal/UploadMediaModal';
import { selectMobile } from '../../redux/mobile/selector';
import { selectModal } from '../../redux/modal/selector';
import {
  setIsForwardModalOpen,
  setIsMoreAccsModalOpen,
  setIsUploadFilesModalOpen,
  setIsUploadMediaModalOpen,
} from '../../redux/modal/slice';
import { useAppDispatch } from '../../redux/store';
import s from './MainLayout.module.scss';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { modal } = useSelector(selectModal);
  const dispatch = useAppDispatch();
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
            {modal.forwardModal.isOpen && (
              <ForwardModal onClose={() => dispatch(setIsForwardModalOpen(false))} />
            )}
            {modal.uploadFilesModal.isOpen && (
              <UploadFilesModal onClose={() => dispatch(setIsUploadFilesModalOpen(false))} />
            )}
            {modal.uploadMediaModal.isOpen && (
              <UploadMediaModal
                onClose={() => dispatch(setIsUploadMediaModalOpen(false))}
                mediaType={'story'}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
