import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import RecruitStackImg from './recruit_stack_img';
import '../../components/style/jobcard.css';

function JobCard({ title, position, inner_company, address, stack, site }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function formatStack(stack) {
    const stackItems = stack.split(',');
  
    return stackItems;
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(site)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('URL 복사 실패:', error);
      });
  };

  const handleTitleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Card className="job-card custom-card">
      <Card.Header as="h2" onClick={handleTitleClick}>{title}</Card.Header>
      <Card.Body>
        <Card.Text className="position-company">
          <span className="inner-company">{inner_company}</span><br />
          <span className="position">{position}</span><br />
          {address}<br />
          <RecruitStackImg stack={stack} />
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
          href={site}
          target="_blank"
          rel="noopener noreferrer"
        >
          지원하기
        </Button>
      </Card.Footer>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 모달 내용 */}
        </Modal.Body>
        <Modal.Footer>
          {/* 모달의 푸터 내용 */}
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default JobCard;
