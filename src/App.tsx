import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Board } from './components/Board'

function App() {
  return (
    <>
      <h1>nonograms</h1>
      <Board></Board>
    </>
  )
}

export default App
