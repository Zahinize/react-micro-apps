const padTime = (time) => time < 10 ? `0${time}` : String(time);
const formatMilliSec = (ms) => padTime(String(ms).substring(0, 2));

const formatTime = (sec) => {
  sec = Number(sec);
  let mins = Math.floor(sec/60);
  mins = mins ? `${mins}m` : padTime(mins);
  let seconds = padTime(sec%60) + 's';

  return `${mins} : ${seconds}`;
};

const setMinMaxItems = (arr) => {
  if (arr.length < 2) return arr;

  arr.sort((a, b) => a.seconds - b.seconds);
  // Set min and max flags to first and last items
  arr[0].isMin = true;
  arr[arr.length - 1].isMax = true;
  return arr;
};

const getRandomStr = () => Math.random().toString(16).substring(3);
const setLocalStorage = (name, val) => localStorage.setItem(name, JSON.stringify(val));
const getLocalStorage = (name) => JSON.parse(localStorage.getItem(name));

export { formatTime, formatMilliSec, setMinMaxItems, getRandomStr, setLocalStorage, getLocalStorage };
