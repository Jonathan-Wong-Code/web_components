
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
  toggleAccordion: () => void;
  index: number | undefined,
  baseId: string,
}

export const AccordionContext = createContext<Accordion>({
  isOpen: false,
  toggleAccordion: () => { },
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
      setIsOpen(index === activeAccordion);
    }
  }, [index, activeAccordion, isSingleOpen]);

  const toggleAccordion = useCallback(() => {
    setIsOpen((prevState) => !prevState);
    if (isSingleOpen) {
      setActiveAccordion && setActiveAccordion(index);
    }
  }, [index, setActiveAccordion, isSingleOpen]);

  const value = useMemo(() => ({ isOpen, toggleAccordion, index, baseId, }), [
    isOpen,
    toggleAccordion,
    index,
    baseId,
  ]);

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
