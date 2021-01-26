import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab, TabsContainer, TabPanel, Tabs } from './Tabs';
import styled from 'styled-components';

const Button = styled.button``;

export const DefaultTabs = (): JSX.Element => {
  // button is passed the isOpen prop implicitly to accomodate custom styles.
  return (
    <div>
      <TabsContainer numberOfTabs={2} id="baseid">
        <Tabs tabgroupAriaLabel="Name of Tabgroup">
          <Tab index={0}>
            <Button>Home</Button>
          </Tab>
          <Tab index={1}>
            <Button>Events</Button>
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
  );
};

describe('The Tabs Component', () => {
  it('renders the default tab', () => {
    render(<DefaultTabs />);
    expect(screen.getByText(/This is a fake home tab/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/This is a fake events tab/i)
    ).not.toBeInTheDocument();
  });

  it('should allow the user to switch tabs when they click on the the tab button', () => {
    render(<DefaultTabs />);
    expect(screen.getByText(/This is a fake home tab/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/This is a fake events tab/i)
    ).not.toBeInTheDocument();

    const homeTab = screen.getByRole('tab', { name: /home/i });
    const eventsTab = screen.getByRole('tab', { name: /events/i });

    userEvent.click(eventsTab);
    expect(
      screen.queryByText(/This is a fake home tab/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/This is a fake events tab/i)).toBeInTheDocument();
    expect(eventsTab).toHaveClass('focused-tab');
    expect(homeTab).not.toHaveClass('focused-tab');
  });

  it('should be able to focus in the tabgroup and use the arrow keys to navigate the tabs', () => {
    render(<DefaultTabs />);
    userEvent.tab();

    const tabGroup = screen.getByRole('tablist');
    expect(tabGroup).toHaveFocus();

    userEvent.type(tabGroup, '{arrowright}');

    const homeTab = screen.getByRole('tab', { name: /home/i });
    const eventsTab = screen.getByRole('tab', { name: /events/i });

    expect(
      screen.queryByText(/This is a fake home tab/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/This is a fake events tab/i)).toBeInTheDocument();
    expect(eventsTab).toHaveClass('focused-tab');
    expect(homeTab).not.toHaveClass('focused-tab');

    // Press right again and go back to the first tab.

    userEvent.type(tabGroup, '{arrowright}');

    expect(screen.getByText(/This is a fake home tab/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/This is a fake events tab/i)
    ).not.toBeInTheDocument();
    expect(homeTab).toHaveClass('focused-tab');
    expect(eventsTab).not.toHaveClass('focused-tab');

    // Press left and go back to last tab
    userEvent.type(tabGroup, '{arrowleft}');

    expect(
      screen.queryByText(/This is a fake home tab/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/This is a fake events tab/i)).toBeInTheDocument();
    expect(eventsTab).toHaveClass('focused-tab');
    expect(homeTab).not.toHaveClass('focused-tab');
  });
});
