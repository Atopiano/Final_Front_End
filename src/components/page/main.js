import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../../components/style/main.css';
import Header from '../../components/base/header';
import Footer from '../../components/base/footer';
import { colors } from "@mui/material";

const Main = () => {
    return (
        <>
            <Header />
            <div className="default-container">
                <div className="image-container">
                    <div className="text-container">
                        <h3 className="text1 adjustable-font-size">
                            <strong style={{ color: '#bb44e4'}}>IT Tech Stack</strong> 기반 추천 서비스입니다.
                        </h3>
                        <h3 className="text2 adjustable-font-size">
                            나의 <strong style={{ color: '#bb44e4'}}>Tech Stack</strong>에 맞는 채용공고를 추천 받아보세요<strong>!</strong>
                        </h3><br></br>
                        <h3 className="text2 adjustable-font-size">
                            현재 AI 기능은 중단되어 있고 테스트 화면만 제공해드립니다.
                        </h3>
                        <p className="text3">
                            {/* <span className="signup-link"><Link to="/signup" style={{ color: '#bb44e4' }}>회원가입</Link></span>을 하면 추가 입력 없이 바로 추천 결과를 보여드립니다. */}
                        </p>
                        <div className="button-container">
                            <Button variant="light" as={Link} to="/stack" className="custom-button">AI Start</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Main;