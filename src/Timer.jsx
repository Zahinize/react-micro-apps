import { useState, useEffect } from "react";

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

  return (
    <>
      <h3>{timer}</h3>
      <button onClick={() => setPlay(!play)}>{playText}</button>
    </>
  )
}

export default Timer;