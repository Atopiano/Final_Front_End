import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ai() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSearch = () => {
    axios
      .get('http://52.78.242.29:8080/api/find-Email', { phoneNumber })
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="전화번호를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      <p>이메일: {email}</p>
    </div>
  );
};

export default Ai;
