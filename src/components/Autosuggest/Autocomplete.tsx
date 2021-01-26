import React, { useState } from 'react';
import styled from 'styled-components';

const Li = styled.li<{ isHighlighted: boolean }>`
  cursor: pointer;
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? 'blue' : 'transparent'};
`;

interface IAutocomplete {
  onChange: (value: string) => void;
  options: string[];
}

export const Autocomplete = ({
  options = [],
  onChange,
}: IAutocomplete): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [shownOptions, setShownOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<number>(-1); // For Keyboard up and down arrow
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Handles logic when the input is typed into
  const handleChange = (e: React.ChangeEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setShownOptions(() =>
      options.filter((option) =>
        option.toLowerCase().includes(inputElement.value.toLowerCase())
      )
    );
    setInputValue(inputElement.value);
    setIsFocused(true);
  };

  // Re-usable logic when an option is selected
  const selectOption = (optionIndex: number) => {
    setInputValue(shownOptions[optionIndex]);
    setSelectedOption(-1);
    onChange(shownOptions[optionIndex]);
  };

  // Keyboard logic
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (selectedOption === 0) {
        return setSelectedOption(shownOptions.length - 1);
      }
      return setSelectedOption((prevOption) => prevOption - 1);
    }

    if (e.key === 'ArrowDown') {
      if (selectedOption === shownOptions.length - 1) {
        return setSelectedOption(0);
      }
      setSelectedOption((prevOption) => prevOption + 1);
    }

    if (e.key === 'Enter') {
      setIsFocused(false);
      selectOption(selectedOption);
    }
  };

  const handleOptionClick = (index: number) => {
    selectOption(index);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelectedOption(-1);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {isFocused && (
        <ul>
          {shownOptions.map((option, index) => (
            <Li
              onMouseDown={() => handleOptionClick(index)}
              isHighlighted={index === selectedOption}
              key={option}
            >
              {option}
            </Li>
          ))}
        </ul>
      )}
    </div>
  );
};
