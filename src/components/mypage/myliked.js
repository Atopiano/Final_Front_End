import React from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';


function MyLiked() {
  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>좋아요한 공고</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyLiked;
