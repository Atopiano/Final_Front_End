import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function ChangePassword() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>비밀번호 변경</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
