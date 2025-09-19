import { useState, useEffect, useDebugValue } from 'react'
import reactLogo from './assets/react.svg'
import lovelogo from './assets/love.png';
import viteLogo from '/vite.svg'
import './App.css';
import Todo from './Todo';
import Counter from './Counter';
import Card from './Card';
import Timer from './Timer';
import Stopwatch from './components/StopWatch/Stopwatch';
import ProgressBar from './components/ProgressBar';

function App() {

  return (
    <div className='container d-flex d-column row-gap-6x'>
      <header>
        <h1 className='mb-20 mt-0'>
          React Components
        </h1>
        <p className='mt-0 mb-10'>A collection of utility React components & apps.</p>
        <p className='mt-0 mb-20'>No frameworks. Pure vanilla React.</p>
      </header>
      <div className='d-flex d-wrap d-y-start col-gap-x'>
        <Card heading='Counter'>
          <Counter />
        </Card>
        <Card heading="Todo">
          <Todo />
        </Card>
        <Card heading="Timer">
          <Timer />
        </Card>
        <Card heading="Stopwatch">
          <Stopwatch />
        </Card>
        <Card heading='Progress Bar'>
          <ProgressBar width={300} />
        </Card>
      </div>
      <p className="c-light d-flex d-x-center d-y-center">
        A project built with 
        <img className='ml-5 mr-5' width="16" height="16" src={lovelogo} alt="filled-like"/>
        by <a className='ml-5' target='_blank' href="https://www.linkedin.com/in/zahinalwa/">Zahin.</a>
      </p>
    </div>
  )
}

export default App
