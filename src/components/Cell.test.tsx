import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Cell } from './Cell';

describe('Cell', () => {
  test('starts out unselected', () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)
    const cell = screen.getByRole('cell')
    expect(cell.className).toBe('unselected');
  })

  test('is selected on click', async () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)

    expect(cell.className).toBe('selected')
  })

  test('clicking twice eliminates', async () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)
    await userEvent.click(cell)
    
    expect(cell.className).toBe('eliminated')
  })
  
  test('clicking three times resets to unselected', async () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)
    const cell = screen.getByRole('cell')
    await userEvent.click(cell)
    await userEvent.click(cell)
    await userEvent.click(cell)
    
    expect(cell.className).toBe('unselected')
  })

  test('clicking to selected calls the callback with true', async () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)

    const cell = screen.getByRole('cell')
    await userEvent.click(cell)

    expect(mockOnSelect).toHaveBeenCalledWith(true)
  })
  
  test('clicking to eliminated calls the callback with false', async () => {
    const mockOnSelect = vi.fn()
    render(<Cell onSelect={mockOnSelect} />)

    const cell = screen.getByRole('cell')
    await userEvent.click(cell)
    expect(mockOnSelect).toHaveBeenCalledWith(true)

    await userEvent.click(cell)
    expect(mockOnSelect).toHaveBeenCalledWith(false)
  })
})