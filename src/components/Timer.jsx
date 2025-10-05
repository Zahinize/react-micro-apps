import { useState, useEffect, useRef } from "react";
import { formatTime, formatMilliSec } from "../utils";

function Timer() {
  const [elapsed, setElapsed] = useState(0); // total ms
  const [play, setPlay] = useState(false);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const offsetRef = useRef(0); // time carried over when paused

  useEffect(() => {
    if (!play) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      return;
    }

    const tick = (timestamp) => {
      if (!startRef.current) {
        startRef.current = timestamp; // first frame baseline
      }

      const diff = timestamp - startRef.current + offsetRef.current;
      setElapsed(diff);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [play]);

  function handleResetBtnClick() {
    setPlay(false);
    setElapsed(0);
    offsetRef.current = 0;
    startRef.current = null;
  }

  function handleTogglePlay() {
    if (play) {
      // Pause
      setPlay(false);
      offsetRef.current = elapsed; // keep current time
    } else {
      // Resume
      setPlay(true);
    }
  }

  const seconds = Math.floor(elapsed / 1000);
  const millisec = elapsed % 1000;

  return (
    <>
      <h3 className="mb-20">
        <span>{formatTime(seconds)}</span>
        <span> : </span>
        <span style={{ width: "52px", display: "inline-block" }}>
          {formatMilliSec(millisec)}ms
        </span>
      </h3>
      <button className="alert fs-normal mr-10" onClick={handleResetBtnClick}>
        Reset
      </button>
      <button className="fs-normal" onClick={handleTogglePlay}>
        {play ? "Pause" : "Play"}
      </button>
    </>
  );
}

export default Timer;
