import React, { useState, useRef, useEffect } from 'react';
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape/useCloseOnEscape';
import { FOCUSABLE_ELEMENT_SELECTORS } from '../../utils/constants';
export interface IDialog {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Dialog = ({ children, onClose, isOpen }: IDialog): JSX.Element => {
  // Setting active element allows returning focus to open button when dialog is closed.
  const [activeElement, setActiveElement] = useState<Element | null>();
  const nodeRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef<() => void>(null);

  // Memoize the incoming callback function
  (onCloseRef as React.MutableRefObject<(() => void) | undefined>).current = onClose;

  const closeDialog = React.useCallback(() => {
    onCloseRef.current && onCloseRef.current();
  }, [onCloseRef]);

  // Grab the open button as it is the active Element before the next browser paint.
  React.useLayoutEffect(() => {
    if (isOpen) {
      setActiveElement(document.activeElement);
    }
  }, [isOpen]);

  // When it unmounts refocus on the open button.
  useEffect(() => {
    return () => {
      if (isOpen && activeElement) {
        (activeElement as HTMLButtonElement).focus();
      }
    };
  }, [isOpen, activeElement]);

  // **** TABBING KEYBOARD LOGIC **** //
  useEffect(() => {
    // separate array items.
    let focusableElements: HTMLElement[];

    const node = nodeRef.current;

    if (!isOpen) {
      // Turn off tabbing if dialog elements are off screen
      if (node) {
        focusableElements = Array.from(
          node.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
        );

        focusableElements.forEach((element) =>
          element.setAttribute('tabindex', '-1')
        );
      }
    }

    if (isOpen) {
      // Focus capture inside of the Dialog.
      const handleKeyboardEvent = (e: KeyboardEvent) => {
        if (focusableElements.length > 0) {
          const firstFocusableEl = focusableElements[0];

          const lastFocusableEl =
            focusableElements[focusableElements.length - 1];
          const isTab = e.key === 'Tab';

          const shiftTabFromFirstToLastElement =
            isTab && e.shiftKey && document.activeElement === firstFocusableEl;

          const tabFromLastElementBackToFirst =
            !e.shiftKey && isTab && document.activeElement === lastFocusableEl;

          // if first element... focus on the last element in the dialog
          if (shiftTabFromFirstToLastElement) {
            e.preventDefault();
            // Prevents the tab + shift event from firing to the next focusable element if the user tries to shift+tab
            // out of the element.

            // We can move the focus to the last element in the modal and loop through our elements until the dialog is closed.
            lastFocusableEl.focus();
          } else if (tabFromLastElementBackToFirst) {
            // Same as above. We don't want to leave the dialog instead returning to the beginning after we reach the last element
            e.preventDefault();
            firstFocusableEl.focus();
          }
        }
      };

      const node = nodeRef.current;

      // use if no node return.
      if (!node) {
        return;
      }

      focusableElements = Array.from(
        node.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
      );

      focusableElements.forEach((element) =>
        element.setAttribute('tabindex', '0')
      );

      // Focus inner dialog when it is opened.
      if (typeof window !== 'undefined' && focusableElements[0]) {
        const firstInput = focusableElements.find(
          (element) => element.tagName === 'INPUT'
        );
        // Defensive in case focusable elements don't exist.
        if (focusableElements.length > 0) {
          firstInput ? firstInput.focus() : focusableElements[0].focus();
        }
      }
      // Add focus capturing keyboard listeners.
      node.addEventListener('keydown', handleKeyboardEvent);
    }
  }, [isOpen]);

  // Close dialog when escape key is pressed.
  useCloseOnEscape(isOpen, closeDialog);

  return (
    <div
      className='fieldstone-dialog-container'
      data-testid='fieldstone-dialog'
      role='dialog'
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      ref={nodeRef}
    >
      {children}
    </div>
  );
};
