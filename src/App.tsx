import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Flyout } from '../src/components/Flyout/Flyout';
function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <button onClick={() => setIsOpen(true)}>Open Dialogue</button>
      <Flyout isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello world</h2>
      </Flyout>

    </div>
  );
}

export default App;
