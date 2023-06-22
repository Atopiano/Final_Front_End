import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import RecruitStackImg from './recruit_stack_img';
import '../../components/style/jobcard.css';

function JobCard({ title, position, inner_company, address, stack, site, career, main_business, preferences, qualification }) {
  const [isLiked, setIsLiked] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  function formatStack(stack) {
    const stackItems = stack.split(',');
    const formattedStackItems = stackItems.map(item => item.toLowerCase()); // 스택 항목을 소문자로 변환

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
  };

  const handleTitleClick = () => {
    setLgShow(true);
  };

  const handleSiteClick = () => {
    window.open(site, '_blank');
  };

  const handleCloseModal = () => {
    setLgShow(false);
  };

  return (
    <Card className="job-card custom-card">
      <Card.Header as="h2" onClick={handleTitleClick}>
        {title}
      </Card.Header>
      <Card.Body>
        <Card.Text className="position-company">
          <span className="inner-company">{inner_company}</span>
          <br />
          <span className="position">{position}</span>
          <br />
          {address}
          <br />
          <RecruitStackImg stack={formatStack(stack)} /> {/* 수정된 스택 전달 */}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
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
        <Button
          className="apply-button"
          variant="primary"
          onClick={handleSiteClick}
        >
          지원하기
        </Button>
      </Card.Footer>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
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
            <strong>주요 업무:</strong><br/> {main_business?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <p>
            <strong>기술 스택:</strong> {formatStack(stack).join(', ')} {/* 수정된 스택 출력 */}
          </p>
          <p>
            <strong>선호 사항:</strong><br/> {preferences?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <p>
            <strong>자격 요건:</strong><br/> {qualification?.split('\n').map((line, index) => (
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