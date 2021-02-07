import React, { useState } from 'react';

const Glenn = () => {
  const [counter, setCounter] = useState(0);
  //added new comments
  //asghdhagsdjhg
  //Added one line 


  return (
    <>
      <h1>This is my homepage</h1>
      <div className="SimpleCounter">
        <h1>Im Your mother woon!</h1>
        <p>The counter is now at: {counter}</p>
        <button
          onClick={() => {
            setCounter((curr) => curr + 1);
          }}
        >
          Increment
      </button>
        <button
          onClick={() => {
            setCounter((curr) => curr - 1);
          }}
        >
          Decrement
      </button>
      </div>

    </>
  );
};

export default Glenn;
