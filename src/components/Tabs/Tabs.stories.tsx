import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Tab, TabsContainer, TabPanel, Tabs } from './Tabs';
import styled from 'styled-components';

export default {
  title: "Behaviour/Tabs",
  component: Tab,
} as Meta;

const StyledTabContent = styled.div`
  padding: 16px;
  width: 600px;
`

export const Default = () => {
  // follows practises as per https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
  // button is passed the isOpen prop implicitly to accomodate custom styles.
  const StyledButton = styled.button<{ isOpen?: boolean }>`
  padding: 16px;
  background: none;
  margin-right: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  border-bottom: 3px solid transparent;
  border-color: ${({ isOpen }) => isOpen ? 'black black white' : 'transparent'};
  margin-bottom: -2px;
  position: relative;
`;


  return (
    <div style={{ width: 600 }}>
      <TabsContainer numberOfTabs={2} id='baseid'>
        {/* Use Composition to add styles around the nav and body */}
        <div style={{ borderBottom: '1px solid black' }}>
          <Tabs tabgroupAriaLabel='Name of Tabgroup'>
            <Tab index={0}>
              <StyledButton>Home</StyledButton>
            </Tab>
            <Tab index={1}>
              <StyledButton>Events</StyledButton>
            </Tab>
          </Tabs>
        </div>
        <StyledTabContent>
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
        </StyledTabContent>
      </TabsContainer>
    </div>
  )
}