import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import RecruitStackImg from './recruit_stack_img';
import '../../components/style/jobcard.css';

function JobCard({ title, position, inner_company, address, stack, site, career, main_business, preferences, qualification, index }) {
  const [isLiked, setIsLiked] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [isRecruitTitleHovered, setIsRecruitTitleHovered] = useState(false);

  function formatStack(stack) {
    const stackItems = stack.split(',');
    const formattedStackItems = stackItems.map(item => item.toLowerCase());

    return formattedStackItems;
  }

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(site)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('URL 복사 실패:', error);
      });
  }

  const handleTitleClick = () => {
    setLgShow(true);
  }

  const handleSiteClick = () => {
    window.open(site, '_blank');
  }

  const handleCloseModal = () => {
    setLgShow(false);
  }

  const handleTitleHover = () => {
    setIsTitleHovered(!isTitleHovered);
  }

  const handleRecruitTitleHover = () => {
    setIsRecruitTitleHovered(!isRecruitTitleHovered);
  }

  const getCardClassName = () => {
    if (index !== undefined) {
      if (index <= 10) {
        return 'job-card dia';
      } else if (index <= 30) {
        return 'job-card gold';
      } else if (index <= 50) {
        return 'job-card silver';
      } else if (index <= 100) {
        return 'job-card bronze';
      } else {
        return 'job-card black';
      }
    }
  
    return 'job-card custom-card'; // index가 존재하지 않거나 지정된 범위를 벗어나는 경우 기본 클래스를 반환합니다.
  };

  return (
    <Card className={getCardClassName()}>
      <Card.Header
        as="h2"            
        onMouseLeave={handleRecruitTitleHover}
        onMouseEnter={handleRecruitTitleHover}
        onClick={handleTitleClick}
        style={{ color: isRecruitTitleHovered ? 'lightgray' : 'inherit' }}
      >
          {title}
      </Card.Header>
      <Card.Body>
        <div className="position-company">
          <span className="inner-company">{inner_company}</span>
          <br />
          <span className="position">{position}</span>
          <br />
          {address}
          <br />
          <RecruitStackImg stack={formatStack(stack)} />
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="apply-button">
          <span
            className={`apply-text ${isTitleHovered ? 'hovered' : ''}`}
            onClick={handleSiteClick}
            onMouseEnter={handleTitleHover}
            onMouseLeave={handleTitleHover}
          >
            지원하기
          </span>
        </div>
        <div className="action-buttons">
          <img
            className={`heart-icon ${isLiked ? 'liked' : ''}`}
            src={isLiked ? 'filled-like.svg' : 'empty-like.svg'}
            alt="하트 아이콘"
            onClick={() => setIsLiked(!isLiked)}
          />
          <img
            className="share-icon"
            src="share.svg"
            alt="공유 아이콘"
            onClick={handleCopyUrl}
          />
        </div>
      </Card.Footer>

      <Modal
        size="lg"
        show={lgShow}
        onHide={handleCloseModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>회사:</strong> {inner_company}
          </p>
          <p>
            <strong>직책:</strong> {position}
          </p>
          <p>
            <strong>사이트:</strong> <a href={site} target="_blank" rel="noopener noreferrer" onClick={handleSiteClick}>{site}</a>
          </p>
          <p>
            <strong>경력:</strong> {career}
          </p>
          <p>
            <strong>주소:</strong> {address}
          </p>
          <p>
            <strong>주요 업무:</strong>
            <br />
            {main_business?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <p>
            <strong>기술 스택:</strong> {formatStack(stack).join(', ')}
          </p>
          <p>
            <strong>선호 사항:</strong>
            <br />
            {preferences?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <p>
            <strong>자격 요건:</strong>
            <br />
            {qualification?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* 모달의 푸터 내용 */}
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default JobCard;
