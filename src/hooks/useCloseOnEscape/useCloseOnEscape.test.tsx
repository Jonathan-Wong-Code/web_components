import { render } from '@testing-library/react';
import React from 'react';
import { useCloseOnEscape } from './useCloseOnEscape';
import userEvent from '@testing-library/user-event';

// To see it tested in a real component see Dialog Component.
const TestComponent = ({ closeElement }: { closeElement: () => void }) => {
  useCloseOnEscape(true, closeElement);

  return <div>Dummy Component</div>;
};

it('runs closeElement when escape is pressed', () => {
  const closeElement = jest.fn();
  const { container } = render(<TestComponent closeElement={closeElement} />);

  userEvent.type(container, '{esc}')
  expect(closeElement).toHaveBeenCalledTimes(1);
});
