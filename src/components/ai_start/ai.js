import React, { useState } from 'react';
import Spinner from './spinner.svg';

const Ai = () => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      // 최소 3초 후에 다음 페이지로 넘어감
      window.location.href = '다음 페이지 URL';
    }, 3000);
  };

  return (
    <div>
      <div className={isLoading ? 'blur' : ''}>
        <h1>결과 보기</h1>
        <button onClick={handleClick}>결과 보기</button>
      </div>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-overlay"></div>
          <div className="loading-content">
            <p>로딩 중입니다.</p>
            <img src={Spinner} alt="로딩중" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ai;
