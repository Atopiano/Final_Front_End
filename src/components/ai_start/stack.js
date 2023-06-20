import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import '../../components/style/stack.css';
import Footer from '../base/footer';
import StackList from '../base/stacklist';
import StackBox from '../base/stackbox';
import allStacks from '../../json_data/allstacks.json'; // JSON 파일을 가져옵니다.

function Stack() {
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredStacks, setFilteredStacks] = useState([]);

  const handleStackSelection = (stack) => {
    const isAlreadySelected = selectedStacks.some(
      (selectedStack) =>
        selectedStack.stack_name === stack.stack_name &&
        selectedStack.img_src === stack.img_src
    );

    if (isAlreadySelected) {
      setSelectedStacks(selectedStacks.filter((selectedStack) => (
        selectedStack.stack_name !== stack.stack_name ||
        selectedStack.img_src !== stack.img_src
      )));
    } else {
      setSelectedStacks([...selectedStacks, stack]);
      setTimeout(() => {
        const selectedStackBox = document.querySelector('.selected-stack-box');
        selectedStackBox.scrollLeft = selectedStackBox.scrollWidth;
      }, 0);
    }
    
  };

  useEffect(() => {
    const newFilteredStacks = allStacks.filter((stack) =>
      stack.stack_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredStacks(newFilteredStacks);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="default-container">
        <div className="stack-container">
          <br />
          <br />
          <h3>보유하신 기술 스택을 입력해주세요.</h3>
          <input
            type="text"
            className="input-box"
            placeholder="입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="selected-stack-box">
            {selectedStacks.map((stack, index) => (
              <StackBox key={index} stack={stack} handleStackSelection={handleStackSelection} />
            ))}
          </div>
          <br />
          <div className="custom-box">
            <StackList stacks={filteredStacks} handleStackSelection={handleStackSelection} />
          </div>
          <div className="button-container">
            <Button
              variant="light"
              as={Link}
              to="/introduce"
              className="next-button"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stack;
