import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../../components/style/signin.css';
import Header from '../../components/base/header';
import axios from 'axios';

function Signin() {
  //로그인 완료시 -> (/home)
  const navigate = useNavigate();
  //사용자 입력받는곳
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // error msg
  const [loginError, setLoginError] = useState('');

  // Email 유효성 검사
  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  // Password 유효성검사
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(password);
  };

  // 제출 시 새로고침X -> data수집 후 서버로 전송
  const loginHandler = (e) => {
    e.preventDefault();   // page 새로고침 X

    // Email 유효성 실패
    if (!validateEmail(userId)) {
      alert("이메일을 입력해주세요");
      return;
    }

    // Password 유효성 실패
    if (!validatePassword(userPassword)) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    // 서버 데이터 형식이랑 일치하는지 확인해야함
    const data = {
      "email": userId,
      "password": userPassword,
    };

    // API받아오기
    axios
      .post('/api/login', data)
      .then((response) => {
        console.log(response.data);
        const responseData = response.data; // 서버데이터 변수에 저장

        // Authorization값 가져와서 토큰에 저장 (로그인 후 인증토큰발급)
        let inToken = response.headers.get("Authorization");
        // 토큰값 로컬스토리지에 담아 다른 브라우저에서 사용할 수 있음
        localStorage.setItem("Authorization", inToken);

        alert("로그인 되었습니다!");

        navigate('/main', {
          state: responseData
        })
      })
      .catch((error) => {
        console.log(error);
        setLoginError('입력한 내용을 다시 확인해주세요');
      });
  };

  return (
    <div >
      <Header />
      <div className="log_in">
        <div className="logform-box">
          <p style={{ fontSize: '30px', marginTop: '20px', marginBottom: '40px', marginRight: '155px', display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', textAlign: 'left' }}>로그인</p>
          <FloatingLabel controlId="Signin" label="Email" className="sign_in">
            <Form.Control
              className="box1"
              type="email"
              placeholder="name@example.com"
              style={{
                background: 'rgba(255, 255, 255, 0.89)',
                border: '2px solid #FFFFFF',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                width: '280px',
                height: '50px',
                marginBottom: '20px',
                borderRadius: '40px'
              }}
              onChange={(e) => setUserId(e.target.value)} />
          </FloatingLabel>
          <Form.Group controlId="Password" className="password_in">
            <FloatingLabel label="Password" className="ppsin">
              <Form.Control
                className="box2"
                type="password"
                placeholder="Password"
                style={{
                  background: 'rgba(255, 255, 255, 0.89)',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  width: '280px',
                  height: '50px',
                  marginBottom: '30px',
                  borderRadius: '40px'
                }}
                onChange={(e) => setUserPassword(e.target.value)} />
            </FloatingLabel>
            {loginError && <Form.Text className="text-danger" style={{ textAlign: 'center' }}>{loginError}</Form.Text>}
          </Form.Group>
          <Button className="signin-button"
            onClick={loginHandler}>로그인</Button>
          <div className="links">
            <a href="/searchid">아이디 찾기</a>
            <a href="/searchpassword">비밀번호 찾기</a>
            <a href="/signup">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Signin;
