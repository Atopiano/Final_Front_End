import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../../components/style/searchpassword.css';
import Header from '../../components/base/header';
import axios from 'axios';

function SearchPassword() {
    // 상태 변수
    const [userNumber, setUserNumber] = useState(''); // 사용자 전화번호 상태
    const [userId, setUserId] = useState(''); // 사용자 이메일 상태
    const [token, setToken] = useState(''); // 비밀번호 재설정을 위해 받은 토큰 상태
    const [newPassword, setNewPassword] = useState(''); // 새 비밀번호 상태
    const navigate = useNavigate(); // React Router의 navigate 함수

    // 인증 코드가 포함된 이메일 전송 함수
    const sendEmail = () => {
        const data = {
            phoneNumber: userNumber,
            email: userId
        };

        axios
            .post('https://api.ohmystack.co/api/find-password', data)
            .then(response => {
                console.log('인증메일이 전송되었습니다: ', response.data);
                alert('인증메일이 전송되었습니다. 이메일을 확인해주세요.');
            })
            .catch(error => {
                console.error(error);
            });
    };

    // 받은 토큰의 유효성을 검증하는 함수
    const validateToken = () => {
        const data = {
            token: token
        };

        axios
            .post('https://api.ohmystack.co/api/validate-token', data)
            .then(response => {
                console.log('토큰 인증이 완료되었습니다: ', response.data);
                alert('토큰 인증이 완료되었습니다. 이제 비밀번호를 변경해주세요.');
                resetPassword();
            })
            .catch(error => {
                console.error(error);
            });
    };

    // 비밀번호 재설정 함수
    const resetPassword = () => {
        const data = {
            token: token,
            newPassword: newPassword
        };

        axios
            .put('https://api.ohmystack.co/api/reset-password', data)
            .then(response => {
                console.log('비밀번호가 성공적으로 변경되었습니다: ', response.data);
                alert('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.');
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
            });
    };

    // 토큰 입력 변경 핸들러
    const handleCodeChange = e => {
        setToken(e.target.value);
    };

    // 새 비밀번호 입력 변경 핸들러
    const handlePasswordChange = e => {
        setNewPassword(e.target.value);
    };

    // 토큰과 새 비밀번호에 기반하여 로그인 처리하는 함수
    const loginHandler = () => {
        if (token && newPassword) {
            // 토큰과 새 비밀번호가 모두 제공되었을 경우, 토큰 검증
            validateToken();
        } else {
            // 그렇지 않은 경우, 인증 코드가 포함된 이메일 전송
            sendEmail();
        }
    };

    return (
        <div>
            <Header /> {/* 헤더 컴포넌트 렌더링 */}
            <div className="search_password">
                <div className="search_password-box">
                    <p
                        style={{
                            fontSize: '30px',
                            marginTop: '20px',
                            marginBottom: '40px',
                            marginRight: '155px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}
                    >
                        비밀번호 찾기
                    </p>
                    {!token ? ( // 토큰이 설정되지 않은 경우, 전화번호와 이메일 입력란 렌더링
                        <React.Fragment>
                            <FloatingLabel controlId="numpass" label="PhoneNumber" className="numpass">
                                <Form.Control
                                    type="number"
                                    className="pass_number"
                                    placeholder="010-1234-5678"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.89)',
                                        border: '2px solid #FFFFFF',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        width: '280px',
                                        height: '50px',
                                        marginBottom: '20px',
                                        borderRadius: '40px'
                                    }}
                                    value={userNumber}
                                    onChange={e => setUserNumber(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="spass" label="Email" className="emailpass">
                                <Form.Control
                                    className="pass_email"
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
                                    onChange={e => setUserId(e.target.value)}
                                />
                            </FloatingLabel>
                        </React.Fragment>
                    ) : ( // 토큰이 설정된 경우, 토큰과 새 비밀번호 입력란 렌더링
                        <React.Fragment>
                            <FloatingLabel controlId="token" label="인증 코드" className="token">
                                <Form.Control
                                    type="text"
                                    className="token_input"
                                    placeholder="인증 코드를 입력하세요"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.89)',
                                        border: '2px solid #FFFFFF',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        width: '280px',
                                        height: '50px',
                                        marginBottom: '20px',
                                        borderRadius: '40px'
                                    }}
                                    value={token}
                                    onChange={handleCodeChange}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="newPassword" label="새 비밀번호" className="newPassword">
                                <Form.Control
                                    type="password"
                                    className="new_password"
                                    placeholder="새로운 비밀번호를 입력하세요"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.89)',
                                        border: '2px solid #FFFFFF',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        width: '280px',
                                        height: '50px',
                                        marginBottom: '20px',
                                        borderRadius: '40px'
                                    }}
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </FloatingLabel>
                        </React.Fragment>
                    )}
                    <Button className="psword_gotochange" onClick={loginHandler}>
                        {!token ? '비밀번호 변경' : '비밀번호 재설정'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchPassword;
