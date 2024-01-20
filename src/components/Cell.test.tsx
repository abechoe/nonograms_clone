import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Cell } from './Cell';

describe('Cell', () => {
  test('starts out unselected', () => {
    render(<Cell />)
    const cell = screen.getByRole('cell')
    expect(cell.className).toBe('unselected');
  })

  test('is selected on click', async () => {
    render(<Cell />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)

    expect(cell.className).toBe('selected')
  })

  test('clicking twice eliminates', async () => {
    render(<Cell />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)
    await userEvent.click(cell)
    
    expect(cell.className).toBe('eliminated')
  })
  
  test(' clicking three times resets to unselected', async () => {
    render(<Cell />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)
    await userEvent.click(cell)
    await userEvent.click(cell)
    
    expect(cell.className).toBe('unselected')
  })
})