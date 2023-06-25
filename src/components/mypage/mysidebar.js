import React, { useState } from 'react';
import '../../components/style/mysidebar.css';

function MySidebar() {
  const [isOpenResume, setIsOpenResume] = useState(false);
  const [isOpenSkills, setIsOpenSkills] = useState(false);
  const [isOpenIntroductions, setIsOpenIntroductions] = useState(false);

  const handleResumeClick = () => {
    setIsOpenResume(!isOpenResume);
  };

  const handleSkillsClick = () => {
    setIsOpenSkills(!isOpenSkills);
  };

  const handleIntroductionsClick = () => {
    setIsOpenIntroductions(!isOpenIntroductions);
  };

  return (
    <div className="mysidebar">
      <div style={{ marginTop: '10px', marginBottom: '40px', fontSize: '150%' }}>마이페이지</div>

      <div className="menu" onClick={handleResumeClick}>
        {isOpenResume ? '▼ 나의 이력서' : '▶ 나의 이력서'}
      </div>
      {isOpenResume && (
        <div className="submenu">
          <div>- 나의 기술 스택</div>
          <div>- 자기소개서 목록</div>
          <div>- 자기소개서 작성하기</div>
        </div>
      )}

      <div className="menu" onClick={handleSkillsClick}>
        {isOpenSkills ? '▼ 관심 공고' : '▶ 관심 공고'}
      </div>
      {isOpenSkills && (
        <div className="submenu">
          <div>- 좋아요한 공고</div>
        </div>
      )}

      <div className="menu" onClick={handleIntroductionsClick}>
        {isOpenIntroductions ? '▼ 자기소개서 목록' : '▶ 자기소개서 목록'}
      </div>
      {isOpenIntroductions && (
        <div className="submenu">
          <div>- 나의 회원 정보</div>
          <div>- 회원 정보 수정</div>
          <div>- 비밀번호 변경</div>
        </div>
      )}
    </div>
  );
}

export default MySidebar;
