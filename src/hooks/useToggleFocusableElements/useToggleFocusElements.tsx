import { useEffect } from 'react';
import { FOCUSABLE_ELEMENT_SELECTORS } from '../../utils/constants';

const useToggleFocusableElements = (isOpen: boolean, parentElementRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {

    const parentElement = parentElementRef.current;

    if (!isOpen) {
      // Turn off tabbing if dialog elements are off screen
      if (parentElement) {
        const focusableElements = Array.from(
          parentElement.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
        );

        focusableElements.forEach((element) =>
          element.setAttribute('tabindex', '-1')
        );
      }
    }

    if (isOpen) {
      if (parentElement) {
        const focusableElements = Array.from(
          parentElement.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
        );

        focusableElements.forEach((element) =>
          element.setAttribute('tabindex', '0')
        );
      }
    }
  }, [isOpen, parentElementRef])
}

export default useToggleFocusableElements;