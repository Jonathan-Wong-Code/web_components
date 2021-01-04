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
  setInputValue: Dispatch<SetStateAction<string>>;
  setSelectedOption: Dispatch<SetStateAction<number>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  shownOptions: string[];
  labelId: string;
  numVisibleItems: number;
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
  shownOptions: [],
  labelId: '',
  numVisibleItems: 4
})

interface IAutocomplete {
  onChange: (value: string) => void;
  options: string[];
  children: React.ReactNode;
  initialValue: string;
  labelId: string;
  numVisibleItems: number;
}

export const AutoCompleteProvider = ({ options = [], onChange, children, initialValue, labelId, numVisibleItems = 4 }: IAutocomplete) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [shownOptions, setShownOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<number>(0) // For Keyboard up and down arrow
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [listScrollItemAmount, setListScrollItemAmount] = useState<number>(1);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [currentHighlightPosition, setHighlightPosition] = useState<number>(1);

  const lastItem = shownOptions.length - 1;

  React.useLayoutEffect(() => {
    const listbox = document.querySelector('.auto-complete-list') as HTMLElement;
    const selectedElement = document.querySelector('.selected') as HTMLElement;
    if (selectedElement && isFocused) {
      const totalOffsetHeight = selectedElement.offsetHeight * selectedOption + 1
      const shouldScrollDown = totalOffsetHeight > listbox.offsetHeight;
      const lastItemHighlighted = currentHighlightPosition === numVisibleItems

      if (scrollDirection === 'down') {
        setHighlightPosition(prevState => {
          if (prevState === numVisibleItems) return prevState;
          else return prevState + 1;
        })

        if (shouldScrollDown && lastItemHighlighted) {
          listbox.scrollTop = selectedElement.offsetHeight * listScrollItemAmount;
          return setListScrollItemAmount((prevState: number) => prevState + 1);
        }
      }

      if (scrollDirection === 'up') {
        if (selectedOption === lastItem) {
          listbox.scrollTop = listbox.scrollHeight;
          setHighlightPosition(numVisibleItems);
        } else {
          setHighlightPosition(prevState => {
            if (prevState === 1) return 1;
            else return prevState - 1;
          })

          if (currentHighlightPosition === 1) {
            listbox.scrollTop = selectedElement.offsetHeight * selectedOption;
            return setListScrollItemAmount((prevState: number) => prevState - 1);
          }
        }
      }
    }
  }, [selectedOption, scrollDirection, isFocused, lastItem, numVisibleItems, currentHighlightPosition])
  // We don't actually want to use listScrollItemAmount as a dependency or it is infinite render. 
  // We just care when the other fields change

  // Handles logic when the input is typed into
  const handleInputChange = useCallback((e: React.ChangeEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setShownOptions(options.filter((option: string) => option.toLowerCase().includes(inputElement.value.toLowerCase())))
    setInputValue(inputElement.value)
    setIsFocused(true)
  }, [setInputValue, setIsFocused, setShownOptions, options])

  // Keyboard logic
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const listbox = document.querySelector('.auto-complete-list') as HTMLElement;

    if (e.key === 'ArrowUp') {
      setScrollDirection('up');
      if (selectedOption === 0) {
        return setSelectedOption(lastItem)
      }

      return setSelectedOption(prevOption => prevOption - 1)
    }

    if (e.key === 'ArrowDown') {
      setScrollDirection('down');
      if (selectedOption === lastItem) {
        listbox.scrollTop = 0;
        setHighlightPosition(1);
        setListScrollItemAmount(1);
        return setSelectedOption(0);
      }

      setSelectedOption(prevOption => prevOption + 1)
    }

    if (e.key === 'Enter' && isFocused) {
      setIsFocused(false)
      setInputValue(shownOptions[selectedOption]);
      setSelectedOption(-1);
      onChange(shownOptions[selectedOption])
    }

    if (e.key === 'Escape') {
      setIsFocused(false);
    }
  }, [onChange, selectedOption, shownOptions, isFocused, lastItem])

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
    isFocused, shownOptions, labelId, numVisibleItems
  }), [
    handleInputChange, inputValue, selectedOption,
    handleKeyDown, handleOptionClick, handleBlur,
    setInputValue, setSelectedOption, setIsFocused,
    isFocused, shownOptions, labelId, numVisibleItems
  ])

  return (
    <>
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <AutoCompleteContext.Provider value={value}>
          {children}
        </AutoCompleteContext.Provider>
      </div>
    </>
  )
}

export const useAutoComplete = () => {
  const context = useContext(AutoCompleteContext);
  if (!context) {
    throw new Error("Must use AutoComplete components inside the AutoComplete provider!")
  };

  return context;
}