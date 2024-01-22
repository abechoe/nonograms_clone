import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Board } from './Board';
import userEvent from '@testing-library/user-event';

describe('Board', () => {
  test('it renders a table', () => {
    render(<Board />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('board has same number of rows as the solution', () => {    
    render(<Board
      solution={[
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [true, false, true],
        [true, false, true]
      ]}
      />);
    expect(screen.queryAllByRole('row').length).toBe(5);
  })

  test('Board displays You failed when it is not solved', async () => {    
    render(<Board
      solution={[
        [true]
      ]}
      />);
    expect(screen.queryAllByRole('row').length).toBe(1);
    const button = screen.getByRole('button', {name: "I'm brave!"});
    await userEvent.click(button);
    expect(screen.getByText("You failed")).toBeInTheDocument()
  })

  test('Board displays Congratulations when it is solved', async () => {
    render(<Board
      solution={[
        [true]
      ]}
      />);
    expect(screen.queryAllByRole('row').length).toBe(1);

    const cell = screen.getByRole('cell');
    await userEvent.click(cell);

    const button = screen.getByRole('button', {name: "I'm brave!"});
    await userEvent.click(button);

    expect(screen.getByText("Congratulations")).toBeInTheDocument()
  })
})