import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import '../../components/style/mystack.css';
import '../../components/style/myprofile.css';


function MyProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get('https://api.ohmystack.co/api/user/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserInfo(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="mypage-container">
        <MySidebar />
        <div className="content">
          <h3 className='userinfo'>회원 정보</h3>
          {userInfo && (
            <div className='p_pofile'>
              <div className='text-profile'>
                <p>Nick Name : {userInfo.nickName}</p>
                <p>Phone Number : {userInfo.phoneNumber}</p>
                <p>Academic Ability : {userInfo.academicAbility.title}</p>
                <p>Department : {userInfo.department.title}</p>
                <p>Address : {userInfo.userAddress}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyProfile;
