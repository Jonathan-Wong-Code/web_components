import React, { useState, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useToggleFocusableElements from './useToggleFocusElements';

const Component = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  useToggleFocusableElements(isOpen, parentRef);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>open first button</button>
      <div ref={parentRef}>
        <button>inner button</button>
      </div>
      <button onClick={() => setIsOpen(true)}>open button two</button>
    </>
  )
}

describe("The useToggleFocusableElements hook behviour", () => {
  it('renders and turns off tabbing when the content is not shown', () => {
    render(<Component />);

    userEvent.tab();
    expect(screen.getByRole('button', { name: 'open first button' })).toHaveFocus();
    userEvent.tab();

    // Focus should skip the inner button and go to button two
    expect(screen.getByRole('button', { name: 'open button two' })).toHaveFocus();
    // Click open button
    userEvent.click(screen.getByRole('button', { name: 'open first button' }))
    expect(screen.getByRole('button', { name: 'open first button' })).toHaveFocus();

    // tab again when open and inner button should receive focus.
    userEvent.tab();
    expect(screen.getByRole('button', { name: 'inner button' })).toHaveFocus();

  })
})

