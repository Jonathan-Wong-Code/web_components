import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tab, TabsContainer, TabPanel, Tabs } from './components/Tabs/Tabs';
function App() {

  return (
    <>
      <div style={{ width: 600 }}>
        <TabsContainer numberOfTabs={2} id='baseid'>
          {/* Use Composition to add styles around the nav and body */}
            <Tabs tabgroupAriaLabel='Navigation'>
              <Tab index={0}>
                <button>Home</button>
              </Tab>
              <Tab index={1}>
                <button>Events</button>
              </Tab>
            </Tabs>
        
            <TabPanel index={0}>
              <div>
                <h2>This is a fake home tab</h2>
              </div>
            </TabPanel>
            <TabPanel index={1}>
              <div>
                <h2>This is a fake events tab</h2>
              </div>
            </TabPanel>
          
        </TabsContainer>
      </div>
    </>
  );
}

export default App;
