import { useState, useEffect } from "react";

function ProgressBar({ width = 300 }) {
  let [play, setPlay] = useState(false);
  const [animateEl, setAnimateEl] = useState(null);
  const playText = play ? 'Pause' : 'Play';

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
      console.log('Progress Bar is finished');
      setPlay(false);
    }

    return () => {
      animEl ? animEl.cancel() : null;
      animEl ? setAnimateEl(null) : null;
    };
  }, []);

  useEffect(() => {
    console.log("useEffect: play: ", play);
    if (play) {
      animateEl ? animateEl.play() : null;
    } else {
      animateEl ? animateEl.pause() : null;
    }
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

  return (
    <>
      {renderBar()}
      <button onClick={handlePlayBtnClick}>{playText}</button>
    </>
  )
}

export default ProgressBar;