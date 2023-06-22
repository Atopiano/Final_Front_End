import React from 'react';
import '../../components/style/stackbox.css';

const StackBox = ({ stack, handleStackSelection }) => {

  const handleBoxClick = () => {
      if (handleStackSelection) {
          handleStackSelection(stack);
      }
  };

  return (
      <div
          className="stack-box"
          onClick={handleBoxClick}
      >
          <img className="stack-img" src={stack.img_url} alt={stack.title} />
          <span className="stack-title">{stack.title}</span>
      </div>
  );
};


export default StackBox;
