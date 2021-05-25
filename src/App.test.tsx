import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('it renders', () => {
    render(<App />);
  });

  expect(screen.getByText('Points Ranges')).toBeInTheDocument();
});
