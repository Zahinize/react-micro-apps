import { useState, useEffect } from "react";
import { formatTime, setMinMaxItems } from "./utils";

function Stopwatch() {
  const [play, setPlay] = useState(false);
  const playText = play ? 'Pause' : 'Play';
  let [timer, setTimer] = useState(0);
  let [lapArr, setLapArr] = useState([]);
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
        // console.log('lapArr: ', lapArr);
      }, 1000);

      setIntervalId(interval);
      if (!lapArr.length) {
        lapArr.push({
          timeStamp: Date.now(),
          seconds: 0,
          count: 0
        });
        setLapArr(lapArr);
      }
    }
  }, [play, intervalId]);

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
        {list}
      </div>
    ) : null;
  }
  
  function handleResetBtnClick() {
    setPlay(false);
    setTimer(0);
    setLapArr([]);
  }

  function handleLapBtnClick() {
    if (!lapArr.length) return;

    // console.log("Lap btn clicked!");
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
      <h3 className="mt-0 mb-20">{formatTime(timer)}</h3>
      {renderLapComponent()}
      <button className="alert mr-10" onClick={handleResetBtnClick}>Reset</button>
      <button className="outline mr-10" onClick={handleLapBtnClick}>Lap</button>
      <button onClick={() => setPlay(!play)}>{playText}</button>
    </>
  )
}

export default Stopwatch;