import React, { useState, createContext, Dispatch, SetStateAction, useMemo, useContext, useEffect } from 'react';
// Inspired by https://material-ui.com/components/tabs/

interface ITabsContext {
  setCurrentOpenTab: Dispatch<SetStateAction<number>> | (() => void),
  currentOpenTab: number,
}

export const TabsContext = createContext<ITabsContext>({
  setCurrentOpenTab: () => { },
  currentOpenTab: 0,
})

interface ITabsContainer {
  children: React.ReactNode;
}

export const TabsContainer = ({ children }: ITabsContainer) => {
  const [currentOpenTab, setCurrentOpenTab] = useState<number>(0);

  const value = useMemo(() => ({ currentOpenTab, setCurrentOpenTab }), [currentOpenTab, setCurrentOpenTab])

  return (
    <div style={{ display: 'inline-block' }}>
      <TabsContext.Provider value={value}>
        {children}
      </TabsContext.Provider>
    </div >
  )
}

interface ITabs {
  children: React.ReactElement[] | React.ReactElement
}

export const Tabs = ({ children }: ITabs) => {
  return (
    <div role="tablist" style={{ display: 'flex' }}>
      {children}
    </div>
  )
}

interface ITab {
  eventKey: string;
  tabTitle: string;
  index: number;
}

export const Tab = ({ tabTitle, index }: ITab): JSX.Element => {
  const { setCurrentOpenTab } = useContext(TabsContext);

  return (
    <div>
      <button onClick={() => setCurrentOpenTab(index)} role='tab'>{tabTitle}</button>
    </div>
  )
}

interface ITabPanel {
  index: number;
  children: React.ReactElement;
}

export const TabPanel = ({ index, children }: ITabPanel): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { currentOpenTab } = useContext(TabsContext);

  useEffect(() => {
    console.log(index, currentOpenTab)
    setIsOpen(index === currentOpenTab)
  }, [currentOpenTab, index])

  return isOpen ? children : <></>;
} 