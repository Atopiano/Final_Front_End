import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';

function MyProfile() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        console.log(token); // 토큰 값 출력
        const response = await axios.get('https://api.ohmystack.co/api/user/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.body.nickName);
        console.log(response.data.body.phoneNumber);
        console.log(response.data.body.academicAbility.title);
        console.log(response.data.body.department.title);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
