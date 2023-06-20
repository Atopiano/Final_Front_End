import React from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Header from '../../components/base/header';
import Footer from '../base/footer';
import '../../components/style/introduce.css';




function Introduce() {
  return (

    <>
      <Header />
      <div className="default-container">
        <div className="introduce-container">
          <div className='ex'>
            <p><strong style={{ color: 'blue' }}>*선택(권장)</strong></p>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>자기소개서를 입력해 주세요</h3>
            <h4 style={{ textAlign: 'center' }}>(협업 경험, 대회 및 공모전, 개인 경험 등)</h4>
            <p style={{ textAlign: 'center' }}>자기소개서를 입력하시면 추천정확도가 올라갑니다</p>
            <>
              <FloatingLabel controlId="floatingTextarea2" label="Introduce yourself">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }} />
              </FloatingLabel>
            </>
            <div className="button-container">
              <Button variant="light" className='next-button' as={Link} to="/result">다음</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}
export default Introduce;