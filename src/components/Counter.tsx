import React from 'react';
import useCounter from '../hooks/useCounter';

const Counter: React.FC = () => {
  // const [count, setCount] = useState(0);

  // const increment = () => setCount(count + 1);

  // const decrement = () => setCount(count - 1);

  const { count, increment, decrement } = useCounter();

  return (
    <div className="flex flex-col min-w-28 items-center">
      <span className="text-xl">Count: {count}</span>
      <div className="flex flex-row justify-between w-full"> 
        <button className="btn btn-primary" onClick={increment}>+</button>
        <button className="btn btn-primary" onClick={decrement}>-</button>
      </div>
    </div>
  );
}

export default Counter;
