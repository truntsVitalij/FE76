import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { Button } from './components/button/button'
import { Sidebar } from './components/sidebar/sidebar'


function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  }

  const imgClassName = 'base';


  return (
    <section id="center">
      <div className="hero">
        <Button size='small' outlined><span>АКЦИЯ!!!!!</span></Button>
        <img src={heroImg} className={imgClassName} width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
        <Button type='secondary'>Button text 2</Button>
      </div>
      <div>
        <h1>Get started</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          <Sidebar />
        </p>
      </div>
      <button
        type="button"
        className="counter"
        onClick={handleClick}
      >
        Count is {count}
      </button>
      <Button>Button text 3</Button>
    </section>
  )
}

export default App
