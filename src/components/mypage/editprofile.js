import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import axios from 'axios';
import '../../components/style/mystack.css';

function EditProfile() {
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [academicAbility, setAcademicAbility] = useState(1);
  const [department, setDepartment] = useState(1);
  const [credit, setCredit] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get('https://api.ohmystack.co/api/user/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userInfo = response.data.body;
        setNickName(userInfo.nickName);
        setPhoneNumber(userInfo.phoneNumber);
        setAcademicAbility(userInfo.academicAbility.id);
        setDepartment(userInfo.department.id);
        setCredit(userInfo.credit);
        setUserAddress(userInfo.userAddress);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      nickName,
      phoneNumber: parseInt(phoneNumber),
      academicAbility: { id: academicAbility },
      department: { id: department },
      credit,
      userAddress,
    };

    const token = localStorage.getItem('Authorization');

    axios
      .put('https://api.ohmystack.co/api/user/userinfo', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // 수정 완료 후 변경된 정보 알림
        alert('수정이 완료되었습니다.');
        // 나의 회원 정보 페이지로 이동
        navigate('/mypage/myprofile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFindAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUserAddress(data.address);
      },
    }).open();
  };

  const academicAbilityOptions = [
    { id: 1, title: '선택안함' },
    { id: 2, title: '고졸' },
    { id: 3, title: '대졸' },
    { id: 4, title: '석사' },
  ];

  const departmentOptions = [
    { id: 1, title: '선택안함' },
    { id: 2, title: '컴퓨터공학과' },
    { id: 3, title: '통계학과' },
    { id: 4, title: '소프트웨어공학과' },
    { id: 5, title: '정보통신학과' },
    { id: 6, title: '산업공학과' },
    { id: 7, title: '비전공' },
    { id: 8, title: '그외 IT 전공' },
  ];

  return (
    <>
      <Header />
      <div className="mypage-container">
        <MySidebar />
        <div className="content">
          <h1>회원 정보 수정</h1>
          <form onSubmit={handleFormSubmit}>
            <label>
              닉네임:
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </label>
            <label>
              전화번호:
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))}
              />
            </label>
            <label>
              학력:
              <select
                value={academicAbility}
                onChange={(e) => setAcademicAbility(parseInt(e.target.value))}
              >
                {academicAbilityOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              학과:
              <select
                value={department}
                onChange={(e) => setDepartment(parseInt(e.target.value))}
              >
                {departmentOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              학점:
              <input
                type="text"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                placeholder="만점은 4.5입니다." // 학점 입력 안내 문구 추가
              />
            </label>
            <label>
              주소:
              <input
                type="text"
                value={userAddress}
                disabled={true}
                placeholder="주소찾기 버튼을 누르세요."
              />
              <button type="button" onClick={handleFindAddress}>
                주소찾기
              </button>
            </label>
            <button type="submit">수정하기</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
