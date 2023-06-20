import React from 'react';
import StackBox from './stackbox';

const StackList = ({ handleStackSelection, stacks }) => {
    // 기존에 하드코딩되어 있던 stacks 배열을 제거하고,
    // stacks를 prop으로 받아옵니다.
  
    return (
        <div>
            {stacks.map((stack, index) => (
                <StackBox key={index} stack={stack} handleStackSelection={handleStackSelection} />
            ))}
        </div>
    );
};

export default StackList;
