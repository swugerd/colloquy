import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import MobileFooter from '../../components/MobileFooter/MobileFooter';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import img from '../../assets/uploads/test/ebalo.png';
import useWindowSize from '../../hooks/useWindowResize';
import ForwardModal from '../../Modals/ForwardModal/ForwardModal';
import MoreAccsModal from '../../Modals/MoreAccsModal/MoreAccsModal';
import UploadFilesModal from '../../Modals/UploadFilesModal/UploadFilesModal';
import UploadMediaModal from '../../Modals/UploadMediaModal/UploadMediaModal';
import { selectMobile } from '../../redux/mobile/selector';
import { selectModal } from '../../redux/modal/selector';
import {
  setIsCreateBaseModalOpen,
  setIsForwardModalOpen,
  setIsMediaListModalOpen,
  setIsMembersModalOpen,
  setIsMoreAccsModalOpen,
  setIsPostContentModalOpen,
  setIsUploadFilesModalOpen,
  setIsUploadMediaModalOpen,
} from '../../redux/modal/slice';
import { useAppDispatch } from '../../redux/store';
import s from './MainLayout.module.scss';
import PopUpNotify from '../../components/PopUpNotify/PopUpNotify';
import { Notifies } from '../../types';
import PostContentModal from './../../Modals/PostContentModal/PostContentModal';
import CreateBaseModal from './../../Modals/CreateBaseModal/CreateBaseModal';
import MembersModal from '../../Modals/MembersModal/MembersModal';
import MediaListModal from './../../Modals/MediaListModal/MediaListModal';
import ConfirmModal from '../../Modals/ConfirmModal/ConfirmModal';
import { Socket, io } from 'socket.io-client';
import { SocketContext, SocketProvider, socket } from '../../contexts/SocketContext';
import useAuth from '../../hooks/useAuth';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { modal } = useSelector(selectModal);
  const dispatch = useAppDispatch();
  const { mobile } = useSelector(selectMobile);

  const { user } = useAuth();

  useEffect(() => {
    if (socket && user) {
      socket.connect();

      socket.emit('statusChange', {
        id: user.id,
        online_type: user && user?.online_type !== 'pc-offline' ? user?.online_type : 'pc-online',
      });

      const handleUnLoad = () => {
        socket.emit('statusChange', {
          id: user.id,
          online_type: 'pc-offline',
        });
      };

      window.addEventListener('beforeunload', handleUnLoad);

      return () => {
        handleUnLoad();
        socket.disconnect();
        window.removeEventListener('beforeunload', handleUnLoad);
      };
    }
  }, [user]);

  return (
    <SocketProvider value={socket}>
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

              {modal.uploadMediaModal.isOpen && (
                <UploadMediaModal
                  onClose={() => dispatch(setIsUploadMediaModalOpen(false))}
                  mediaType={modal.uploadMediaModal.modalType}
                />
              )}
              {modal.postContentModal.isOpen && (
                <PostContentModal
                  onClose={() => dispatch(setIsPostContentModalOpen(false))}
                  modalType={'post'}
                />
              )}
              {modal.forwardModal.isOpen && (
                <ForwardModal onClose={() => dispatch(setIsForwardModalOpen(false))} />
              )}
              {modal.uploadFilesModal.isOpen && (
                <UploadFilesModal onClose={() => dispatch(setIsUploadFilesModalOpen(false))} />
              )}
              {modal.createBaseModal.isOpen && (
                <CreateBaseModal
                  onClose={() => dispatch(setIsCreateBaseModalOpen(false))}
                  title={
                    modal.createBaseModal.modalType === 'conversation'
                      ? 'Создать беседу'
                      : 'Создать плейлист'
                  }
                />
              )}
              {modal.mediaListModal.isOpen && (
                <MediaListModal onClose={() => dispatch(setIsMediaListModalOpen(false))} />
              )}
              {modal.membersModal.isOpen && (
                <MembersModal onClose={() => dispatch(setIsMembersModalOpen(false))} />
              )}
              {modal.confirmModal.isOpen && <ConfirmModal />}
            </main>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default MainLayout;
