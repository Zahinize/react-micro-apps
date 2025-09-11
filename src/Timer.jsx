import { useState, useEffect } from "react";
import { formatTime } from "./utils";

function Timer() {
  const [play, setPlay] = useState(false);
  const playText = play ? 'Pause' : 'Play';
  let [timer, setTimer] = useState(0);
  let [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!play) {
      intervalId ? clearInterval(intervalId) : null;
      setIntervalId(null);
      return;
    }

    if (!intervalId && play) {
      let interval = setInterval(() => {
        timer = timer + 1;
        setTimer(timer);
      }, 1000);

      setIntervalId(interval);
    }
  }, [play, intervalId]);

  function handleResetBtnClick() {
    setPlay(false);
    setTimer(0);
  }

  return (
    <>
      <h3>{formatTime(timer)}</h3>
      <button className="mr-10" onClick={handleResetBtnClick}>Reset</button>
      <button onClick={() => setPlay(!play)}>{playText}</button>
    </>
  )
}

export default Timer;