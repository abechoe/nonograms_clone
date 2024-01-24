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

export function computeHints(correctAnswers: boolean[]) {
  const hintArray = correctAnswers.reduce((accumulator: number[], answer: boolean) => {
    if (answer) {
      accumulator[accumulator.length-1] += 1; 
    } else {
      accumulator.push(0);
    }
    return accumulator;
  },
  [0]).filter(candidate => candidate != 0);
  return hintArray.join(' ');
}

export function Board({ solution = SOLUTION }) {
  const initialBoardState = solution.map((row) => {
    return row.map((cell) => {
      return false;
    })
  })
  const [resultText, setResultText] = useState<string>()
  const [boardState, setBoardState] = useState<boolean[][]>(initialBoardState)

  function updateBoardState(rowIndex: number, cellIndex: number, selection: boolean) {
    boardState[rowIndex][cellIndex] = selection
    setBoardState(boardState)
  }

  function isBoardSolved(userInputs: boolean[][]) {
    return JSON.stringify(userInputs) === JSON.stringify(solution)
  }

  return (
    <>
      <span>{resultText}</span>
      <table className="">
        <thead>
          <tr>
            <th></th>
            {solution[0].map((_column, colIndex) => {
              let columnValues = []
              for (let i = 0; i < solution[0].length; i += 1) {
                columnValues.push(solution[i][colIndex])
              }
              return <th>{computeHints(columnValues)}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {solution.map((row, rowIndex) => {
            return (
              <tr>
                <th scope="row">{computeHints(row)}</th>
                {row.map((_cell, cellIndex) => {
                  
                  return <Cell onSelect={(selection: boolean) => updateBoardState(rowIndex, cellIndex, selection)}/>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <button
        onClick={
          () => {
            setResultText(isBoardSolved(boardState) ? 'Congratulations' : 'You failed')
        }}
      >
        I'm brave!
      </button>
    </>
  )
}