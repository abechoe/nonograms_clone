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
  const [boardState, setBoardState] = useState<[boolean[]]>([[]])

  function updateBoardState(rowIndex: number, cellIndex: number, selection: boolean) {
    boardState[rowIndex][cellIndex] = selection
    setBoardState(boardState)
  }

  function isBoardSolved(userInputs: [boolean[]]) {
    return JSON.stringify(userInputs) === JSON.stringify(solution)
  }

  return (
    <>
      <span>{resultText}</span>
      <table className="">
        {solution.map((row, rowIndex) => {
          return (
            <tr>
              {row.map((cell, cellIndex) => {
                
                return <Cell onSelect={(selection: boolean) => updateBoardState(rowIndex, cellIndex, selection)}/>
              })}
            </tr>
          )
        })}
      </table>
      <button onClick={() => setResultText(isBoardSolved(boardState) ? 'Congratulations' : 'You failed')}>I'm brave!</button>
    </>
  )
}