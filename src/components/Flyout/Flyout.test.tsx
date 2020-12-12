import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Flyout } from './Flyout';

beforeEach(() => jest.clearAllMocks());

const mockOnClose = jest.fn()

const MockFlyOut = ({ onClose }: { onClose: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button>Outside button</button>
      <button onClick={() => setIsOpen(true)}>open me</button>
      <Flyout
        isOpen={isOpen}
        onClose={onClose}
        slideFrom='left'
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    </>
  )
}

describe('<Flyout />', () => {
  it('renders the default open flyout', () => {
    render(
      <Flyout
        isOpen
        onClose={jest.fn()}
        slideFrom='left'
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    );

    expect(screen.getByTestId('flyout-slide-container')).toHaveStyleRule(
      'left',
      '0'
    );
  });

  it('renders with default closed styles', () => {
    render(
      <Flyout
        isOpen={false}
        onClose={jest.fn()}
        slideFrom='left'
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    );

    expect(screen.getByTestId('flyout-slide-container')).toHaveStyleRule(
      'left',
      'calc(-100vw - 0px)'
    );
  });

  it('renders the flyout sliding in from the right', () => {
    render(
      <Flyout
        isOpen
        onClose={jest.fn()}
        slideFrom='right'
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    );


    expect(screen.getByTestId('flyout-slide-container')).toHaveStyleRule(
      'right',
      '0'
    );
  });

  it('renders closed styles coming in from right', () => {
    render(
      <Flyout
        isOpen={false}
        onClose={jest.fn()}
        slideFrom='right'
        shadowSizeOffset={20}
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    );

    expect(screen.getByTestId('flyout-slide-container')).toHaveStyleRule(
      'right',
      'calc(-100vw - 20px)'
    );
  });

  it('should close the flyout when you click outside', async () => {
    render(
      <MockFlyOut onClose={mockOnClose} />
    );

    userEvent.click(screen.getByText(/open me/i));

    const flyout = await waitFor(() => screen.getByTestId('flyout-slide-container'))

    await waitFor(() => expect(flyout).toHaveStyleRule(
      'left',
      '0'
    ));

    fireEvent.click(document);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
