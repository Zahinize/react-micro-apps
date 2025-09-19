import { useState, useEffect } from "react";

function ProgressBar({ width = 300 }) {
  const [animateEl, setAnimateEl] = useState(null);
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
        duration: 5000,
        easing: "ease-in",
      }
    );

    animEl.pause();
    setAnimateEl(animEl);
    animEl.onfinish = function() {
      setPlay(false);
      setStatus(STATUS_FINISHED);
    }

    return () => {
      animEl ? animEl.cancel() : null;
      animEl ? setAnimateEl(null) : null;
    };
  }, []);

  useEffect(() => {
    if (!animateEl) return;
    if (!play) {
      animateEl.pause();
      (status !== STATUS_FINISHED) ? setStatus(STATUS_PAUSED) : null;
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
    }
    return (
      <div style={style} className="mb-20 progress-container">
        <div id="progress-bar" className="progress-bar"></div>
      </div>
    )
  }

  function renderStatus() {
    return (
      <p className="mt-0 mb-20">
        <strong>Status: </strong>
        <span>{status}</span>
      </p>
    )
  }

  return (
    <>
      {renderBar()}
      {renderStatus()}
      <button onClick={handlePlayBtnClick}>{playText}</button>
    </>
  )
}

export default ProgressBar;