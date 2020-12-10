import React, { useContext, useRef, } from 'react';
import styled from 'styled-components';
import { AccordionContext } from './AccordionContainerProvider'
import { AccordionGroupContext } from './AccordionGroupProvider';

// ** ACCORDION HEADER/BUTTON ** //
interface IAccordionButton {
  children: React.ReactElement;
  onOpenClick?: () => void,
  onCloseClick?: () => void,
  backgroundFocusColour?: string;
}

const ButtonContainerDiv = styled.div<{ isOpen: boolean, backgroundFocusColour: string }>`
  & button {
    background: ${({ backgroundFocusColour, isOpen }) => isOpen && backgroundFocusColour};
  }
`;

export const AccordionButton = ({
  children,
  onOpenClick,
  onCloseClick,
  backgroundFocusColour = '#E1EDFE',
}: IAccordionButton) => {
  const { toggleAccordion, isOpen, index, baseId } = useContext(AccordionContext);
  const { setInsideAccordionGroup } = useContext(AccordionGroupContext);

  return (
    <ButtonContainerDiv
      isOpen={isOpen}
      backgroundFocusColour={backgroundFocusColour}
    >
      {React.cloneElement(children, {
        onClick: () => {
          isOpen ?
            onCloseClick && onCloseClick()
            :
            onOpenClick && onOpenClick();
          toggleAccordion();
        },
        onFocus: () => setInsideAccordionGroup(true),
        onBlur: () => setInsideAccordionGroup(false),
        'aria-expanded': isOpen,
        'aria-controls': `accordion-body-${baseId}-${index}`,
      })}
    </ButtonContainerDiv>
  );
};

// ** ACCORDION BODY/CONTENT ** //

export const AccordionContent = styled.div`
  overflow: hidden;
  transition: all 0.2s ease;
`;

interface IAccordionBody {
  children: React.ReactNode,
}

export const AccordionBody = ({ children }: IAccordionBody) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, index, baseId } = useContext(AccordionContext);

  return (
    <AccordionContent
      ref={contentRef}
      style={{
        height: isOpen ? `${contentRef?.current?.scrollHeight}px` : 0,
      }}
      id={`accordion-body-${baseId}-${index}`}
      aria-labelledby={`accordion-button-${baseId}-${index}`}
      role='region'
      aria-hidden={!isOpen}
    >
      {children}
    </AccordionContent>
  )
}

// ** ACCORDION TITLE ** //
interface IAccordionTitle {
  children: React.ReactNode;
  titleFocusColour?: string;
}

const Title = styled.span<{ isOpen: boolean, titleFocusColour: string }>`
  border: ${({ isOpen, titleFocusColour }) => isOpen ? `2px solid ${titleFocusColour}` : null};
  border-radius: 6px;
  padding: 8px;
`

export const AccordionTitle = ({ children, titleFocusColour = 'blue' }: IAccordionTitle) => {
  const { isOpen, baseId, index } = useContext(AccordionContext);

  return (
    <Title titleFocusColour={titleFocusColour} isOpen={isOpen} id={`accordion-button-${baseId}-${index}`}>
      {children}
    </Title>
  )
}

