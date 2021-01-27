import React from 'react';
import { renderBaseProviders } from '../../../test-helpers/testUtils';
import { TestComponent } from '../';

it('renders the test component', () => {
  const onClick = jest.fn();
  renderBaseProviders(<TestComponent onClick={onClick} />);
});
