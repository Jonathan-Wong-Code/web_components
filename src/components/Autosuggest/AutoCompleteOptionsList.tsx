import React, { useState } from 'react';
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
  maxHeight?: number | string;
  numVisibleItems?: number;
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

const UL = styled.ul<{ maxHeight: number | string }>`
  position: absolute;
  top: bottom;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: ${({ maxHeight }) => `${maxHeight}px`}
`

export const AutoCompleteOptions = ({ optionHighlightColour, numVisibleItems = 4 }: IAutoCompleteOptions): JSX.Element => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const { isFocused, shownOptions, selectedOption, handleOptionClick, labelId } = useAutoComplete();

  React.useEffect(() => {
    if (isFocused) {
      const selectedElement = document.querySelector('.selected') as HTMLElement;
      selectedElement && setMaxHeight(selectedElement.offsetHeight * numVisibleItems);
    }

  }, [numVisibleItems, isFocused])

  return (
    <UL
      className={isFocused ? 'auto-complete-list' : ''}
      id='auto-complete-list-box'
      role='listbox'
      aria-labelledby={labelId}
      maxHeight={maxHeight}
    >
      {isFocused && shownOptions.map((option, index) =>
        <StyledListItem
          isHighlighted={index === selectedOption}
          onMouseDown={() => handleOptionClick(index)}
          className={`auto-complete-list-item${index === selectedOption ? ' selected' : ''}`}
          optionHighlightColour={optionHighlightColour}
          role='option'
          id={`auto-complete-${index}`}
          data-testid='auto-complete-list-item'
          key={option}
        >
          {option}
        </StyledListItem>)}
    </UL>
  )
}






