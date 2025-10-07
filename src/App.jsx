import lovelogo from './assets/love.png';
import Todo from './components/Todo/Todo';
import Counter from './components/Counter';
import Card from './components/Card';
import Timer from './components/Timer';
import Stopwatch from './components/StopWatch/Stopwatch';
import ProgressBar from './components/ProgressBar';
import ImageCarousel from './components/ImageCarousel';
import Tooltip from './components/Tooltip/Tooltip';

export default function App() {

  return (
    <div className='root-container d-flex d-column'>
      <header className='d-flex d-x-center d-y-center mb-50'>
        <h1 className='fs-large'>React Interview</h1>
      </header>
      <p className='d-flex d-x-center d-y-center fs-medium mb-10'>A collection of React components & apps for your interview preparation.</p>
      <p className='d-flex d-x-center d-y-center fs-medium mb-50'>No frameworks. Pure vanilla React.</p>
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
        <Card heading='Tooltip'>
          <Tooltip text="I am a tooltip :)">
            <p className='highlight mb-10'>Hover me to see a tooltip!</p>
          </Tooltip>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet, <Tooltip text="I am a tooltip :)"><span className='highlight'>consectetur</span></Tooltip> adipiscing elit.<br/>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.<br/>
          </p>
          <Tooltip placement="top" text="Tooltip can appear on top and bottom.">
            <button className='mb-10'>Hover me to see a tooltip!</button>
          </Tooltip>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.<br/>
          </p>
          <Tooltip text="I am a biggggggggger biggggger tooltip :)">
            <p className='highlight mb-10'>Hover me!</p>
          </Tooltip>
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
