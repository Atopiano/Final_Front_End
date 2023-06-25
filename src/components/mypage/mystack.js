import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function Mystack() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>로그인 후 홈</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mystack;
