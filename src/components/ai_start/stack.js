import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import '../../components/style/stack.css';
import Footer from '../base/footer';

function Stack() {
  return (
    <>
      <Header />  
      <div className="default-container">
        <div className="stack-container">
          <br /><br />
          <h3>보유하신 기술 스택을 입력해주세요.</h3>    
          <input type="text" className="input-box" placeholder="입력해주세요" /> {/* 입력창 추가 */}
          <div className="selected-stack-box"></div> {/* 선택된 스택 박스 추가 */}
          <br />
          <div className="custom-box"></div> {/* 새로운 박스 추가 */}
          <div className="button-container">
            <Button variant="light" as={Link} to="/introduce" className="next-button">다음</Button>
          </div>        
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stack;