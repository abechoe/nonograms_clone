import { useState } from 'react';
import './Board.css';
import { Cell } from './Cell';
import axios from 'axios';

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

export async function fetchCatData() {
  try {
    const response = await axios.get('https://catfact.ninja/fact');

    const result = response.data;

    return result;

  } catch (error) {
    console.error('Error fetching cat data: ', error);
  }
}

interface BoardProps {
  solution: boolean[][]
}

export function Board({ solution = SOLUTION }: BoardProps) {
  const initialBoardState = solution.map((row) => {
    return row.map((_cell) => {
      return false;
    })
  })
  const [resultText, setResultText] = useState<string>()
  const [boardState, setBoardState] = useState<boolean[][]>(initialBoardState)
  const [catData, setCatData] = useState<string>();

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
                <th scope="row" className="rowHint">{computeHints(row)}</th>
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
      <button onClick={async () => {
        const { fact } = await fetchCatData();
        setCatData(fact);
      }}>
        get cat facts!
      </button>
      <p>{catData}</p>
    </>
  )
}