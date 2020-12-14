import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Tab, TabsContainer, TabPanel, Tabs } from './Tabs';

export default {
  title: "Behaviour/Tabs",
  component: Tab,
} as Meta;

export const Default = () => (
  <TabsContainer>
    <Tabs>
      <Tab eventKey="home" tabTitle='Home' index={0} />
      <Tab eventKey="events" tabTitle='Events' index={1} />
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
)