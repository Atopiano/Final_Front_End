import React from "react";
import './App.css';
import Main from './components/page/main';
import Home from './components/page/home';
import Notice from './components/ai_notice/recruit';
import Signup from './components/login/signup';
import Signin from './components/login/signin';
import Stack from './components/ai_start/stack';
import Introduce from './components/ai_start/introduce';
import Result from './components/ai_start/result';
import Recommend from './components/ai_start/recommend.js';
import Ai from "./components/ai_start/ai";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
