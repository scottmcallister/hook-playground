import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useCounter from '../useCounter';

test('useCounter initializes count to 0', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('useCounter increments count', () => {
  const { result } = renderHook(() => useCounter());
  const { increment } = result.current;
  act(() => increment());
  expect(result.current.count).toBe(1);
});

test('useCounter decrements count', () => {
  const { result } = renderHook(() => useCounter());
  const { increment, decrement } = result.current;
  act(() => {
    decrement();
    increment();
  });
  expect(result.current.count).toBe(0);
});
