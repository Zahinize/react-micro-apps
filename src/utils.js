const padTime = (time) => {
    const result = time < 10 ? `0${time}` : String(time);
    return result;
};

const formatTime = (sec) => {
  sec = Number(sec);
  let mins = Math.floor(sec/60);
  mins = mins ? `${mins}m` : padTime(mins);
  let seconds = padTime(sec%60) + 's';
  const result = `${mins} : ${seconds}`;

  return result;
}

export { formatTime }