import React from 'react';
import Button from 'react-bootstrap/Button';
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
            <p><strong>*선택(권장)</strong></p>
            <h3>자기소개서를 입력해 주세요</h3>
            <h4>(협업 경험, 대회 및 공모전, 개인 경험 등)</h4>
            <p>자기소개서를 입력하시면 추천정확도가 올라갑니다</p>
          </div>
          <div>
            <input type="text" className="introduce-ai" placeholder="입력창" />
          </div>
          <Button variant="light" as={Link} to="/result">Next</Button>
        </div>
      </div>
      <Footer />
    </>

  );
}
export default Introduce;