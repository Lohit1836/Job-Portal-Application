import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Job Portal title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Job Portal/i);
  expect(titleElement).toBeInTheDocument();
});























