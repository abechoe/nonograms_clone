import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('App', () => {
  test('it renders', () => {
    render(<App />)
    expect(screen.getByRole('heading')).toHaveTextContent('nonograms')
  })
})