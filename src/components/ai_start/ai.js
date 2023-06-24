import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ai() {
  const [randomImageUrl, setRandomImageUrl] = useState('');

  useEffect(() => {
    const getRandomImage = async () => {
      try {
        const response = await axios.get('https://picsum.photos/200/300'); // 이미지 크기 조정 가능
        const imageUrl = response.request.responseURL;
        setRandomImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    getRandomImage();
  }, []);

  return (
    <div>
      {randomImageUrl && <img src={randomImageUrl} alt="Random Image" />}
    </div>
  );
}

export default Ai;
