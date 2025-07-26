import React from 'react';
import Header from '../../Components/Users/Header';
import Footer from '../../Components/Users/Footer';
// import Header from '../../Components/Users/testHeader';
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />  {/* This is where the content passed to Layout will be rendered */}
      <Footer />
    </>
  );
};

export default Layout;
