import React from 'react';
import '../../components/style/stackbox.css';

const StackBox = ({ stack, handleStackSelection, isSelected }) => {
  const handleBoxClick = () => {
    if (handleStackSelection) {
      handleStackSelection(stack);
    }
  };

  const boxClassName = isSelected ? 'stack-box selected' : 'stack-box';
  const titleClassName = isSelected ? 'stack-title selected' : 'stack-title';

  return (
    <div className={boxClassName} onClick={handleBoxClick}>
      <img className="stack-img" src={stack.img_url} alt={stack.title} />
      <span className={titleClassName}>{stack.title}</span>
    </div>
  );
};

export default StackBox;
