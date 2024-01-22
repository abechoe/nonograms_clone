import { useState } from 'react';
import './Board.css';
import { Cell } from './Cell';

const SOLUTION = [
  [false, true, false, false, false],
  [false, true, false, true, false],
  [false, false, false, true, true],
  [true, true, false, true, true],
  [true, false, true, true, true]
]

export function Board({ solution = SOLUTION }) {
  const [resultText, setResultText] = useState<string>()
  return (
    <>
      <span>{resultText}</span>
      <table className="">
        {solution.map((row) => {
          return (
            <tr></tr>
          )
        })}
      </table>
      <button onClick={() => setResultText('You failed')}>I'm brave!</button>
    </>
  )
}