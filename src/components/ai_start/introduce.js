import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Header from '../../components/base/header';
import Footer from '../base/footer';
import '../../components/style/introduce.css';

function Introduce() {
  // 글자 수 제한
  const [value, setValue] = useState('');
  const maxCharacters = 1500;

  // 값 입력 시 max길이 정의
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setValue(inputValue);
    }
  };

 // 결과버튼 클릭 시 localstorage에 자소서 저장
 const handleSaveButtonClick = () => {
  localStorage.setItem('introduction', value);
 
  // 모델호출 or 입력전달 
};


  return (
    <>
      <Header />
      <div className="default-container">
        <div className="introduce-container">
          <div className="introduce-content" style={{ height: '560px' }}>
            <div className="ex">
              <p style={{ marginBottom: '0px' }}><strong style={{ color: 'blue' }}>*선택(권장)</strong></p>
              <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>자기소개서를 입력해 주세요</h3>
              <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>
                (협업 경험, 대회 및 공모전, 개인 경험 등)
              </p>
              <p style={{ textAlign: 'center', fontSize: '15px' }}>
                자기소개서를 입력하시면 추천정확도가 올라갑니다
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
                <Button className="result-button" variant="light" as={Link} to="/result" onChange={handleSaveButtonClick}>
                  결과보러가기
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
