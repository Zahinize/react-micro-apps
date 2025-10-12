import lovelogo from './assets/love.png';
import Todo from './components/Todo/Todo';
import Counter from './components/Counter';
import Card from './components/Card';
import Timer from './components/Timer';
import Stopwatch from './components/StopWatch/Stopwatch';
import ProgressBar from './components/ProgressBar';
import ImageCarousel from './components/ImageCarousel';
import Tooltip from './components/Tooltip/Tooltip';
import Tabs from './components/Tabs/Tabs';

export default function App() {
  const tabsData = [
    {title: "Counter", content: <Counter />},
    {title: "Tooltip", content: <Tooltip text="Good Luck!"><span className='highlight'>Hover me!</span></Tooltip>},
    {title: "Todo", content: <Todo />},
    {title: "Timer", content: <Timer />},
  ];

  return (
    <div className='root-container d-flex d-column'>
      <header className='d-flex d-x-center d-y-center mb-50'>
        <h1 className='fs-large sm'>React Interview</h1>
      </header>
      <p className='t-center fs-medium sm pl-10 mb-10'>A collection of React components for 
        <br className='d-none sm:d-inline'/> your <Tooltip text="Good Luck!"><span className='highlight'>interview</span></Tooltip> preparation.</p>
      <p className='t-center fs-medium sm pl-10 mb-50'>No frameworks. Pure vanilla React.</p>
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
            Lorem ipsum amet, <Tooltip text="I am a tooltip :)"><span className='highlight'>consectetur.</span></Tooltip><br/>
            Ut enim veniam, quis nostrud nisi.<br/>
          </p>
          <Tooltip placement="bottom" text="I am here.">
            <button className='fs-normal sm mb-10'>See tooltip at bottom!</button>
          </Tooltip>
          <p className='mb-10'>
            Lorem ipsum amet, consectetur.<br/>
            Ut enim veniam, quis nostrud nisi.<br/>
          </p>
          <Tooltip placement='bottom' text="Hello, how are you?">
            <p className='highlight mb-10'>Hover me!</p>
          </Tooltip>
        </Card>

        <Card heading='Tabs'>
          <Tabs data={tabsData} />
        </Card>
      </div>
      <span className="c-light d-flex d-x-center d-y-center mb-50">
        A project built with 
        <img className='ml-5 mr-5' width="16" height="16" src={lovelogo} alt="filled-like"/>
        by <a className='ml-5' target='_blank' href="https://www.linkedin.com/in/zahinalwa/">Zahin.</a>
      </span>
    </div>
  )
}
