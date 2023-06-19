import React from "react";
import './App.css';
import Main from './components/page/main';
import Home from './components/page/home';
import Notice from './components/ai_notice/notice';
import Signup from './components/login/signup';
import Login from './components/login/login';
import Stack from './components/ai_start/stack';
import Introduce from './components/ai_start/introduce';
import Result from './components/ai_start/result';
import Recommend from './components/ai_start/recommend.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/result" element={<Result />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
