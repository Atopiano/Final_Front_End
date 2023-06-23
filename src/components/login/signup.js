import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/base/header';
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
  const [signupError, setSignupError] = useState('');

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
      setPasswordError('최소 8자 이상, 소문자, 숫자, 특수 문자(@$!%*?&#)');
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (userPassword !== userRePassword) {
      setSignupError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validatePassword(userPassword)) {
      setSignupError('유효한 비밀번호가 아닙니다.');
      return;
    }

    if (!validateEmail(userEmail)) {
      setSignupError('유효한 이메일이 아닙니다.');
      return;
    }

    if (!validateMobile(userNumber)) {
      setSignupError('유효한 번호가 아닙니다.');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        phoneNumber: userNumber,
        email: userEmail,
        password: userPassword,
        nickName: userName
      });

      console.log(response.data);
      alert('Happy Coding Day!');
      navigate('/');
    } catch (error) {
      console.log(error);
      setSignupError('죄송합니다. 회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
      <Header />
      <div className="form-box">
        <Form onSubmit={submitHandler} className="form-container">
          <Form.Group controlId="UserName" className="n_up floating-label">
            <FloatingLabel label="UserName" className="name_up">
              <Form.Control
                type="text"
                className="nn"
                placeholder="ex) 고양이귀여워"
                onChange={(e) => setUserName(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="Email" className="i_up floating-label">
            <FloatingLabel label="Email" className="id_up">
              <Form.Control
                type="email"
                className="ii"
                placeholder="ex) ohmystack@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="p_up">
            <FloatingLabel label="Password" className="password_up">
              <Form.Control
                type="password"
                className="pp"
                placeholder="Password"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </FloatingLabel>
            <div className="error-message">{passwordError || '\u00A0'}</div>

            <FloatingLabel label="Re-Password" className="repassword_up">
              <Form.Control
                type="password"
                className="repp"
                placeholder="RePassword"
                onChange={(e) => setRePassword(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel label="PhoneNumber" className="password_up">
              <Form.Control
                type="number"
                className="pp"
                placeholder="010-1234-5678"
                onChange={(e) => handleNumberChange(e.target.value)}
              />
            </FloatingLabel>
            <div className="error-message">{numberError || '\u00A0'}</div>
          </Form.Group>
          {signupError && (
            <div className="error-message alert-danger">{signupError}</div>
          )}
          <Button variant="primary" type="submit" className='upbtn'>
            계정생성
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
