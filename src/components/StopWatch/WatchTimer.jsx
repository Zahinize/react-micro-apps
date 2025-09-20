import { useState, useEffect } from "react";
import { formatTime } from "../../utils";

function WatchTimer({ play = false, reset = false, onUpdate }) {
  let [timer, setTimer] = useState(0);
  let [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!play) {
      intervalId ? clearInterval(intervalId) : null;
      setIntervalId(null);

      if (reset) {
        timer = 0;
        setTimer(0);
      }
      return;
    }

    if (!intervalId && play) {
      let interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);

      setIntervalId(interval);
    }

    return () => {
      /** Remove side effects when a component is unmounted. **/
      intervalId ? clearInterval(intervalId) : null;
      intervalId ? setIntervalId(null) : null;
    };
  }, [reset, play]);

  /** Note: The below useEffect() hook re-renders the parent <StopWatch /> component every time
   * the "timer" state of child <WatchTimer /> component is updated. If you remove this hook,
   * then the parent component will render when the "timer" setInterval() loop is paused or destroyed.
  **/
  useEffect(() => {
    onUpdate(timer);
  }, [timer, onUpdate]);

  return (
      <h3 className="mt-0 mb-20">{formatTime(timer)}</h3>
  )
}

export default WatchTimer;