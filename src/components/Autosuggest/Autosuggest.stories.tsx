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

const options = [
  'lamb',
  'dog',
  'doggy',
  'sherpa',
  'sheep',
  'rabbit',
  'rabies'
]

const StyledInput = styled.input`
  width: 300px;
  padding: 4px 8px;
  border-radius: 5px;
`

export const Default = (): JSX.Element => {
  const onChange = (value: string) => {
    console.log(value);
  }

  return (
    <>
      <Autocomplete options={options} onChange={onChange} />
    </>
  )
}

export const AutoCompleteComposition = (): JSX.Element => {
  const [value, setValue] = useState<string>('');

  const options = ['sheep', 'sherpa', 'she', 'sheild']

  const onChange = (value: string) => {
    console.log(value);
    setValue(value);
    action(`I just did something with the value: ` + value)();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    action(`I just did something with the value: ` + value)();
  }

  const Form = styled.form`
  & .autocomplete-list {
    background: #f4f4f4;
    border: 1px solid black;
    border-top: none;
  }

  & .autocomplete-list-item {
    padding: 4px 0;
    font-size: 1rem;
    padding-left: 8px;
  }
`

  return (
    <Form onSubmit={handleSubmit}>
      <AutoCompleteProvider onChange={onChange} options={options} initialValue={value}>
        <AutoCompleteInput>
          <StyledInput type="text" />
        </AutoCompleteInput>
        <AutoCompleteOptions optionHighlightColour={'grey'} />
      </AutoCompleteProvider>
      <button>Search/Do Things</button>
    </Form>
  )
}