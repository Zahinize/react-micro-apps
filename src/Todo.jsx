import { useState } from 'react';

function Todo({ className }) {
  const [inputVal, setInputVal] = useState('');
  const [itemId, setItemId] = useState('');
  const [list, setList] = useState([]);
  const inputStyle = {
    height: '35px',
    width: '200px'
  };
  const btnText = itemId ? 'Update' : 'Save';

  function renderList() {
    const itemList = list.map(({ id = "", val = "" }) => 
      <div className='mb-10 d-flex d-x-between d-y-center' key={id}>
        <span>{val}</span>
        <div>
          <button onClick={() => editList(id)} className='btn mr-10'>Edit</button>
          <button onClick={() => deleteList(id)} className='btn'>Delete</button>
        </div>
      </div>
    );

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
    setInputVal('');
    setItemId('');
  }

  function addItemToList() {
    const obj = {
      id: Math.random().toString(16).substring(3),
      val: inputVal
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

    setInputVal('');
    console.log("list: ", list);
  }

  return (
    <div className={className}>
      <div className='mb-20'>
        <input
          placeholder='what do you want to do?'
          onKeyUp={handleInputKeyPress}
          onChange={e => setInputVal(e.target.value)}
          style={inputStyle}
          type="text"
          value={inputVal}
        />
        <button onClick={handleBtnClick}>{btnText}</button>
      </div>
      <div className='mb-20'>
        {renderList()}
      </div>
    </div>
  )
}

export default Todo;