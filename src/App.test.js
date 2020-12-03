import { render, screen, fireEvent } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('allows search', () => {
    render(<App />);
 
    screen.debug();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    screen.debug();
  });

});
