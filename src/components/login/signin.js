import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../../components/style/signin.css';
import axios from 'axios';

function Signin() {
  //회원가입 완료시 -> (/home)
  const navigate = useNavigate();
  //사용자 입력받는곳
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Email 유효성 검사
  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  // Password 유효성검사
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
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
      .post('http://localhost:8080/loginProcess', data)
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
        setLoginError('이메일이나 비밀번호를 잘못 입력했습니다. 입력한 내용을 다시 확인해주세요');
      });
  };

  return (
    <div>
      <h1>로그인페이지 여기도 폼수정예정이랍니다^^</h1>
      <br />
      <FloatingLabel controlId="Signin" label="Email" className="sign_in" style={{ width: '290px', height: '38px', borderRadius: '20px' }}>
        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setUserId(e.target.value)} />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="Password" label="Password" className="password_in" style={{ width: '290px', height: '38px', borderRadius: '20px' }}>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)} />
      </FloatingLabel>

      {loginError && <p className="text-danger">{loginError}</p>}

      <Button className="signin-button" style={{marginTop: "30px"}} onClick={loginHandler}>로그인</Button>
    </div>
  );
}

export default Signin;
