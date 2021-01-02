import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AutoCompleteInput } from './AutoCompleteInput';
import { AutoCompleteProvider } from './AutoCompleteProvider';
import { AutoCompleteOptions } from './AutoCompleteOptionsList'

export const AutoCompleteComposition = (): JSX.Element => {
  const [value, setValue] = useState<string>('');

  const options = ['sheep', 'sherpa', 'she', 'shed']

  const onChange = (inputValue: string) => {
    setValue(inputValue)
  }

  return (
    <>
      {/* label should be outside the provider to preserve combobox styling */}
      <label htmlFor="auto-complete-input" id='auto-complete-label'>Enter Search Term:</label>
      <AutoCompleteProvider
        onChange={onChange}
        options={options}
        initialValue={value}
        labelId='auto-complete-label'
      >
        <AutoCompleteInput>
          <input type="text" id='auto-complete-input' placeholder='Enter Search Term' autoComplete="off" />
        </AutoCompleteInput>
        <AutoCompleteOptions optionHighlightColour={'grey'} />
      </AutoCompleteProvider>
    </>
  )
}

describe("The AutoComplete Component", () => {
  it('renders', () => {
    render(<AutoCompleteComposition />)
  })

  it('should open the dropdown if there are options and filter the options properly', async () => {
    render(<AutoCompleteComposition />)

    const input = screen.getByTestId('auto-complete-input');
    userEvent.type(input, 'sh');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4))
    userEvent.type(input, 'ed');

    expect(input).toHaveValue('shed');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1))
  })

  it('should select an option and close the dropdown when you click on an item', () => {
    render(<AutoCompleteComposition />)
    const input = screen.getByTestId('auto-complete-input');
    userEvent.type(input, 'sh')

    userEvent.click(screen.getByRole('option', { name: 'sherpa' }));
    expect(input).toHaveValue('sherpa')
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  })

  it('should be keyboard accessible', () => {
    render(<AutoCompleteComposition />)
    const input = screen.getByTestId('auto-complete-input');
    userEvent.type(input, 'sh')

    fireEvent.keyDown(input, {
      key: "ArrowDown",
      code: "ArrowDown",
      keyCode: 40,
      charCode: 40
    });

    expect(screen.getByRole('option', { name: 'sheep' })).toHaveStyleRule('background-color', 'grey');

    fireEvent.keyDown(input, {
      key: "ArrowDown",
      code: "ArrowDown",
      keyCode: 40,
      charCode: 40
    });

    expect(screen.getByRole('option', { name: 'sherpa' })).toHaveStyleRule('background-color', 'grey');

    fireEvent.keyDown(input, {
      key: "ArrowUp",
      code: "ArrowUp",
      keyCode: 38,
      charCode: 38
    });

    expect(screen.getByRole('option', { name: 'sheep' })).toHaveStyleRule('background-color', 'grey');

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13
    });

    expect(input).toHaveValue('sheep');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  })
})