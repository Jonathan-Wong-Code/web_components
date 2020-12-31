import React from 'react';
import { useAutoComplete } from './AutoCompleteProvider';
import styled from 'styled-components';

interface IAutoCompleteOptionsItem {
  children: React.ReactElement;
  index: number;
  highlightColour: string;
}

export const AutoCompleteOptionsItem = ({
  children,
  index,
  highlightColour = 'transparent'
}: IAutoCompleteOptionsItem): JSX.Element => {
  const { selectedOption, handleOptionClick } = useAutoComplete();
  const isHighlighted = index === selectedOption;

  return React.cloneElement(children, {
    onMouseDown: () => handleOptionClick(index),
    style: {
      backgroundColour: isHighlighted ? highlightColour : 'transparent'
    }
  })
}

interface IAutoCompleteOptions {
  optionHighlightColour: string;
}

const StyledListItem = styled.li<{ isHighlighted: boolean, optionHighlightColour: string }>`
  cursor: pointer;
  background-color: 
    ${({ isHighlighted, optionHighlightColour }) => isHighlighted ? optionHighlightColour : 'transparent'};
  list-style-type: none;

  &:hover {
    background-color: ${({ optionHighlightColour }) => optionHighlightColour};
  }
`

const UL = styled.ul`
  position: absolute;
  top: bottom;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
`

export const AutoCompleteOptions = ({ optionHighlightColour }: IAutoCompleteOptions): JSX.Element => {
  const { isFocused, shownOptions, selectedOption, handleOptionClick } = useAutoComplete();

  return (
    <UL className={isFocused ? 'autocomplete-list' : ''}>
      {isFocused && shownOptions.map((option, index) =>
        <StyledListItem
          isHighlighted={index === selectedOption}
          onMouseDown={() => handleOptionClick(index)}
          className='autocomplete-list-item'
          optionHighlightColour={optionHighlightColour}
        >
          {option}
        </StyledListItem>)}
    </UL>
  )
}






