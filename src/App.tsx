import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tooltip from '../src/components/Tooltip/Tooltip';
function App() {

  return (
    <>
      <div style={{ width: 300, height: 1000, display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '100px' }}>
          <Tooltip tooltipContent={
            <div>
              <p style={{ margin: 0 }}>This is how it looks when you set preferredPosition explicitly to below.</p>,
          </div>}

            preferredPosition='left'>
            <div>
              <p style={{ margin: 0 }}>Hover me hover me hover me over me hover me hover me</p>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default App;
