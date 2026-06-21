// import { useState } from 'react'

import './App.css'

import Title from './components/Title/Title'
import Hamburger from './components/Hamburger/Hamburger'
import Button from './components/Button/button'

function App() {
  return (
    <>
    <div>
    <Title text="Sign in" />
    <Hamburger />
    </div>

    <div className='field'> 
    <Button type='primary' > Started </Button>
    <Button type='secondary' > Stop </Button>
    <Button type='tertiary' outlined> Pause </Button>
    </div>
    </>
  )
}


export default App;
