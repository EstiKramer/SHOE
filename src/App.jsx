import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SighnUp from './assets/pages/SignUp'
import Login from './assets/pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SighnUp/>
    <Login/>
    </>
      
  )
}

export default App
