import React, { useState, SetStateAction, createContext, useContext, useMemo, useCallback, Dispatch } from 'react';
// import styled from 'styled-components';

interface IAutoCompleteContext {
  handleInputChange: (e: React.ChangeEvent) => void;
  isFocused: boolean;
  inputValue: string;
  selectedOption: number;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleOptionClick: (index: number) => void;
  handleBlur: () => void;
  setInputValue: Dispatch<SetStateAction<string>> | (() => void);
  setSelectedOption: Dispatch<SetStateAction<number>> | (() => void);
  setIsFocused: Dispatch<SetStateAction<boolean>> | (() => void);
  shownOptions: string[];
}

const AutoCompleteContext = createContext<IAutoCompleteContext>({
  handleInputChange: (e: React.ChangeEvent) => { },
  isFocused: false,
  inputValue: '',
  selectedOption: -1,
  handleKeyDown: (e: React.KeyboardEvent) => { },
  handleOptionClick: (index: number) => { },
  handleBlur: () => { },
  setInputValue: () => { },
  setSelectedOption: () => { },
  setIsFocused: () => { },
  shownOptions: []
})

interface IAutocomplete {
  onChange: (value: string) => void;
  options: string[];
  children: React.ReactNode;
  initialValue: string;
}

export const AutoCompleteProvider = ({ options = [], onChange, children, initialValue = '' }: IAutocomplete) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [shownOptions, setShownOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<number>(-1) // For Keyboard up and down arrow
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Handles logic when the input is typed into
  const handleInputChange = useCallback((e: React.ChangeEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setShownOptions(() => options.filter((option: string) => option.toLowerCase().includes(inputElement.value.toLowerCase())))
    setInputValue(inputElement.value)
    setIsFocused(true)
  }, [setInputValue, setIsFocused, setShownOptions, options])

  // Keyboard logic
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (selectedOption === 0) {
        return setSelectedOption(shownOptions.length - 1)
      }
      return setSelectedOption(prevOption => prevOption - 1)
    }

    if (e.key === 'ArrowDown') {
      if (selectedOption === shownOptions.length - 1) {
        return setSelectedOption(0);
      }
      setSelectedOption(prevOption => prevOption + 1)
    }

    if (e.key === 'Enter') {
      setIsFocused(false)
      setInputValue(shownOptions[selectedOption]);
      setSelectedOption(-1);
      onChange(shownOptions[selectedOption])
    }
  }, [onChange, selectedOption, shownOptions])

  const handleOptionClick = useCallback((index: number) => {
    setInputValue(shownOptions[index]);
    setSelectedOption(-1);
    onChange(shownOptions[index])
  }, [onChange, shownOptions])

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setSelectedOption(-1);
  }, [])

  const value = useMemo(() => ({
    handleInputChange, inputValue, selectedOption,
    handleKeyDown, handleOptionClick, handleBlur,
    setInputValue, setSelectedOption, setIsFocused,
    isFocused, shownOptions,
  }), [
    handleInputChange, inputValue, selectedOption,
    handleKeyDown, handleOptionClick, handleBlur,
    setInputValue, setSelectedOption, setIsFocused,
    isFocused, shownOptions
  ])

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <AutoCompleteContext.Provider value={value}>
        {children}
      </AutoCompleteContext.Provider>
    </div>
  )
}

export const useAutoComplete = () => {
  const context = useContext(AutoCompleteContext);
  if (!context) {
    throw new Error("Must use AutoComplete components inside the AutoComplete provider!")
  };

  return context;
}