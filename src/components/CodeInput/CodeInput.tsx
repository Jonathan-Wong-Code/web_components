import React, { useEffect, useState, ChangeEvent } from 'react';
import { ScreenReaderText } from '../ScreenReaderText/ScreenReaderText';
interface ICodeInput {
  size: number;
  defaultValue?: string;
  placeholder?: string;
  onChange: (code: string) => void;
}

export const CodeInput = ({ size = 5, defaultValue, placeholder, onChange }: ICodeInput) => {

  const defaultValueArray = defaultValue?.split('');
  const [inputValues, setInputValues] = useState(defaultValueArray ? defaultValueArray : new Array(size).fill(''));

  useEffect(() => {
    onChange(inputValues.join(''));
  }, [inputValues, onChange])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const element = e.target;
    const newInputValue = e.target.value;

    if (isNaN(Number(newInputValue))) return;

    setInputValues(prevState => prevState.map((currentInputValue, i) => i === index ? newInputValue : currentInputValue))

    //@ts-ignore
    if (element.nextSibling && e.nativeEvent.inputType !== "deleteContentBackward") {
      (element.nextSibling as HTMLElement).focus();
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const element = e.target as HTMLElement;

    if (e.key === inputValues[index]) {
      e.preventDefault(); // Prevents handlechange from firing if the same number is entered and we just focus next input
      (element.nextSibling as HTMLElement).focus();
    }

    if (e.key === 'ArrowRight') {
      if (element.nextSibling) {
        setTimeout(() => (element.nextSibling as HTMLElement).focus(), 0);
      }
    }

    if (e.key === 'ArrowLeft') {
      setTimeout(() => (element.previousSibling?.previousSibling as HTMLElement).focus(), 0)
    }

    if (e.key === 'ArrowUp') e.preventDefault();

    if (e.key === 'ArrowDown') e.preventDefault();
  }

  return (
    <>
      {
        inputValues.map((data, index) => {
          return (
            <>
              <label htmlFor={`code-input-${index}`}>
                <ScreenReaderText>
                  Enter number at position {index + 1}
                </ScreenReaderText>
              </label>
              <input
                className='codeInput'
                type='text'
                name='code'
                id={`code-input-${index}`}
                placeholder={placeholder}
                defaultValue={defaultValueArray ? defaultValueArray[index] : undefined}
                maxLength={1}
                value={data}
                onChange={e => handleChange(e, index)}
                onFocus={e => e.target.select()}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            </>
          )
        })
      }
    </>
  )
}