import { useState, useEffect } from "react";
import { setMinMaxItems } from "../../utils";
import WatchTimer from "./WatchTimer";

function Stopwatch() {
  const [lapArr, setLapArr] = useState([]);
  let [reset, setReset] = useState(false);
  let [play, setPlay] = useState(false);
  let [count, setCount] = useState(0);
  const STATUS_PLAY = "Play";
  const STATUS_PAUSE = "Pause";
  const STATUS_RESUME = "Resume";
  const playText = getPlayText();

  /** Note: The sole purpose of this "handleChildUpdate" function is to establish an update connection
   * between parent (Stopwatch) component and child (WatchTimer) component as a callback.
   * The parent component will not re-render when a child component has an active side-effect (such as setInterval)
   * which will update its state repeatedly. To ensure the parent component gets updated everytime the child gets re-render,
   * we must send a state callback from parent to child and invoke it after the corresponding child state is updated.
  **/
  function handleChildUpdate(value) {
    setCount(value);
  }

  function getPlayText() {
    if (play) {
      return STATUS_PAUSE;
    } else if (!play && count) {
      return STATUS_RESUME;
    } else {
      return STATUS_PLAY;
    }
  }

  function renderLapComponent() {
    if (!lapArr.length) return;
    let arr = structuredClone(lapArr);

    // Remove the initial arr item
    arr.shift();
    if (!arr.length) return;
    arr = setMinMaxItems(arr);

    const list = arr.map(({ count, seconds, isMin = false, isMax = false }) => {
      const bgOdd = (count%2) ? `bg-primary` : '';
      const alertClass = isMax ? 'c-alert' : '';
      const successClass = isMin ? 'c-success' : '';

      return (
        <div key={count} className={`d-flex d-x-between p-5 mb-10 ${bgOdd} ${alertClass} ${successClass}`}>
          <span>Lap {count}</span>
          <strong>{seconds} sec</strong>
        </div>
      );
    });

    return arr.length ? (
      <div className="mb-20">
        <h4 className="d-flex mt-0 mb-20">Laps</h4>
        <div className="lap-container">
          {list}
        </div>
      </div>
    ) : null;
  }
  
  function handleResetBtnClick() {
    setPlay(false);
    setReset(true);
    setLapArr([]);
  }

  function handlePlayBtnClick() {
    setPlay(!play);
    setReset(false);

    if (!lapArr.length) {
      lapArr.push({
        timeStamp: Date.now(),
        seconds: 0,
        count: 0
      });
      setLapArr(lapArr);
    }
  }

  function handleLapBtnClick() {
    if (!lapArr.length) return;

    var lastLap = lapArr[lapArr.length - 1];
    var now = Date.now();
    var seconds = Number(((now - lastLap.timeStamp)/1000).toFixed(2));
    var lap = {
      timeStamp: now,
      seconds,
      count: lapArr.length
    };

    lapArr.push(lap);
    setLapArr(lapArr);
  }

  return ( 
    <>
      <WatchTimer
        play={play}
        reset={reset}
        onUpdate={handleChildUpdate}
      />
      {/* <h3 className="mt-0 mb-20">Parent component: {count}</h3> */}
      {renderLapComponent()}
      <button className="alert fs-normal mr-10" onClick={handleResetBtnClick}>Reset</button>
      <button className="outline fs-normal mr-10" onClick={handleLapBtnClick}>Lap</button>
      <button className="fs-normal" onClick={handlePlayBtnClick}>{playText}</button>
    </>
  )
}

export default Stopwatch;