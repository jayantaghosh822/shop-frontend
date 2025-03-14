import React from 'react';
import Header from './Header';
import Footer from './Footer';

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
