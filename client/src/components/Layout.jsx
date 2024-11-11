import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  const isChatRoute = location.pathname === '/chat';

  return (
    <>
      <Header />
      <Outlet />
      {!isChatRoute && <Footer />}
    </>
  );
};

export default Layout;
