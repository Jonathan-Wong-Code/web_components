import React from 'react';
import { render } from '@testing-library/react';
import { AutoCompleteComposition } from './AutoComplete.stories';


describe("The AutoComplete Component", () => {
  it('renders', () => {
    render(<AutoCompleteComposition />)
  })
})