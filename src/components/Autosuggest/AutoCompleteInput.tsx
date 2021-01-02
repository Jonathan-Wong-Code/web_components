import React from 'react';
import { useAutoComplete } from './AutoCompleteProvider';

interface IAutoCompleteInput {
  children: React.ReactElement;
}

export const AutoCompleteInput = ({ children }: IAutoCompleteInput) => {
  const { inputValue, handleInputChange, handleBlur, handleKeyDown, isFocused, selectedOption } = useAutoComplete();

  return (
    <div
      role='combobox'
      aria-expanded={isFocused}
      aria-controls='auto-complete-list-box'
      aria-owns='auto-complete-list-box'
      aria-haspopup='listbox'
      id='ex1-combobox'
    >
      { React.cloneElement(children, {
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        'aria-autocomplete': 'list',
        'aria-controls': 'auto-complete-list-box',
        id: 'auto-complete-combo-box',
        'aria-activedescendant': `auto-complete-${selectedOption}`
      }

      )}
    </div>
  )
}