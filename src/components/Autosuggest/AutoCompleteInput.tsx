import React from 'react';
import { useAutoComplete } from './AutoCompleteProvider';

interface IAutoCompleteInput {
  children: React.ReactElement;
}

export const AutoCompleteInput = ({ children }: IAutoCompleteInput) => {
  const { inputValue, handleInputChange, handleBlur, handleKeyDown } = useAutoComplete();

  console.log(inputValue)

  return (
    React.cloneElement(children, {
      value: inputValue,
      onChange: handleInputChange,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown
    })
  )
}