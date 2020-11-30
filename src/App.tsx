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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
