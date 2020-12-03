import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
  Dialog,
} from '../Dialog/Dialog';

export interface IFlyoutSlider {
  children: React.ReactNode;
  isOpen: boolean,
  onClose: () => void,
  slideFrom?: 'left' | 'right';
  transitionAnimation: string;
  shadowSizeOffset?: number;
}

type SlideFrom = 'left' | 'right';

const getSlidePosition = (isOpen: boolean, slideFrom?: SlideFrom, shadowSizeOffset?: number) => {
  if (slideFrom === 'right') {
    return `right: ${isOpen ? '0' : `calc(-100vw - ${shadowSizeOffset}px)`};`;
  }

  return `left: ${isOpen ? '0' : `calc(-100vw - ${shadowSizeOffset}px)`};`;
};

// *** FLYOUT MENU THAT SLIDES IN FROM OUTSIDE THE SCREEN *** //
const FlyoutSlideContainer = styled.div<{
  isOpen: boolean;
  slideFrom?: 'left' | 'right';
  transitionAnimation: string;
  shadowSizeOffset?: number;
}>`
  position: fixed;
  top: 0;
  max-width: 100%;
  ${({ isOpen, slideFrom, shadowSizeOffset }) => getSlidePosition(isOpen, slideFrom, shadowSizeOffset)}
  transition: ${({ transitionAnimation }) => transitionAnimation};
  z-index: 500;

  & * {
    box-sizing: border-box;
  }
`;

export const FlyoutSlider = ({ 
  children, 
  slideFrom, 
  isOpen, 
  onClose, 
  transitionAnimation, 
  shadowSizeOffset, 
}: IFlyoutSlider):JSX.Element => {

  const flyoutRef = useRef<HTMLDivElement>(null);
  // // Close Flyout by clicking outside of it.
  useEffect(() => {
    const handleCloseFlyout = (e: MouseEvent) => {
      if (!flyoutRef?.current?.contains((e.target as HTMLElement))) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.addEventListener('click', handleCloseFlyout);
    }

    return () => {
      if (isOpen) {
        document.body.removeEventListener('click', handleCloseFlyout);
      }
    };
  }, [isOpen, onClose]);

  return (
    <FlyoutSlideContainer
      isOpen={isOpen}
      slideFrom={slideFrom}
      data-testid='flyout-slide-container'
      transitionAnimation={transitionAnimation}
      shadowSizeOffset={shadowSizeOffset}
      ref={flyoutRef}
    >
      {children}
    </FlyoutSlideContainer>
  );
};

// *** FLYOUT COMPOSED COMPONENT *** //
export interface IFlyout {
  children: React.ReactNode;
  isOpen: boolean,
  onClose: () => void;
  slideFrom?: SlideFrom;
  transitionAnimation?: string;
  shadowSizeOffset?: number;
}

export const Flyout = ({
  isOpen,
  children,
  onClose,
  slideFrom = 'left',
  transitionAnimation = '.2s all linear',
  shadowSizeOffset = 0,
}: IFlyout): JSX.Element => {
  console.log(isOpen);
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <FlyoutSlider 
        slideFrom={slideFrom} 
        isOpen={isOpen} 
        onClose={onClose}
        transitionAnimation={transitionAnimation}
        shadowSizeOffset={shadowSizeOffset}
      >{children}</FlyoutSlider>
    </Dialog>
  );
};
