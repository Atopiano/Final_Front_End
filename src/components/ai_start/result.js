import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Result() {
  return (
    
      <div>
        <h1>recommend</h1>                    
        <Button variant="light" as={Link} to="/recommend">Next</Button>
                     
      </div>

  );
}

export default Result;