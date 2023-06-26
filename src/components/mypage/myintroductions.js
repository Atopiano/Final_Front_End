import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/myintroductions.css';

function MyIntroductions() {
  const [introductions, setIntroductions] = useState([]);
  const accessToken = localStorage.getItem('Authorization');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleIntroductionClick = (id) => {
    navigate(`/mypage/myintroductions/detail/${id}`);
  };

  const handleRepresentClick = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.put(`https://api.ohmystack.co/api/user/represent/${id}`, null, config);
      console.log(response.data); // Log the response if needed
      fetchData(); // Fetch updated introductions data
    } catch (error) {
      console.error('Error updating representation:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="default-container">
        <MySidebar />
        <div className="content">
          <h1>자기소개서 목록</h1>
          <div className="introduction-container">
            {introductions.map((introduction) => (
              <div
                key={introduction.id}
                className={`introduction-box${introduction.represent ? ' represent' : ''}`}
              >
                <h2 onClick={() => handleIntroductionClick(introduction.id)}>{introduction.title}</h2>
                <p>{introduction.introduce}</p>
                <p>작성일: {introduction.created_at}</p>
                <button onClick={() => handleRepresentClick(introduction.id)}>
                  {introduction.represent ? '대표 자기소개서 해제' : '대표 자기소개서로 지정'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyIntroductions;
