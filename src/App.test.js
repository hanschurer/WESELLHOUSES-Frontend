import { render, screen, fireEvent } from '@testing-library/react';
 
import App from './App';
import Account from './components/account' 
import Home from './components/home' 
import Item from './components/item' 
import Itemlist from './components/itemlist' 
import MsgTable from './components/msgTable' 

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Account')).toBeInTheDocument();
 
    screen.debug();
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
