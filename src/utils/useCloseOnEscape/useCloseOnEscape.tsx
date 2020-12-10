import { useEffect } from 'react';

export const useCloseOnEscape = (isOpen: boolean, closeElement: () => void): void => {
  useEffect(() => {
    if (isOpen) {
      const handleKeyPress = (e: KeyboardEvent) => {
        console.log('hello?')
        if (e.key === 'Escape') {
          closeElement();
        }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [closeElement, isOpen]);
};
