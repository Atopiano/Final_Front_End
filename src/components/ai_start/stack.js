import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Stack() {
  return (
    
      <div>
        <h1>Stack</h1>                    
        <Button variant="light" as={Link} to="/introduce">Next</Button>
                     
      </div>

  );
}

export default Stack;