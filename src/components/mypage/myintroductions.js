import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function MyIntroductions() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>자기소개서 목록</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyIntroductions;
