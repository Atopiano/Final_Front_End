import allRecruits from '../../json_data/total_stack.json';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import '../../components/style/stack.css';
import Footer from '../base/footer';
import StackList from '../base/stacklist';
import StackBox from '../base/stackbox';

function Stack() {
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredStacks, setFilteredStacks] = useState([]);
  const [allStacks, setAllStacks] = useState([]);

  const handleStackSelection = (stack) => {
    const isAlreadySelected = selectedStacks.some(
      (selectedStack) =>
        selectedStack.title === stack.title && selectedStack.url === stack.url
    );

    if (isAlreadySelected) {
      setSelectedStacks(
        selectedStacks.filter(
          (selectedStack) =>
            selectedStack.title !== stack.title ||
            selectedStack.url !== stack.url
        )
      );
    } else {
      setSelectedStacks([...selectedStacks, stack]);
      setTimeout(() => {
        const selectedStackBox = document.querySelector('.selected-stack-box');
        selectedStackBox.scrollLeft = selectedStackBox.scrollWidth;
      }, 0);
    }
  };

  useEffect(() => {
    // axios.get('/api/total_stack')
    //   .then(response => {
    //     setAllStacks(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching stack data:', error);
    //   });

    setAllStacks(allRecruits); // json 데이터로 대체
  }, []);

  useEffect(() => {
    const newFilteredStacks = allStacks.filter((stack) =>
      stack.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredStacks(newFilteredStacks);
  }, [inputValue, allStacks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="default-container">
        <div className="stack-container">
          <br />
          <p style={{ marginBottom: '0px' }}>
            <strong style={{ color: 'red' }}>*필수</strong>
          </p>
          <h3 className="stack-heading">보유하신 기술 스택을 입력해주세요.</h3>
          <input
            type="text"
            className="input-box"
            placeholder="입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="selected-stack-box">
            {selectedStacks.map((stack, index) => (
              <StackBox
                key={index}
                stack={stack}
                handleStackSelection={handleStackSelection}
              />
            ))}
          </div>
          <br />
          <div className="custom-box">
            <StackList
              stacks={filteredStacks}
              handleStackSelection={handleStackSelection}
            />
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
