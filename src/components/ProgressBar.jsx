import { useState, useEffect } from "react";

function ProgressBar({ width = 300 }) {
  const [animateEl, setAnimateEl] = useState(null);
  const [duration, setDuration] = useState(5);
  const [play, setPlay] = useState(false);
  const playText = play ? 'Pause' : 'Play';
  const STATUS_REST = "At rest";
  const STATUS_RUNNING = "Running...";
  const STATUS_PAUSED = "Paused";
  const STATUS_FINISHED = "Finished";
  const [status, setStatus] = useState(STATUS_REST);

  useEffect(() => {
    const barEl = document.getElementById('progress-bar');
    const barWidth = barEl.parentElement.offsetWidth;
    let animEl = barEl.animate(
      [
        { width: "0" },
        { width: barWidth + "px" }
      ],
      {
        duration: (duration*1000),
        easing: "ease-in",
      }
    );

    animEl.pause();
    setAnimateEl(animEl);
    animEl.onfinish = function() {
      setPlay(false);
      setStatus(STATUS_FINISHED);
    }
    // Reset play button for better UX
    setPlay(false);

    return () => {
      animEl ? animEl.cancel() : null;
      animEl ? setAnimateEl(null) : null;
    };
  }, [duration]);

  useEffect(() => {
    if (!animateEl) return;
    if (!play) {
      animateEl.pause();
      if (!animateEl?.currentTime) {
        setStatus(STATUS_REST);
      } else if (status !== STATUS_FINISHED) {
        setStatus(STATUS_PAUSED);
      }
      return;
    }

    animateEl.play();
    setStatus(STATUS_RUNNING);
  }, [play]);

  function handlePlayBtnClick() {
    setPlay(!play);
  }

  function renderBar() {
    const style = {
      width: `${width}px`
    };

    return (
      <div style={style} className="mb-20 progress-container">
        <div id="progress-bar" className="progress-bar"></div>
      </div>
    )
  }

  function renderStatus() {
    return (
      <p className="mb-20 d-flex d-y-center">
        <strong className="mr-5">Status: </strong>
        <span>{status}</span>
      </p>
    )
  }

  function renderSettings() {
    return (
      <div className="mb-20 d-flex d-y-center">
        <strong className="mr-5">Duration: </strong>
        <select
          id="duration"
          className="dropdown"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        >
          <option value={5}>5s</option>
          <option value={10}>10s</option>
          <option value={15}>15s</option>
          <option value={20}>20s</option>
        </select>
      </div>
    )
  }

  return (
    <>
      {renderBar()}
      {renderStatus()}
      {renderSettings()}
      <button className="fs-normal" onClick={handlePlayBtnClick}>{playText}</button>
    </>
  )
}

export default ProgressBar;