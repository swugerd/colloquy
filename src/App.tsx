import React from 'react';
import Header from './components/Header/Header';
import Feed from './pages/Feed/Feed';
import Home from './pages/Home/Home';
import './index.scss';

const App: React.FC = () => {
  const isAuth = false;
  return (
    <>
      <Header />
      {isAuth ? <Feed /> : <Home />}
    </>
  );
};

export default App;
