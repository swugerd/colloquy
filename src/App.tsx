import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Feed from './pages/Feed/Feed';
import Home from './pages/Home/Home';
import './index.scss';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Friends from './pages/Friends/Friends';
import Groups from './pages/Groups/Groups';
import Messages from './pages/Messages/Messages';
import Circles from './pages/Circles/Circles';
import Voices from './pages/Voices/Voices';
import Photos from './pages/Photos/Photos';
import Videos from './pages/Videos/Videos';
import Music from './pages/Music/Music';
import Apps from './pages/Apps/Apps';
import Games from './pages/Games/Games';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { selectIsAuth } from './redux/auth/selector';
import { useSelector } from 'react-redux';
import Settings from './pages/Settings/Settings';
import Notifies from './pages/Notifies/Notifies';
import Achievements from './pages/Achievements/Achievements';
import Shop from './pages/Shop/Shop';
import Constructor from './pages/Constructor/Constructor';
import Group from './pages/Group/Group';
import GroupMembers from './pages/GroupMembers/GroupMembers';
import GroupCreate from './pages/GroupCreate/GroupCreate';
import GroupAdmin from './pages/GroupAdmin/GroupAdmin';
import MoreAccsModal from './Modals/MoreAccsModal/MoreAccsModal';
import { selectModal } from './redux/modal/selector';
import { useAppDispatch } from './redux/store';
import { setIsMoreAccsModalOpen } from './redux/modal/slice';

const App: React.FC = () => {
  const { isAuth } = useSelector(selectIsAuth);
  const { modal } = useSelector(selectModal);
  const dispatch = useAppDispatch();

  // const routes = [
  //   {
  //     path: '/',
  //     element: <Navigate to="/feed" />,
  //   },
  //   {
  //     path: '/feed',
  //     element: <Feed />,
  //   },
  //   {
  //     path: '/profile/:username',
  //     element: <Profile />,
  //   },
  //   {
  //     routes: [
  //       {
  //         path: '/friends',
  //         element: <Friends isSearchPage={false} />,
  //       },
  //       {
  //         path: '/friends/search',
  //         element: <Friends isSearchPage={true} />,
  //       },
  //       {
  //         path: '*',
  //         element: <NotFound />,
  //       },
  //     ],
  //   },
  //   {
  //     routes: [
  //       {
  //         path: '/groups',
  //         element: <Groups isSearchPage={false} />,
  //       },
  //       {
  //         path: '/groups/search',
  //         element: <Groups isSearchPage={true} />,
  //       },
  //       {
  //         path: '/groups/:name',
  //         element: <Group />,
  //       },
  //       {
  //         path: '*',
  //         element: <NotFound />,
  //       },
  //     ],
  //   },
  //   {
  //     path: '/messages',
  //     element: <Messages />,
  //   },
  //   {
  //     path: '/circles',
  //     element: <Circles />,
  //   },
  //   {
  //     path: '/voices',
  //     element: <Voices />,
  //   },
  //   {
  //     path: '/photos',
  //     element: <Photos />,
  //   },
  //   {
  //     path: '/videos',
  //     element: <Videos />,
  //   },
  //   {
  //     path: '/music',
  //     element: <Music />,
  //   },
  //   {
  //     path: '/apps',
  //     element: <Apps />,
  //   },
  //   {
  //     path: '/games',
  //     element: <Games />,
  //   },
  //   {
  //     path: '/settings',
  //     element: <Settings />,
  //   },
  //   {
  //     path: '/notifies',
  //     element: <Notifies />,
  //   },
  //   {
  //     path: '/achievements',
  //     element: <Achievements />,
  //   },
  //   {
  //     path: '/shop',
  //     element: <Shop />,
  //   },
  //   {
  //     path: '/constructor',
  //     element: <Constructor />,
  //   },
  //   {
  //     path: '*',
  //     element: <NotFound />,
  //   },
  // ];

  return (
    <>
      {isAuth ? (
        <MainLayout>
          <Routes>
            <Route index element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/friends">
              <Route index element={<Friends isSearchPage={false} />} />
              <Route path="/friends/search" element={<Friends isSearchPage={true} />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/groups">
              <Route index element={<Groups isSearchPage={false} />} />
              <Route path="/groups/search" element={<Groups isSearchPage={true} />} />
              <Route path="/groups/create" element={<GroupCreate />} />
              <Route path="/groups/:name/edit" element={<GroupAdmin page={'edit'} />} />
              <Route path="/groups/:name/suggest" element={<GroupAdmin page={'suggest'} />} />
              <Route path="/groups/:name/blacklist" element={<GroupAdmin page={'blacklist'} />} />
              <Route path="/groups/:name/moderation" element={<GroupAdmin page={'moderation'} />} />
              <Route path="/groups/:name/requests" element={<GroupAdmin page={'requests'} />} />
              <Route path="/groups/:name/members" element={<GroupMembers />} />
              <Route path="/groups/:name" element={<Group />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/messages">
              <Route index element={<Messages isChatSelected={false} />} />
              <Route path="/messages/:chatId" element={<Messages isChatSelected={true} />} />
            </Route>
            <Route path="/circles" element={<Circles />} />
            <Route path="/voices" element={<Voices />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/music">
              <Route index element={<Music tab="list" />} />
              <Route path="/music/playlists" element={<Music tab="playlists" />} />
              <Route path="/music/recs" element={<Music tab="recs" />} />
            </Route>
            <Route path="/apps" element={<Apps />} />
            <Route path="/games" element={<Games />} />
            <Route path="/settings">
              <Route index element={<Settings page={'profile'} />} />
              <Route path="/settings/privacy" element={<Settings page={'privacy'} />} />
              <Route path="/settings/blacklist" element={<Settings page={'blacklist'} />} />
            </Route>
            <Route path="/notifies" element={<Notifies />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/constructor" element={<Constructor />} />
            <Route path="*" element={<NotFound />} />
            {/* {routes.map((route, index) => {
              if (route.routes && route.routes.length) {
                return (
                  <Route key={index} path={route.path}>
                    {route.routes.map((subRoute, subIndex) => (
                      <Route key={subIndex} path={subRoute.path} element={subRoute.element} />
                    ))}
                  </Route>
                );
              }
              return <Route key={index} path={route.path} element={route.element} />;
            })} */}
          </Routes>
        </MainLayout>
      ) : (
        <>
          <Header />
          <div
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '10rem',
              paddingBottom: '1rem',
            }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {modal.moreAccsModal.isOpen && (
              <MoreAccsModal onClose={() => dispatch(setIsMoreAccsModalOpen(false))} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default App;
