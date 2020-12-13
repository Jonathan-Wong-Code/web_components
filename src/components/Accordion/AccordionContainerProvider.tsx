
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';

import { AccordionGroupContext } from './AccordionGroupProvider';


// ** Accordion Container ** //
interface Accordion {
  isOpen: boolean;
  toggleAccordionOpen: () => void;
  index: number | undefined,
  baseId: string,
}

export const AccordionContext = createContext<Accordion>({
  isOpen: false,
  toggleAccordionOpen: () => { },
  index: -1,
  baseId: '',
});

interface IAccordionContainer {
  children: React.ReactNode;
  index: number;
  baseId: string;
}

export const AccordionContainer = ({
  children,
  index,
  baseId,
}: IAccordionContainer) => {
  const { setActiveAccordion, activeAccordion, isSingleOpen } = useContext(AccordionGroupContext)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSingleOpen) {
      // If only one allowed open set to open if the current accordion equals the current active accordion.
      setIsOpen(index === activeAccordion);
    }
  }, [index, activeAccordion, isSingleOpen]);

  const toggleAccordionOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
    // Set the active accordion if only one allowed open.
    if (isSingleOpen) {
      setActiveAccordion && setActiveAccordion(index);
    }
  }, [index, setActiveAccordion, isSingleOpen]);

  const value = useMemo(() => ({ isOpen, toggleAccordionOpen, index, baseId, }), [
    isOpen,
    toggleAccordionOpen,
    index,
    baseId,
  ]);

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
