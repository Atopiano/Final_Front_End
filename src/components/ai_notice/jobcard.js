import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../components/style/jobcard.css';

function JobCard({ title, position, address, stack, site }) {
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
      <Card.Header as="h2">{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {position}<br />
          {address}<br />
          스택: {formattedStack} {/* 수정된 부분 */}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button className="apply-button" variant="primary" href={site} target="_blank" rel="noopener noreferrer">
          지원하기
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default JobCard;
