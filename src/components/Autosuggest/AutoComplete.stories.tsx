import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Autocomplete } from './Autocomplete';
import { AutoCompleteInput } from './AutoCompleteInput';
import { AutoCompleteProvider } from './AutoCompleteProvider';
import { AutoCompleteOptions } from './AutoCompleteOptionsList'
import styled from 'styled-components';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
} as Meta;

const Form = styled.form`
  & .auto-complete-list {
    background: #f4f4f4;
  }

  & .auto-complete-list-item {
    padding: 4px 0;
    font-size: 1rem;
    padding-left: 8px;
  }
`

export const AutoCompleteComposition = (): JSX.Element => {
  const [value, setValue] = useState<string>('');

  const options = ['sheep', 'sherpa', 'she', 'shed']

  const onChange = (inputValue: string) => {
    setValue(inputValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    action(`I just did something with the value: ` + value)();

  }
  // Use Class names to style the list and each item
  //   const Form = styled.form`
  //   & .autocomplete-list {
  //     background: #f4f4f4;
  //   }

  //   & .autocomplete-list-item {
  //     padding: 4px 0;
  //     font-size: 1rem;
  //     padding-left: 8px;
  //   }
  // `

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
        <button type='submit'>Search/Do Things</button>
      </Form>
      <p>Current value is {value}</p>
    </>
  )
}