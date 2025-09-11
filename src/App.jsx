import { useState, useEffect, useDebugValue } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Todo from './Todo';
import Counter from './Counter';
import Card from './Card';
import Timer from './Timer';

function App() {

  return (
    <>
      <h1>
        React Micro Apps
      </h1>
      <div className='d-flex d-wrap d-y-start col-gap-20'>
        <Card heading='Counter'>
          <Counter />
        </Card>
        <Card heading="Todo">
          <Todo />
        </Card>
        <Card heading="Timer">
          <Timer />
        </Card>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
