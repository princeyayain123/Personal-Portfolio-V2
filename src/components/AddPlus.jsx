import { useState, useEffect } from 'react';

const AddPlus = () => {
  const [num, setNum] = useState(0);
  const addNum = () => {
    setNum(num + 1);
  };

  const minusNum = () => {
    setNum(num - 1);
  };

  return (
    <div>
      <p>{num}</p>
      <button onClick={addNum}>+</button>
      <button onClick={minusNum}>-</button>
    </div>
  );
};

export default AddPlus;
