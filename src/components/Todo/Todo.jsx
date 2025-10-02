import { useState, useEffect } from 'react';
import './todo.css';
import { getRandomStr, getLocalStorage, setLocalStorage } from '../../utils';

function Todo({ className }) {
  const [inputVal, setInputVal] = useState('');
  const [itemId, setItemId] = useState('');
  const [list, setList] = useState([]);
  const btnText = itemId ? 'Update' : 'Save';
  const STORAGE_KEY = 'todolist';

  // This hook will run only once after render
  useEffect(() => {
    let data = getLocalStorage(STORAGE_KEY) || [];
    setList(data);
  }, []);

  function handleCheckboxClick(inputId) {
    let clonedList = structuredClone(list);
    let item = clonedList.filter(({ id = "" }) => inputId === id)[0];

    item.isComplete = !item.isComplete;
    setList(clonedList);
    setLocalStorage(STORAGE_KEY, clonedList);
  }

  function renderList() {
    const itemList = list.map(({ id = "", val = "", isComplete = false }) => {
      const itemClassName = isComplete ? 'todo-item-desc t-strike' : 'todo-item-desc';

      return (
        <div className='mb-10 d-flex d-x-between d-y-center' key={id}>
          <input type='checkbox' className='input-check' onChange={() => handleCheckboxClick(id)} checked={isComplete} value="" />
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

  function editList(id) {
    if (!id) return;

    const itemVal = list.filter((item) => item.id === id)[0].val;
    setInputVal(itemVal);
    setItemId(id);
  }

  function deleteList(id) {
    if (!id) return;

    const itemVal = list.filter((item) => item.id === id)[0].val;
    const confirmText = `Are you sure you want to delete ${itemVal}`;

    if (!window.confirm(confirmText)) return;

    let currentList = structuredClone(list);
    currentList = currentList.filter((item) => item.id !== id);
    setList(currentList);
    setLocalStorage(STORAGE_KEY, currentList);
    setInputVal('');
    setItemId('');
  }

  function addItemToList() {
    const obj = {
      id: getRandomStr(),
      val: inputVal,
      isComplete: false
    };

    list.push(obj);
    setList(list);
  }

  function updateList() {
    const item = list.filter((item) => item.id === itemId)[0];

    item.val = inputVal;
  }

  function handleInputKeyPress(e) {
    if (e.key !== 'Enter') return;
    handleBtnClick();
  }

  function handleBtnClick() {
    if (!inputVal) return;
    console.log(inputVal);

    if (itemId) {
      updateList();
      setItemId('');
    } else {
      addItemToList();
    }

    setLocalStorage(STORAGE_KEY, list);
    setInputVal('');
    console.log("list: ", list);
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