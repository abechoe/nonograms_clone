import './Board.css';
import { Cell } from './Cell';

export function Board() {
  return (
    <>
      <table className="">
        <thead>
          <tr>
            <th></th>
            <th scope="col">3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">2</th>
            <Cell />
          </tr>
          <tr>
            <th scope="row">2</th>
            <Cell />
          </tr>
          <tr>
            <th scope="row">2</th>
            <Cell />
          </tr>
          <tr>
            <th scope="row">2</th>
            <Cell />
          </tr>
          <tr>
            <th scope="row">2</th>
            <Cell />
          </tr>
        </tbody>
      </table>
    </>
  )
}