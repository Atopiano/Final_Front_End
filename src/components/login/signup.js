import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/base/header';
import '../../components/style/signup.css';

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRePassword, setUserRePassword] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // 이메일 주소 유효성 검사
  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(password);
  };

  // 휴대폰 번호 유효성 검사
  const validateMobile = (number) => {
    const re = /^01([0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    return re.test(number);
  };

  // 비밀번호 변경 시 호출되는 함수
  const handlePasswordChange = (password) => {
    setUserPassword(password);

    if (!validatePassword(password)) {
      setPasswordError('최소 8자 이상, 소문자, 숫자, 특수 문자(@$!%*?&#)');
    } else {
      setPasswordError('');
    }
  };

  // 휴대폰 번호 변경 시 호출되는 함수
  const handleNumberChange = (number) => {
    setUserNumber(number);

    if (!validateMobile(number)) {
      setNumberError('유효하지 않은 휴대폰 번호입니다.');
    } else {
      setNumberError('');
    }
  };

  // 이메일 주소 인증 요청
  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/api/verify-email', {
        email: userEmail
      });

      console.log(response.data);
      setVerificationSent(true);
      setSignupError('');
    } catch (error) {
      console.log(error);
      setSignupError('이메일 인증 요청에 실패했습니다.');
    }
  };

  // 이메일 인증 번호 확인
  const verifyEmailCode = () => {
    axios.post('/api/verify-email-code', {
      email: userEmail,
      code: verificationCode
    })
      .then(response => {
        console.log(response.data);
        alert('인증이 완료되었습니다.');
      })
      .catch(error => {
        console.log(error);
        setSignupError('인증에 실패했습니다.');
      });
  };

  // 회원가입 양식 제출 시 호출되는 함수
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
      <div className="sign_up">
        <div className="form-box">
          <p style={{ fontSize: '30px', marginTop: '-10px', marginRight: '155px', display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', textAlign: 'left' }}>회원가입</p>
          <Form onSubmit={submitHandler}>
            <Form.Group className="n_up" controlId="UserName">
              <FloatingLabel label="UserName" className="name_up">
                <Form.Control
                  type="text"
                  className="nn"
                  placeholder="ex)고양이귀여워"
                  style={{
                    background: 'rgba(255, 255, 255, 0.89)',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    width: '280px',
                    height: '50px',
                    marginBottom: '20px',
                    borderRadius: '40px'
                  }}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="i_up" controlId="Id">
              <div className="email-verification-container">
                <FloatingLabel label="Email" className="id_up">
                  <Form.Control
                    type="email"
                    className="ii"
                    placeholder="ex) ohmystack@gmail.com"
                    style={{
                      background: 'rgba(255, 255, 255, 0.89)',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      width: '195px',
                      height: '50px',
                      marginBottom: '20px',
                      borderRadius: '40px'
                    }}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </FloatingLabel>
                {!verificationSent && (
                  <Button variant="primary" onClick={sendVerificationCode} className='ebtn_up'>
                    인증
                  </Button>
                )}
              </div>
            </Form.Group>
            <Form.Group className="v_up" controlId="VerificationCode">
              <div className="code-verification-container">
                <FloatingLabel label="Email Code" className="verification_up">
                  <Form.Control
                    type="text"
                    className="vv"
                    placeholder="인증번호 입력"
                    style={{
                      background: 'rgba(255, 255, 255, 0.89)',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      width: '195px',
                      height: '50px',
                      marginBottom: '20px',
                      borderRadius: '40px'
                    }}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </FloatingLabel>
                {verificationSent && (
                  <Button variant="primary" onClick={verifyEmailCode} className='vbtn_up'>
                    인증확인
                  </Button>
                )}
              </div>
            </Form.Group>
            <Form.Group className="p_up" controlId="Password">
              <FloatingLabel label="Password" className="password_up">
                <Form.Control
                  type="password"
                  className="pp"
                  placeholder="Password"
                  style={{
                    background: 'rgba(255, 255, 255, 0.89)',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    width: '280px',
                    height: '50px',
                    marginBottom: '20px',
                    borderRadius: '40px'
                  }}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </FloatingLabel>
              {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
            </Form.Group>
            <Form.Group className="rep_up" controlId="RePassword">
              <FloatingLabel label="Re-Password" className="repassword_up">
                <Form.Control
                  type="password"
                  className="repp"
                  placeholder="RePassword"
                  style={{
                    background: 'rgba(255, 255, 255, 0.89)',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    width: '280px',
                    height: '50px',
                    marginBottom: '20px',
                    borderRadius: '40px'
                  }}
                  onChange={(e) => setUserRePassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="n_up" controlId="PhoneNumber">
              <FloatingLabel label="PhoneNumber" className="number_up">
                <Form.Control
                  type="number"
                  className="updown"
                  placeholder="010-1234-5678"
                  style={{
                    background: 'rgba(255, 255, 255, 0.89)',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '40px',
                    width: '280px',
                    height: '50px',
                    marginBottom: '20px'
                  }}
                  onChange={(e) => handleNumberChange(e.target.value)}
                />
              </FloatingLabel>
              {numberError && <Form.Text className="text-danger password-error">{numberError}</Form.Text>}
              {signupError && <p className="text-danger">{signupError}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" className='b_up'>
              계정생성
            </Button>
          </Form>
        </div>
      </div>
    </div>

  );
}

export default Signup;
