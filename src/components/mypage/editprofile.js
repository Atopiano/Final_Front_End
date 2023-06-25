import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function EditProfile() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>회원 정보 수정</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
