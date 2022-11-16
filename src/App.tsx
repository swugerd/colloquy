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

const App: React.FC = () => {
  const { isAuth } = useSelector(selectIsAuth);

  return (
    <>
      {isAuth ? (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/circles" element={<Circles />} />
            <Route path="/voices" element={<Voices />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/music" element={<Music />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/games" element={<Games />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifies" element={<Notifies />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/constructor" element={<Constructor />} />
            <Route path="*" element={<NotFound />} />
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
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App;
