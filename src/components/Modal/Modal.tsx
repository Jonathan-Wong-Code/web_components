import React, { useRef } from 'react';
import { Dialog } from '../Dialog/Dialog';
import styled from 'styled-components';

const OuterModal = styled.div<{
  overlayColor?: string | undefined;
  centerContent?: boolean;
}>`
  position: fixed;
  background: ${({ overlayColor }) =>
    overlayColor || 'transparent'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;

  display: ${({ centerContent }) => (centerContent ? 'flex' : 'block')};
  justify-content: ${({ centerContent }) => (centerContent ? 'center' : null)};
  align-items: ${({ centerContent }) => (centerContent ? 'center' : null)};
`;

export interface IModalBackground {
  children: React.ReactNode;
  overlayColor?: string;
  centerContent?: boolean;
  onClose: () => void;
}

export const ModalBackground = ({
  children,
  overlayColor,
  centerContent,
  onClose,
}: IModalBackground): JSX.Element | null => {

  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <OuterModal
      ref={overlayRef}
      onClick={(e) =>
        (e.target as HTMLElement).contains(overlayRef.current) &&
        onClose()
      }
      overlayColor={overlayColor}
      centerContent={centerContent}
      data-testid='modal-overlay'
    >
      {children}
    </OuterModal>)
};

export interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  overlayColor?: string;
  centerContent?: boolean;
}

export const Modal = ({ children, onClose, isOpen, overlayColor, centerContent }: IModal) => {
  return (
    <Dialog onClose={onClose} isOpen={isOpen}>
      {isOpen ?
        <ModalBackground
          centerContent={centerContent}
          onClose={onClose}
          overlayColor={overlayColor}
        >
          {children}
        </ModalBackground> : null
      }
    </Dialog>
  )
}