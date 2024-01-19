import { describe, test, expect } from 'vitest';
import { sum } from '../src/utils/sum';

describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(1, 7)).toBe(8);
  })
})