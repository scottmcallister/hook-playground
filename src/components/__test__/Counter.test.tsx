import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../Counter';

test('renders label', () => {
  render(<Counter />);
  const countLabel = screen.getByText(/Count/i);
  expect(countLabel).toBeInTheDocument();
});

test('increments count', async () => {
  render(<Counter />);
  const incrementButton = screen.getByText('+');
  expect(incrementButton).toBeInTheDocument();
  userEvent.click(incrementButton);
  const countLabel = await screen.findByText(/Count: 1/i);
  expect(countLabel).toBeInTheDocument();

});

test('decrements count', async () => {
  render(<Counter />);
  const decrementButton = screen.getByText('-');
  expect(decrementButton).toBeInTheDocument();
  userEvent.click(decrementButton);
  const countLabel = await screen.findByText(/Count: -1/i);
  expect(countLabel).toBeInTheDocument();
});
