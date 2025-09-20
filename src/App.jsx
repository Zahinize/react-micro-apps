import lovelogo from './assets/love.png';
import Todo from './Todo';
import Counter from './Counter';
import Card from './Card';
import Timer from './Timer';
import Stopwatch from './components/StopWatch/Stopwatch';
import ProgressBar from './components/ProgressBar';
import ImageCarousel from './components/ImageCarousel';

function App() {

  return (
    <div className='root-container d-flex d-column'>
      <header className='d-flex d-x-center d-y-center mb-50'>
        <h1>React-Interview</h1>
      </header>
      <p className='mt-0 mb-10'>A collection of React components & apps for your interview preparation.</p>
      <p className='mt-0 mb-50'>No frameworks. Pure vanilla React.</p>
      <div className='component-wrapper d-flex d-wrap d-x-center d-y-start mb-50 col-gap-x'>
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
        <Card heading="Image Carousel">
          <ImageCarousel />
        </Card>
      </div>
      <span className="c-light d-flex d-x-center d-y-center mb-20">
        A project built with 
        <img className='ml-5 mr-5' width="16" height="16" src={lovelogo} alt="filled-like"/>
        by <a className='ml-5' target='_blank' href="https://www.linkedin.com/in/zahinalwa/">Zahin.</a>
      </span>
    </div>
  )
}

export default App
