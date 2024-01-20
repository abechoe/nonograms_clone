import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Board } from './Board';

describe('Board', () => {
  test('it renders a table', () => {
    render(<Board />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('board has five rows', () => {
    render(<Board />)
    expect(screen.getAllByRole('row').length).toBe(6);
  })
})