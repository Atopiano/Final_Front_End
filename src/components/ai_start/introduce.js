import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Introduce() {
  return (
    
      <div>
        <h1>Introduce</h1>                    
        <Button variant="light" as={Link} to="/result">Next</Button>
                     
      </div>

  );
}

export default Introduce;