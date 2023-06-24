import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../../components/style/searchid.css';
import Header from '../../components/base/header';
import axios from 'axios';

function SearchId() {
    const navigate = useNavigate();
    const [userNumber, setUserNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');


    const emailSearchHandler = () => {
        axios
            .get(`/api/find-Email?PhoneNumber=${userNumber}`)
            .then((response) => {
                const email = response.data.email;
                setUserEmail(email);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const goToLoginPage = () => {
        navigate('/signin');
    };

    return (
        <div>
            <Header />
            <div className="search_id">
                <div className="search_id-box">
                    <p style={{ fontSize: '30px', marginTop: '20px', marginBottom: '40px', marginRight: '155px', display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', textAlign: 'left' }}>이메일 찾기</p>
                    <FloatingLabel controlId="searchid" label="PhoneNumber" className="sid">
                        <Form.Control
                            type="number"
                            className="input_Number"
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
                            onChange={(e) => setUserNumber(e.target.value)} />
                    </FloatingLabel>
                    <Button className="searchid-button" onClick={emailSearchHandler}>이메일 찾기</Button>
                    {userEmail && (
                        <div>
                            <FloatingLabel controlId="EmailResult" className="email-result">
                                <Form.Control
                                    type="text"
                                    value={userEmail}
                                    readOnly
                                />
                            </FloatingLabel>
                            <Button className="gotolog" onClick={goToLoginPage}>로그인하러 가기</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchId;
