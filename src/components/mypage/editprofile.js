import React, { useState } from 'react';
import Header from '../base/header';
import Footer from '../base/footer';
import MySidebar from './mysidebar';
import axios from 'axios';
import '../../components/style/mystack.css';

function EditProfile() {
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [academicAbility, setAcademicAbility] = useState('선택안함');
  const [department, setDepartment] = useState('');
  const [credit, setCredit] = useState('');
  const [userAddress, setUserAddress] = useState('');

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

  const departmentOptions = [
    '선택안함',
    '컴퓨터 공학과',
    '통계학과',
    '소프트웨어공학과',
    '정보통신학과',
    '산업공학과',
    '비전공',
    '그외 IT전공',
  ];

  return (
    <>
      <Header />
      <div className="default-container">
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
                onChange={(e) => setAcademicAbility(e.target.value)}
              >
                <option value="선택안함">선택안함</option>
                <option value="고졸">고졸</option>
                <option value="대졸">대졸</option>
                <option value="석사">석사</option>
              </select>
            </label>
            <label>
              학과:
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
