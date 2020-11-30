import { render } from '@testing-library/react';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { useCloseOnEscape } from './useCloseOnEscape';

// To see it tested in a real component see Dialog Component.
const TestComponent = ({ closeElement }: { closeElement: () => void }) => {
  useCloseOnEscape(true, closeElement);

  return <div>Dummy Component</div>;
};

it('runs closeElement when escape is pressed', () => {
  const closeElement = jest.fn();
  const { container } = render(<TestComponent closeElement={closeElement} />);

  fireEvent.keyDown(container, { key: 'Escape', code: 27 });
  expect(closeElement).toHaveBeenCalledTimes(1);
});
