import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Flyout } from './Flyout';

beforeEach(() => jest.clearAllMocks());
const onClose = jest.fn();

describe('<Flyout />', () => {
  it('renders the default open flyout', () => {
    render(
      <Flyout
        isOpen
        onClose={onClose}
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
        onClose={onClose}
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
        onClose={onClose}
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
        onClose={onClose}
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

  it('should close the flyout when you click outside', () => {
    render(
      <Flyout
        isOpen
        onClose={onClose}
        slideFrom='left'
      >
        <h2>Mock Flyout</h2>
      </Flyout>
    );

    expect(screen.getByTestId('flyout-slide-container')).toHaveStyleRule(
      'left',
      '0'
    );

    userEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
