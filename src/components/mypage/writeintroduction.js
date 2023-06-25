import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/writeintroduction.css';

function WriteIntroduction() {
  return (
    <>
      <Header />
      <div className='default-container'>
      <MySidebar />
        <div className="custom-container">
          <div className="custom-sidebar">
          </div>
          <div className="custom-content">
            <h1 className="custom-title">자기소개서 작성하기</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WriteIntroduction;
