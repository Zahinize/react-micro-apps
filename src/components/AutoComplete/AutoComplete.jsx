import { useState, useEffect, useRef } from "react";
import { Inbox } from "lucide-react";
import { debounce } from "../../utils";
import './autocomplete.css';

export default function AutoComplete() {
  const [inputVal, setInputVal] = useState('');
  const FRUITS_ARR = ["Kiwi 🥝", "Green Apple 🍏", "Red Apple 🍎", "Pear 🍐", 
    "Tangerine 🍊", "Lemon 🍋", "Banana 🍌", "Watermelon 🍉", "Grapes 🍇", "Strawberry 🍓",
    "BlueBerries 🫐", "Melon 🍈", "Cherries 🍒", "Peach 🍑", "Mango 🥭", "Pineapple 🍍"];
  const [fruits, setFruits] = useState(FRUITS_ARR);
  const debounceSearchRef = useRef(null);

  useEffect(() => {
    debounceSearchRef.current = debounce(searchFruits, 300);
  }, []);

  useEffect(() => {
    debounceSearchRef.current(inputVal);
  }, [inputVal]);

  function searchFruits(query = "") {
    query = query.toLowerCase();
    if (!query) {
      setFruits(FRUITS_ARR);
      return;
    }

    let filteredArr = fruits.filter((fruit) => fruit.toLowerCase().includes(query));
    setFruits(filteredArr);
  }

  function handleBtnClick(e) {
    console.log("Btn click: ", e.target);
  }

  function renderEmpty() {
    return (
      <div className="d-flex d-column d-x-center d-y-center">
        <Inbox className="mb-5" color="#888" size={36} />
        <span className="c-light fs-normal">Data not found.</span>
      </div>
    )
  }

  function renderFruits() {
    if (!fruits.length) return renderEmpty();

    return fruits.map((fruit, idx) => <span className="label mr-10 mb-10" key={idx}>{fruit}</span>);
  }

  return (
    <div className="">
      <div className='d-flex mb-20 input-group'>
        <input
        id="todo-input"
        placeholder='Search a fruit like apple'
        onChange={e => setInputVal(e.target.value)}
        type="text"
        value={inputVal}
        />
        <button className='fs-normal sm' onClick={handleBtnClick}>Search</button>
      </div>
      <div className="label-container mb-20">
        {renderFruits()}
      </div>
    </div>
  );
}