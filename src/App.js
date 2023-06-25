import React from "react";
import './App.css';
import Main from './components/page/main';
import Home from './components/page/home';
import Notice from './components/ai_notice/recruit';
import Signup from './components/login/signup';
import Signin from './components/login/signin';
import SearchId from './components/login/searchid';
import SearchPassword from './components/login/searchpassword';
import Stack from './components/ai_start/stack';
import Introduce from './components/ai_start/introduce';
import Result from './components/ai_start/result';
import Recommend from './components/ai_start/recommend.js';
import Ai from "./components/ai_start/ai";
import Mystack from "./components/mypage/mystack";
import IntroduceList from "./components/mypage/introduce_list";
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
          <Route path="/recruit" element={<Notice />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/searchid" element={<SearchId />} />
          <Route path="/searchpassword" element={<SearchPassword />} />
          <Route path="/mypage/mystack" element={<Mystack />} />
          <Route path="/mypage/introduce_list" element={<Mystack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
