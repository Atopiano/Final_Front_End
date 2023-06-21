import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../components/style/signup.css';

function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userRePassword, setRePassword] = useState('');
  const [userNumber, setNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [numberError, setNumberError] = useState('');


  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(password);
  };

  const validateMobile = (number) => {
    const re = /^01([0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    return re.test(number);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);

    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 영문 소문자, 숫자, 특수 문자(@$!%*?&#)를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleNumberChange = (number) => {
    setNumber(number);

    if (!validateMobile(number)) {
      setNumberError('유효하지 않은 휴대폰 번호입니다.');
    } else {
      setNumberError('');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userPassword !== userRePassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    if (!validatePassword(userPassword)) {
      alert('유효한 비밀번호가 아닙니다');
      return;
    }

    if (!validateEmail(userEmail)) {
      alert('유효한 Email이 아닙니다');
      return;
    }

    if (!validateMobile(userNumber)) {
      alert('유효한 번호가 아닙니다');
      return;
    }

    const data = {
      phoneNumber: userNumber,
      email: userEmail,
      password: userPassword,
      nickName: userName
    };

    axios
      .post('http://localhost:8080/api/signup', data)
      .then((response) => {
        console.log(response.data);
        alert('Happy Coding Day!');
        navigate('/main');
      })
      .catch((error) => {
        console.log(error);
        alert('Sorry, Signup failed.');
      });
  };

  return (
    <div>
      <h1>회원가입페이지 폼수정예정^^</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="n_up" controlId="UserName">
          <FloatingLabel label="UserName" className="name_up">
            <Form.Control type="text" placeholder="ex)고양이귀여워" onChange={(e) => setUserName(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <br />
        <Form.Group className="i_up" controlId="Id">
          <FloatingLabel label="Email" className="id_up">
            <Form.Control type="email" placeholder="ex) ohmystack@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <br />
        <Form.Group className="p_up" controlId="Password">
          <FloatingLabel label="Password" className="password_up">
            <Form.Control type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
          </FloatingLabel>
          {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
        </Form.Group>
        <br />
        <Form.Group className="p_up" controlId="RePassword">
          <FloatingLabel label="Re-Password" className="password_up">
            <Form.Control type="password" placeholder="RePassword" onChange={(e) => setRePassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
        <br />
        <Form.Group className="n_up" controlId="PhoneNumber">
          <FloatingLabel label="PhoneNumber" className="number_up">
            <Form.Control type="number" className="updown" placeholder="010-1234-5678" onChange={(e) => handleNumberChange(e.target.value)} />
          </FloatingLabel>
          {numberError && <Form.Text className="text-danger">{numberError}</Form.Text>}
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          계정생성
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
