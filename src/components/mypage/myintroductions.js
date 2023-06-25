import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';

function MyIntroductions() {
  const [introductions, setIntroductions] = useState([]);
  const accessToken = localStorage.getItem('Authorization'); // 로컬 스토리지에서 접근 토큰을 가져옵니다.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get('https://api.ohmystack.co/api/user/all-introduces', config);
        setIntroductions(response.data);
      } catch (error) {
        console.error('Error fetching introductions:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>자기소개서 목록</h1>
          {introductions.map((introduction) => (
            <div key={introduction.id}>
              <h2>{introduction.title}</h2>
              <p>{introduction.introduce}</p>
              <p>작성일: {introduction.created_at}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyIntroductions;
