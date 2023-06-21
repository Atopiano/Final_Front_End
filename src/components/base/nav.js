import React from "react";
import { useState } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../components/style/nav.css';
import logo from '../../components/img/ohmystack_logo1.jpg';



function NavComponent() {

    // isLoggedIn state 추가
    const [isLoggedIn, setIsLoggedIn] = useState(false);  

    return (
        <header>
            <div className="navbar-fixed">
                <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className="navbar bg-white">
                    <Container className="d-flex justify-content-between align-items-center">
                        <Nav className="mr-auto d-flex align-items-center">
                            <Nav.Link as={Link} to="/stack" className="my-link1" style={{ marginRight: '15px' }}>AI 추천</Nav.Link>
                            <Nav.Link as={Link} to="/recruit" className="my-link1" style={{ marginRight: '10px', marginLeft: '0px' }}>채용공고</Nav.Link>
                        </Nav>
                        <div className="navbar-logo">
                            <Navbar.Brand as={Link} to="/">
                                <img src={logo} alt="Oh My Stack!" className="logo" />
                            </Navbar.Brand>
                        </div>
                        <Nav className="ml-auto d-flex align-items-center">
                            {isLoggedIn ? (
                                <>
                                    <Nav.Link as={Link} to="/profile" className="my-link2" style={{ marginRight: '13px' }}>마이페이지</Nav.Link>
                                    <Nav.Link as={Link} to="/" className="my-link2" style={{ marginLeft: '15px' }} onClick={() => setIsLoggedIn(false)}>로그아웃</Nav.Link>
                                </>
                            ) : (  
                                <>
                                    <Nav.Link as={Link} to="/signup" className="my-link2" style={{ marginRight: '13px' }}>회원가입</Nav.Link>
                                    <Nav.Link as={Link} to="/signin" className="my-link2" style={{ marginLeft: '15px' }}>로그인</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </header>
    );
}

export default NavComponent;
