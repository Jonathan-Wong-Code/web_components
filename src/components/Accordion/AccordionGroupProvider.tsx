import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';

const AccordionGroupContainer = styled.div<{
  focusBorderColour: string;
  insideAccordionGroup: boolean;
}>`
  border: ${({ focusBorderColour, insideAccordionGroup }) =>
    insideAccordionGroup
      ? `1px solid ${focusBorderColour}`
      : '1px solid transparent'};
`;

export interface IAccordionGroupProviderContext {
  activeAccordion: number | undefined;
  setActiveAccordion: Dispatch<SetStateAction<number>> | (() => void);
  setInsideAccordionGroup: Dispatch<SetStateAction<boolean>> | (() => void);
  isSingleOpen?: boolean;
}
// Provider for allowing only one open.
interface IAccordionContainerProvider {
  children: React.ReactElement[];
  isSingleOpen?: boolean;
  focusBorderColour?: string;
}

export const AccordionGroupContext = createContext({
  activeAccordion: -1,
  setActiveAccordion: (a: number) => {},
  setInsideAccordionGroup: (a: boolean) => {},
  isSingleOpen: false,
});

export const AccordionContainerProvider = ({
  children,
  isSingleOpen = false,
  focusBorderColour = 'blue',
}: IAccordionContainerProvider): JSX.Element => {
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);

  // For a11y outlining accordion if focused into accordion group.
  const [insideAccordionGroup, setInsideAccordionGroup] = useState<boolean>(
    false
  );

  const value = useMemo(
    () => ({
      activeAccordion,
      setActiveAccordion,
      setInsideAccordionGroup,
      isSingleOpen,
    }),
    [activeAccordion, setActiveAccordion, setInsideAccordionGroup, isSingleOpen]
  );

  return (
    <AccordionGroupContainer
      focusBorderColour={focusBorderColour}
      insideAccordionGroup={insideAccordionGroup}
      data-testid='accordion-group-container'
    >
      {
        <AccordionGroupContext.Provider value={value}>
          {children}
        </AccordionGroupContext.Provider>
      }
    </AccordionGroupContainer>
  );
};
