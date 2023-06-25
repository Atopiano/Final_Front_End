import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function MyProfile() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>나의 회원 정보</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyProfile;
