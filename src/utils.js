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

const setMinMaxItems = (arr) => {
  if (arr.length < 2) return arr;

  let items = arr.map(({ seconds }) => seconds);
  let min = Math.min.apply(null, items);
  let max = Math.max.apply(null, items);
  let minItem = arr.filter(({ seconds }) => seconds === min)[0];
  let maxItem = arr.filter(({ seconds }) => seconds === max)[0];

  minItem.isMin = true;
  maxItem.isMax = true;
  return arr;
}

export { formatTime, setMinMaxItems }