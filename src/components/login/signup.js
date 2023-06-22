import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../components/style/signup.css';

function Signup() {
  //회원가입 완료시 -> (/main)
  const navigate = useNavigate();
  //사용자 입력받는곳
  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userRePassword, setRePassword] = useState('');
  const [userNumber, setNumber] = useState('');
  // error msg
  const [passwordError, setPasswordError] = useState('');
  const [numberError, setNumberError] = useState('');

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

  // PhoneNumber 유효성검사
  const validateMobile = (number) => {
    const re = /^01([0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    return re.test(number);
  };

  // password error msg
  const handlePasswordChange = (password) => {
    setPassword(password);

    if (!validatePassword(password)) {
      setPasswordError('최소 8자 이상, 소문자, 숫자, 특수 문자(@$!%*?&#)');
    } else {
      setPasswordError('');
    }
  };

  // PhoneNumber error msg
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
    e.preventDefault();   // page 새로고침 X

    // Password 매칭 실패
    if (userPassword !== userRePassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    // Password 유효성 실패
    if (!validatePassword(userPassword)) {
      alert('유효한 비밀번호가 아닙니다');
      return;
    }

    // Email 유효성 실패
    if (!validateEmail(userEmail)) {
      alert('유효한 Email이 아닙니다');
      return;
    }

    // PhoneNumber 유효성 실패
    if (!validateMobile(userNumber)) {
      alert('유효한 번호가 아닙니다');
      return;
    }

    // 서버 데이터 형식이랑 일치하는지 확인해야함
    const data = {
      phoneNumber: userNumber,
      email: userEmail,
      password: userPassword,
      nickName: userName
    };

    // API받아오기
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
      <div className="form-box">
        <Form onSubmit={submitHandler}>
          <Form.Group className="n_up" controlId="UserName">
            <FloatingLabel label="UserName" className="name_up">
              <Form.Control type="text" className="nn" placeholder="ex)고양이귀여워" onChange={(e) => setUserName(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
          <br />
          <Form.Group className="i_up" controlId="Id">
            <FloatingLabel label="Email" className="id_up">
              <Form.Control type="email" className="ii" placeholder="ex) ohmystack@gmail.com" onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
          <br />
          <Form.Group className="p_up" controlId="Password">
            <FloatingLabel label="Password" className="password_up">
              <Form.Control type="password" className="pp" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
            </FloatingLabel>
            {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
          </Form.Group>
          <br />
          <Form.Group className="p_up" controlId="RePassword">
            <FloatingLabel label="Re-Password" className="password_up">
              <Form.Control type="password" className="pp" placeholder="RePassword" onChange={(e) => setRePassword(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
          <br />
          <Form.Group className="n_up" controlId="PhoneNumber">
            <FloatingLabel label="PhoneNumber" className="number_up">
              <Form.Control type="number" className="updown" placeholder="010-1234-5678" onChange={(e) => handleNumberChange(e.target.value)} />
            </FloatingLabel>
            {numberError && <Form.Text className="text-danger password-error">{numberError}</Form.Text>}
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" className='b_up'>
            계정생성
          </Button>
          <Link to="/signin">
            <Button variant="primary" type="submit" className='b2_up'>
              SNS계정으로 로그인하러 가기
            </Button>
          </Link>

        </Form>
      </div>
    </div>
  );
}

export default Signup;
