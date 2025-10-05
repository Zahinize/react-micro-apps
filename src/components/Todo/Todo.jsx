import { useState, useEffect, useRef } from 'react';
import './todo.css';
import { getRandomStr, getLocalStorage, setLocalStorage } from '../../utils';

function Todo({ className }) {
  let activeItemIdRef = useRef('');
  const [inputVal, setInputVal] = useState('');
  const [list, setList] = useState([]);
  const btnText = activeItemIdRef.current ? 'Update' : 'Save';
  const STORAGE_KEY = 'todolist';

  // This hook will set data in local storage when app has valid data
  useEffect(() => {
    if (!list.length) return;

    setLocalStorage(STORAGE_KEY, list);
  }, [list]);

  // This hook runs only once after initial render (componentDidMount equivalent)
  useEffect(() => {
    let data = getLocalStorage(STORAGE_KEY) || [];

    setList(data);
  }, []);

  function renderList() {
    const itemList = list.map(({ id = "", val = "", isComplete = false }) => {
      const itemClassName = isComplete ? 'todo-item-desc t-strike mr-10' : 'todo-item-desc mr-10';

      return (
        <div className='mb-10 d-flex d-x-between d-y-center' key={id}>
          <input type='checkbox' className='input-check mr-10' onChange={() => handleCheckboxClick(id)} checked={isComplete} value="" />
          <span className={itemClassName}>{val}</span>
          <div>
            <button onClick={() => editList(id)} className='btn mr-10'>Edit</button>
            <button onClick={() => deleteList(id)} className='btn'>Delete</button>
          </div>
        </div>
      )
    });

    return itemList;
  }

  /***** Business logic functions *****/
  function editList(id) {
    if (!id) return;

    const itemVal = list.filter((item) => item.id === id)[0].val;
    setInputVal(itemVal);
    activeItemIdRef.current = id;
  }
  function deleteList(id) {
    if (!id) return;

    const itemVal = list.filter((item) => item.id === id)[0].val;
    const confirmText = `Are you sure you want to delete ${itemVal}`;

    if (!window.confirm(confirmText)) return;

    let currentList = [...list].filter((item) => item.id !== id);
    setList(currentList);
    setInputVal('');
    activeItemIdRef.current = '';
  }
  function addItemToList() {
    const arr = [...list];

    arr.push({
      id: getRandomStr(),
      val: inputVal,
      isComplete: false
    });
    setList(arr);
  }
  function updateList() {
    const arr = [...list];
    const item = arr.filter((item) => item.id === activeItemIdRef.current)[0];

    item.val = inputVal;
    setList(arr);
  }

  /***** Handle UI events *****/
  function handleInputKeyPress(e) {
    if (e.key !== 'Enter') return;

    handleBtnClick();
  }
  function handleBtnClick() {
    if (!inputVal) return;

    if (activeItemIdRef.current) {
      updateList();
      activeItemIdRef.current = '';
    } else {
      addItemToList();
    }

    setInputVal('');
  }
  function handleCheckboxClick(inputId) {
    let clonedList = [...list];
    let item = clonedList.filter(({ id = "" }) => inputId === id)[0];

    item.isComplete = !item.isComplete;
    setList(clonedList);
    // setLocalStorage(STORAGE_KEY, clonedList);
  }

  return (
    <div className={className}>
      <div className='d-flex mb-20 input-group'>
        <input
          id="todo-input"
          placeholder='what do you want to do?'
          onKeyUp={handleInputKeyPress}
          onChange={e => setInputVal(e.target.value)}
          type="text"
          value={inputVal}
        />
        <button onClick={handleBtnClick}>{btnText}</button>
      </div>
      <div>
        {renderList()}
      </div>
    </div>
  )
}

export default Todo;