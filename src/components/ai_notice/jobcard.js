import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../components/style/jobcard.css';

function JobCard({ title, position, address, stack, site }) {
  // stack을 표시할 때 다섯 번째 쉼표부터는 "..."으로 보여주고, 남은 쉼표 개수를 "+숫자"로 표시하는 함수
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

  return (
    <Card className="job-card custom-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {position}<br />
          {address}<br />
          {formattedStack}
        </Card.Text>
        <Button variant="primary" href={site} target="_blank" rel="noopener noreferrer">지원하기</Button>
      </Card.Body>
    </Card>
  );  
}

export default JobCard;

