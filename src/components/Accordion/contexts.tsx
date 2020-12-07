import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface ISingleAccordionOpenProvider {
  children: React.ReactElement[];
}

export const SingleAccordionOpenProvider = ({
  children,
}: ISingleAccordionOpenProvider): JSX.Element => {
  const [activeAccordion, setActiveAccordion] = useState<number | undefined>(
    -1
  );

  return <>
    {
      React.Children.map(children, child =>
        React.cloneElement(child, { activeAccordion, setActiveAccordion }),
      )}
  </>
};

// ** Accordion Container ** //

interface Accordion {
  isOpen: boolean;
  toggleAccordion: () => void;
}

export const AccordionContext = createContext<Accordion>({
  isOpen: false,
  toggleAccordion: () => { },
});

interface IAccordionContainer {
  children: React.ReactNode;
  isSingleOpen?: boolean;
  index?: number;
  activeAccordion?: number;
  setActiveAccordion?: (index: number | undefined) => void;
}

export const AccordionContainer = ({ children, setActiveAccordion, index, isSingleOpen = false, activeAccordion }: IAccordionContainer) => {
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

  const value = useMemo(() => ({ isOpen, toggleAccordion }), [
    isOpen,
    toggleAccordion,
  ]);

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
