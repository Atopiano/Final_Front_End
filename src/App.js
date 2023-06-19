import React from "react";
import './App.css';
import Main from './components/page/main';
import Home from './components/page/home';
import Notice from './components/ai_notice/notice';
import Signup from './components/login/signup';
import Login from './components/login/login';
import Ai from './components/ai_start/ai';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
