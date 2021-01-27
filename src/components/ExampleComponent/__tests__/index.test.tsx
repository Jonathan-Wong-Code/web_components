import React from 'react';
import { render } from '@testing-library/react';
import { TestComponent } from '../';

it('renders the test component', () => {
  const onClick = jest.fn();
  render(<TestComponent onClick={onClick} />);
});
