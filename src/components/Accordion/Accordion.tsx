import React, { useContext, useRef, } from 'react';
import styled from 'styled-components';
import { AccordionContext } from './contexts'


interface IAccordionButton {
  children: React.ReactElement;
  onOpenClick?: () => void,
  onCloseClick?: () => void,
}

export const AccordionButton = ({ children, onOpenClick, onCloseClick }: IAccordionButton) => {
  const { toggleAccordion, isOpen } = useContext(AccordionContext);

  return (
    React.cloneElement(children, {
      onClick: () => {
        isOpen ?
          onCloseClick && onCloseClick()
          :
          onOpenClick && onOpenClick();

        toggleAccordion();
      }
    })
  );
};

export const AccordionContent = styled.div`
  overflow: hidden;
  transition: all 0.2s ease;
`;

export const AccordionBody = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext(AccordionContext);

  return (
    <AccordionContent
      ref={contentRef}
      style={{ height: isOpen ? `${contentRef?.current?.scrollHeight}px` : 0 }}
    >
      {children}
    </AccordionContent>
  )
}

