import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Board, computeHints } from './Board';
import userEvent from '@testing-library/user-event';

describe('Board', () => {
  test('it renders a table', () => {
    render(<Board />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('board has same number of rows as the solution', () => {    
    const { container } = render(<Board
      solution={[
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [true, false, true]
      ]}
      />);

    const tableBody = container.getElementsByTagName('tbody');
    expect(tableBody[0].getElementsByTagName('tr').length).toBe(5);
  })

  test('board displays clues for each row and column', () => {
    render(<Board
      solution={[
        [false, true, false, false, false],
        [false, true, false, true, false],
        [false, false, false, true, true],
        [true, true, false, true, true],
        [true, false, true, true, true]
      ]}
      />);

      // find the column headers
      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders[0]).toHaveTextContent('2');
      expect(columnHeaders[1]).toHaveTextContent('2 1');
      expect(columnHeaders[2]).toHaveTextContent('1');
      expect(columnHeaders[3]).toHaveTextContent('4');
      expect(columnHeaders[4]).toHaveTextContent('3');
  })

  test('Board displays You failed when it is not solved', async () => {    
    const { container } = render(<Board
      solution={[
        [true]
      ]}
      />);
      const tableBody = container.getElementsByTagName('tbody');
      expect(tableBody[0].getElementsByTagName('tr').length).toBe(1);
    const button = screen.getByRole('button', {name: "I'm brave!"});
    await userEvent.click(button);
    expect(screen.getByText("You failed")).toBeInTheDocument()
  })

  test('Board displays Congratulations when it is solved', async () => {
    const { container } = render(<Board
      solution={[
        [true]
      ]}
      />);

    const tableBody = container.getElementsByTagName('tbody');
    expect(tableBody[0].getElementsByTagName('tr').length).toBe(1);

    const cell = screen.getByRole('cell');
    await userEvent.click(cell);

    const button = screen.getByRole('button', {name: "I'm brave!"});
    await userEvent.click(button);

    expect(screen.getByText("Congratulations")).toBeInTheDocument()
  })
  test('computeHint computes a hint', () => {
    const rowOrColumnAnswers = [true];
    expect(computeHints(rowOrColumnAnswers)).toEqual("1")
    const someRowOrColumnAnswers = [true, true];
    expect(computeHints(someRowOrColumnAnswers)).toEqual("2")
    const someRowOrColumnAnswersWithSpace = [false, true, true, false, true];
    expect(computeHints(someRowOrColumnAnswersWithSpace)).toEqual("2 1");
  })
})