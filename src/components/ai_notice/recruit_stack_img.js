import React, { useEffect, useState } from 'react';
import '../../components/style/recruit_stack_img.css';
import allStacks from '../../json_data/total_stack.json';

function RecruitStackImg({ stack }) {
  const [matchedRecruits, setMatchedRecruits] = useState([]);

  useEffect(() => {
    const filterRecruits = () => {
      const filteredRecruits = allStacks.filter((recruit) =>
        stack.includes(recruit.title)
      );
      setMatchedRecruits(filteredRecruits);
    };

    filterRecruits();
  }, [stack]);

  return (
    <div className="recruit-stack-img">
      {matchedRecruits.map((recruit) => (
        <img
          key={recruit.id}
          src={recruit.img_url}
          alt={recruit.title}
          className="stack-image"
          width="30"
          height="30"
          title={recruit.title}
        />
      ))}
    </div>
  );
}

export default RecruitStackImg;
