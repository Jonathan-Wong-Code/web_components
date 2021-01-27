import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { AccordionContext } from './AccordionContainerProvider';
import { AccordionGroupContext } from './AccordionGroupProvider';
import useToggleFocusableElements from '../../hooks/useToggleFocusableElements/useToggleFocusElements';
// ** ACCORDION HEADER/BUTTON ** //
interface IAccordionButton {
  children: React.ReactElement;
  onOpenClick?: () => void;
  onCloseClick?: () => void;
  backgroundFocusColour?: string;
  titleBorderFocusColour?: string;
}

const ButtonContainerDiv = styled.div<{
  isOpen: boolean;
  backgroundFocusColour: string;
  titleBorderFocusColour: string;
}>`
  & button:focus {
    background: ${({ backgroundFocusColour }) => backgroundFocusColour};

    .accordion-button-title {
      border: 2px solid
        ${({ titleBorderFocusColour }) => titleBorderFocusColour};
    }
  }
`;

export const AccordionButton = ({
  children,
  onOpenClick,
  onCloseClick,
  backgroundFocusColour = '#E1EDFE',
  titleBorderFocusColour = 'blue',
}: IAccordionButton): JSX.Element => {
  const { toggleAccordionOpen, isOpen, index, baseId } = useContext(
    AccordionContext
  );
  const { setInsideAccordionGroup } = useContext(AccordionGroupContext);

  return (
    <ButtonContainerDiv
      data-testid={`accordion-container-div-${index}`}
      isOpen={isOpen}
      backgroundFocusColour={backgroundFocusColour}
      titleBorderFocusColour={titleBorderFocusColour}
    >
      {React.cloneElement(children, {
        onClick: () => {
          isOpen
            ? onCloseClick && onCloseClick()
            : onOpenClick && onOpenClick();
          toggleAccordionOpen();
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

export const AccordionContent = styled.div<{ slideAnimation: string }>`
  overflow: hidden;
  transition: ${({ slideAnimation }) => slideAnimation};
`;

interface IAccordionBody {
  children: React.ReactNode;
  slideAnimation?: string;
}

export const AccordionBody = ({
  children,
  slideAnimation = '',
}: IAccordionBody): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, index, baseId } = useContext(AccordionContext);
  useToggleFocusableElements(isOpen, contentRef);

  return (
    <AccordionContent
      ref={contentRef}
      data-testid={`accordion-content-${index}`}
      style={{
        height: isOpen ? `${contentRef?.current?.scrollHeight}px` : 0,
      }}
      id={`accordion-body-${baseId}-${index}`}
      aria-labelledby={`accordion-button-${baseId}-${index}`}
      role="region"
      aria-hidden={!isOpen}
      slideAnimation={slideAnimation}
    >
      {children}
    </AccordionContent>
  );
};

// ** ACCORDION TITLE ** //
interface IAccordionTitle {
  children: React.ReactNode;
  titleFocusColour?: string;
}

const Title = styled.span`
  border-radius: 6px;
  padding: 8px;
`;

export const AccordionTitle = ({ children }: IAccordionTitle): JSX.Element => {
  const { baseId, index } = useContext(AccordionContext);

  return (
    <Title
      data-testid={`accordion-button-title-${index}`}
      id={`accordion-button-${baseId}-${index}`}
      className="accordion-button-title"
    >
      {children}
    </Title>
  );
};
