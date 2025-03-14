import React from 'react';
import Header from '../../Components/Users/Header';
import Footer from '../../Components/Users/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}  {/* This is where the content passed to Layout will be rendered */}
      <Footer />
    </>
  );
};

export default Layout;
