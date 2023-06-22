import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../components/style/jobcard.css';

function JobCard({ title, position, inner_company, address, stack, site }) {
  const [isLiked, setIsLiked] = useState(false);

  function formatStack(stack) {
    const stackItems = stack.split(',');
    const commaCount = stackItems.length;

    if (commaCount <= 4) {
      return stack;
    } else {
      const visibleStack = stackItems.slice(0, 4).join(', ');
      const hiddenStack = stackItems.slice(4).join(', ');

      return `${visibleStack}, ... +${commaCount - 4}`;
    }
  }

  const formattedStack = formatStack(stack);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(site)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('URL 복사 실패:', error);
      });
  };

  return (
    <Card className="job-card custom-card">
      <Card.Header as="h2">{title}</Card.Header>
      <Card.Body>
        <Card.Text className="position-company">
          <span className="inner-company">{inner_company}</span><br />
          <span className="position">{position}</span><br />
          {address}<br />
          스택: {formattedStack}
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
    </Card>
  );
}

export default JobCard;
