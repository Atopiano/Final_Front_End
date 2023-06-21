import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Signup() {

  //회원가입 완료시 -> (/home)
  const navigate = useNavigate();
  //사용자 입력받는곳
  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userRePassword, setRePassword] = useState('');
  const [userNumber, setNumber] = useState('');
  //에러 메세지
  const [passwordError, setPasswordError] = useState('');
  const [numberError, setNumberError] = useState('');


  // Email 유효성검사
  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  // Password 유효성검사
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  //  number 유효성검사 (대한민국 휴대전화 번호 기준)
  const validateMobile = (number) => {
    const re = /^01([0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    return re.test(number);
  };

  // password error msg
  const handlePasswordChange = (password) => {
    setPassword(password);

    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 영문 소문자, 숫자, 특수 문자(@$!%*?&)를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // number error msg
  const handleNumberChange = (number) => {
    setNumber(number);

    if (!validateMobile(number)) {
      setNumberError('유효하지 않은 휴대폰 번호입니다.');
    } else {
      setNumberError('');
    }
  };

  // 제출 시 새로고침X -> data수집 후 서버로 전송
  const submitHandler = (e) => {
    e.preventDefault();    // page 새로고침 X

    // Password 매칭실패
    if (userPassword !== userRePassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    // Password 유효성 실패
    if (!validatePassword(userPassword)) {
      alert("유효한 비밀번호가 아닙니다");
      return;
    }

    // Email 유효성 실패
    if (!validateEmail(userEmail)) {
      alert("유효한 Email이 아닙니다");
      return;
    }

    // Number 유효성 실패
    if (!validateMobile(userNumber)) {
      alert("유효한 번호가 아닙니다");
      return;
    }

    // 서버 데이터 형식이랑 일치하는지 확인해야함
    const data = {
      "phoneNumber": userNumber,
      "email": userEmail,
      "password": userPassword,
      "nickName": userName
    };

    // API받아오기
    axios
      .post("http://localhost:8080/api/signup", data)
      .then((response) => {
        console.log(response.data);
        alert("Happy Coding Day!");
        navigate('/main');
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, Signup failed.");
      });
  };


  return (
    <div>
      <h1>회원가입페이지 폼수정예정이랍니다^^</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="user_up" controlId="formBasicUser">
          <Form.Label>유저명<Form.Text className="textex">*사이트에서 사용될 이름입니다.</Form.Text></Form.Label>
          <Form.Control type="text" placeholder="ex)고양이귀여워" onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>

        <Form.Group className="email_up" controlId="formBasicEmail">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="email" placeholder="ex) ohmystack@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="Password_up" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
          {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
        </Form.Group>

        <Form.Group className="Password_up" controlId="formBasicRePassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" placeholder="RePassword" onChange={(e) => setRePassword(e.target.value)} />
        </Form.Group>

        <Form.Group className="Mobile_up" controlId="formBasicNumber">
          <Form.Label>휴대전화번호</Form.Label>
          <Form.Control type="number" placeholder="010-1234-5678" onChange={(e) => handleNumberChange(e.target.value)} />
          {numberError && <Form.Text className="text-danger">{numberError}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          계정생성
        </Button>
      </Form>
    </div>
  );
}

export default Signup;