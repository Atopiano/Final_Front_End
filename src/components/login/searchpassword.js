import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../../components/style/searchpassword.css';
import Header from '../../components/base/header';
import axios from 'axios';


function SearchPassword() {



    return (
        <div>
            <Header />
            <div className="search_id">
                <div className="search_id-box">
                    <p style={{ fontSize: '30px', marginTop: '20px', marginBottom: '40px', marginRight: '155px', display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', textAlign: 'left' }}>로그인</p>
                </div>
            </div>
        </div>

    )
};

export default SearchPassword;