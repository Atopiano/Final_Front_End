import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Header from '../../components/base/header';
import Footer from '../base/footer';
import '../../components/style/introduce.css';
import Spinner from './spinner.svg';

function Introduce() {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const maxCharacters = 1500;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setValue(inputValue);
    }
  };

  const handleSaveButtonClick = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('introduction', value);
      setLoading(false);
      window.location.href = '/result';
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className={`default-container ${isLoading ? 'blur' : ''}`}>
        {isLoading && (
          <div className="loading-container">
            <div className="loading-overlay"></div>
            <div className="loading-content">
              <img src={Spinner} alt="로딩중" />
              <span style={{fontSize: '25px'}}>로딩 중입니다.</span>
            </div>
          </div>
        )}
        <div className="introduce-container">
          <div className="introduce-content" style={{ height: '560px' }}>
            <div className="ex">
              <p style={{ marginBottom: '0px' }}>
                <strong style={{ color: 'blue' }}>*선택(권장)</strong>
              </p>
              <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>자기소개서를 입력해 주세요</h3>
              <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>
                (협업 경험, 대회 및 공모전, 개인 경험 등)
              </p>
              <p style={{ textAlign: 'center', fontSize: '15px' }}>
                자기소개서를 입력하시면 추천 정확도가 올라갑니다
              </p>
              <FloatingLabel
                controlId="floatingTextarea2"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Introduce yourself"
                  style={{
                    resize: 'none',
                    backgroundColor: 'rgba(187, 68, 228, 0.16)',
                    width: '566.07px',
                    height: '275.87px',
                    color: 'black'
                  }}
                  maxLength={maxCharacters}
                  value={value}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p style={{ display: 'inline-block', marginRight: '150px', textAlign: 'left' }}>
                  최소 500자 이상 입력해주세요.
                </p>
                <p style={{ display: 'inline-block', textAlign: 'right', marginLeft: '140px' }}>
                  {value.length}/{maxCharacters}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', textsize: 'auto' }}>
                <Button className="previous-button" variant="light" as={Link} to="/stack">
                  이전
                </Button>
                <Button
                  className="result-button"
                  variant="light"
                  disabled={isLoading}
                  onClick={handleSaveButtonClick}
                >
                  {isLoading ? '로딩 중...' : '결과 보러 가기'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Introduce;
