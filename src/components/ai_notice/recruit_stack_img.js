import React from 'react';
import allRecruits from '../../json_data/total_stack.json';
import '../../components/style/recruit_stack_img.css';

function RecruitStackImg({ stack }) {
  const matchedRecruits = allRecruits.filter((recruit) => stack.includes(recruit.title));

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
