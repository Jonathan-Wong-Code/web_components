import React, { useState, createContext, Dispatch, SetStateAction, useMemo, useContext, useEffect } from 'react';
// Inspired by https://material-ui.com/components/tabs/
import styled from 'styled-components';
import './Tabs.css';

const TabsStyles = styled.div`
  & * {
    box-sizing: border-box;
  }
`
interface ITabsContext {
  setCurrentOpenTab: Dispatch<SetStateAction<number>> | (() => void),
  setTabListFocused: Dispatch<SetStateAction<boolean>> | (() => void),
  currentOpenTab: number,
  tabListFocused: boolean,
  id: string;
}

export const TabsContext = createContext<ITabsContext>({
  setCurrentOpenTab: () => { },
  setTabListFocused: () => { },
  tabListFocused: false,
  currentOpenTab: 0,
  id: ''
})

interface ITabsContainer {
  children: React.ReactNode;
  numberOfTabs: number;
  id: string;
}

export const TabsContainer = ({ children, numberOfTabs, id }: ITabsContainer) => {
  const [currentOpenTab, setCurrentOpenTab] = useState<number>(0);
  const [tabListFocused, setTabListFocused] = useState<boolean>(false);

  const value = useMemo(() => ({ currentOpenTab, setCurrentOpenTab, tabListFocused, setTabListFocused, id }),
    [currentOpenTab, setCurrentOpenTab, tabListFocused, setTabListFocused, id])

  //a11y keyboard functionality
  useEffect(() => {
    const handleArrowKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (currentOpenTab > 0) {
          return setCurrentOpenTab(currentOpenTab - 1);
        }
        return setCurrentOpenTab(numberOfTabs - 1);
      }

      if (e.key === 'ArrowRight') {
        if (currentOpenTab < numberOfTabs - 1) {
          return setCurrentOpenTab(currentOpenTab + 1);
        }
        return setCurrentOpenTab(0);
      }
    }

    if (tabListFocused) {
      window.addEventListener('keydown', handleArrowKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleArrowKeyPress)
    }
  }, [tabListFocused, currentOpenTab, numberOfTabs])

  return (
    <TabsStyles>
      <TabsContext.Provider value={value}>
        {children}
      </TabsContext.Provider>
    </TabsStyles>
  )
}

// The Tablist

const TabList = styled.div`
  &:focus {
    outline: none;
  }
`;
interface ITabs {
  children: React.ReactElement[] | React.ReactElement
  tabgroupAriaLabel: string;
}

export const Tabs = ({ children, tabgroupAriaLabel }: ITabs) => {

  const { setTabListFocused } = useContext(TabsContext);

  return (
    <TabList
      role="tablist"
      style={{ display: 'flex' }}
      tabIndex={0}
      onFocus={() => setTabListFocused(true)}
      onBlur={() => setTabListFocused(false)}
      aria-label={tabgroupAriaLabel}
    >
      {children}
    </TabList>
  )
}

// Provider for ONE Tab.
interface ITab {
  children: React.ReactElement;
  index: number;
}

export const Tab = ({ children, index }: ITab): JSX.Element => {
  const { setCurrentOpenTab, currentOpenTab, tabListFocused, id } = useContext(TabsContext);

  const isOpen = index === currentOpenTab;

  return (
    React.cloneElement(children, {
      onClick: () => setCurrentOpenTab(index),
      role: 'tab',
      'aria-selected': isOpen,
      'aria-controls': `panel-${id}-${index}`,
      id: `tab-id-${id}-${index}`,
      className: tabListFocused && isOpen ? 'focused-tab' : undefined,
      isOpen,
      tabIndex: -1,
    })
  )
}

interface ITabPanel {
  index: number;
  children: React.ReactElement;
}

export const TabPanel = ({ index, children }: ITabPanel): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { currentOpenTab, id } = useContext(TabsContext);

  useEffect(() => {
    setIsOpen(index === currentOpenTab)
  }, [currentOpenTab, index])

  return isOpen ? React.cloneElement(children, {
    role: 'tabpanel',
    id: `panel-${id}-${index}`,
    'aria-labelledby': `tab-id-${id}-${index}`,
    tabIndex: 0,
  }) : <></>;
} 