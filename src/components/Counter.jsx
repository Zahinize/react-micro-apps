import { useState } from "react";

function Counter({ className }) {
  const [count, setCount] = useState(0);

  function handleBtnClick() {
    setCount(count + 1);
  }

  return (
    <div className={className}>
      <button className="fs-normal" onClick={handleBtnClick}>Count me: {count}</button>
    </div>
  )
}

export default Counter;