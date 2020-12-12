import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react';


export interface IAccordionGroupProviderContext {
  activeAccordion: number | undefined,
  setActiveAccordion: Dispatch<SetStateAction<number>> | (() => void),
  setInsideAccordionGroup: Dispatch<SetStateAction<boolean>> | (() => void),
  isSingleOpen?: boolean,
};
// Provider for allowing only one open.
interface IAccordionContainerProvider {
  children: React.ReactElement[];
  isSingleOpen?: boolean,
  focusBorderColour?: string,
}

export const AccordionGroupContext = createContext({
  activeAccordion: -1,
  setActiveAccordion: (a: number) => { },
  setInsideAccordionGroup: (a: boolean) => { },
  isSingleOpen: false,
})

export const AccordionContainerProvider = ({
  children,
  isSingleOpen = false,
  focusBorderColour = 'blue',
}: IAccordionContainerProvider): JSX.Element => {
  const [activeAccordion, setActiveAccordion] = useState<number>(
    -1
  );

  const [insideAccordionGroup, setInsideAccordionGroup] = useState<boolean>(false);

  const value = useMemo(() => ({
    activeAccordion,
    setActiveAccordion,
    setInsideAccordionGroup,
    isSingleOpen,
  }), [activeAccordion, setActiveAccordion, setInsideAccordionGroup, isSingleOpen]);

  return (
    <div style={{ border: insideAccordionGroup ? `1px solid ${focusBorderColour}` : '1px solid transparent' }}>
      {<AccordionGroupContext.Provider value={value}>{children}</AccordionGroupContext.Provider>}
    </div>
  )
};
