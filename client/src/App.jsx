import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count , setcount] = useState(0)

  const handelIncrement = () => {
    setcount(count + 1)
  }

  const handelDecrement = () => {
    setcount(count - 1)
  }

  console.log(count)

  return (
    <div className="App">
    <div className='increment'onClick={handelIncrement}>increment</div>
    <div className='decrement'onClick={handelDecrement}>decrement</div>
    <div className='display'>{count}</div>

    </div>
  )
}

export default App
