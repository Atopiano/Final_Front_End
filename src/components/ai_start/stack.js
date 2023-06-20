import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../base/header';
import '../../components/style/stack.css';
import Footer from '../base/footer';
import StackList from '../base/stacklist';
import StackBox from '../base/stackbox';

function Stack() {
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [inputValue, setInputValue] = useState(''); // 사용자가 입력한 값을 저장할 state
  const [filteredStacks, setFilteredStacks] = useState([]); // 필터링된 스택을 저장할 state

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
      const selectedStackBox = document.querySelector('.selected-stack-box');
      selectedStackBox.scrollLeft = selectedStackBox.scrollWidth;
    }
  };

  // StackList에 전달될 전체 스택 데이터. 예시로 임시 데이터를 사용하였습니다.
  const allStacks = [
    {
      stack_name: 'java',
      img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/java.png'
    },
    {
        stack_name: 'javascript',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/javascript.png'
    },
    {
        stack_name: 'jquery',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/jquery.png'
    },
    {
        stack_name: 'postgresql',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/postgresql.png'
    },
    {
        stack_name: 'mysql',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/mysql.png'
    },
    {
        stack_name: 'spring',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/spring.png'
    },
    {
        stack_name: 'linux',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/linux.png'
    },
    {
        stack_name: 'node.js',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/node.js.png'
    },
    {
        stack_name: 'python',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/python.png'
    },
    {
        stack_name: 'c++',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/c%2B%2B.png'
    },
    {
        stack_name: 'go',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/go.png'
    },
    {
        stack_name: 'c#',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/c%23.png'
    },
    {
        stack_name: 'reactnative',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/reactnative.png'
    },
    {
        stack_name: 'typescript',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/typescript.png'
    },
    {
        stack_name: 'nestjs',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/nestjs.png'
    },
    {
        stack_name: 'firebase',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/firebase.png'
    },
    {
        stack_name: 'redis',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/redis.png'
    },
    {
        stack_name: 'springdatajpa',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/nostack.png'
    },
    {
        stack_name: 'javascript',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/javascript.png'
    },
    {
        stack_name: 'jquery',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/jquery.png'
    },
    {
        stack_name: 'postgresql',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/postgresql.png'
    },
    {
        stack_name: 'mysql',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/mysql.png'
    },
    {
        stack_name: 'spring',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/spring.png'
    },
    {
        stack_name: 'linux',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/linux.png'
    },
    {
        stack_name: 'node.js',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/node.js.png'
    },
    {
        stack_name: 'python',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/python.png'
    },
    {
        stack_name: 'c++',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/c%2B%2B.png'
    },
    {
        stack_name: 'go',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/go.png'
    },
    {
        stack_name: 'c#',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/c%23.png'
    },
    {
        stack_name: 'reactnative',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/reactnative.png'
    },
    {
        stack_name: 'typescript',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/typescript.png'
    },
    {
        stack_name: 'nestjs',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/nestjs.png'
    },
    {
        stack_name: 'firebase',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/firebase.png'
    },
    {
        stack_name: 'redis',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/redis.png'
    },
    {
        stack_name: 'springdatajpa',
        img_src: 'https://oh-my-stack.s3.ap-northeast-2.amazonaws.com/stackimages/nostack.png'
    }
  ];

  // 입력받는 값이 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // 사용자가 입력한 값이 포함되는 스택만 필터링
    const newFilteredStacks = allStacks.filter(stack =>
      stack.stack_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredStacks(newFilteredStacks);
  }, [inputValue, allStacks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력받는 값이 변경되면 state를 업데이트
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
            onChange={handleInputChange} // 입력받는 값이 변경되면 실행할 핸들러
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
