import React, { useEffect, useState, ChangeEvent } from 'react';
import { ScreenReaderText } from '../ScreenReaderText/ScreenReaderText';
interface ICodeInput {
  size: number;
  defaultValue?: number;
  placeholder?: string;
  onChange: (code: string) => void;
}

export const CodeInput = ({
  size = 5,
  defaultValue,
  placeholder,
  onChange,
}: ICodeInput): JSX.Element => {
  const defaultValueArray = defaultValue?.toString().split('');
  const [inputValues, setInputValues] = useState(
    defaultValueArray ? defaultValueArray : new Array(size).fill('')
  );

  useEffect(() => {
    onChange(inputValues.join(''));
  }, [inputValues, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const element = e.target;
    const newInputValue = e.target.value;

    if (isNaN(Number(newInputValue))) return; // If input is not number do nothing.

    // If the indexes match, update that particular array input value.
    const updateInputValue = (currentInputValue: number, i: number) => {
      return i === index ? newInputValue : currentInputValue;
    };

    setInputValues((prevState) => prevState.map(updateInputValue));

    const nextInput = element.parentNode?.nextSibling?.firstChild?.nextSibling;

    //@ts-ignore
    if (nextInput && e.nativeEvent.inputType !== 'deleteContentBackward') {
      (nextInput as HTMLElement).focus();
    }
  };

  // For left and right arrow navigation.
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const element = e.target as HTMLElement;
    const nextInput = element.parentNode?.nextSibling?.firstChild?.nextSibling;
    const previousInput =
      element?.parentNode?.previousSibling?.firstChild?.nextSibling;

    if (e.key === inputValues[index] && nextInput) {
      e.preventDefault(); // Prevents handlechange from firing if the same number is entered and we just focus next input
      (nextInput as HTMLElement).focus();
    }

    if (e.key === 'ArrowRight' && nextInput) {
      // Navigate back up to div, to next div and then to the input.
      const nextInput =
        element.parentNode?.nextSibling?.firstChild?.nextSibling;
      setTimeout(() => (nextInput as HTMLElement).focus(), 0);
    }

    if (e.key === 'ArrowLeft' && previousInput) {
      // Up to parent div, back to the previous div and focus in the input.
      setTimeout(() => (previousInput as HTMLElement).focus(), 0);
    }

    if (e.key === 'ArrowUp') e.preventDefault();

    if (e.key === 'ArrowDown') e.preventDefault();
  };

  // On paste handler

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pastedCode = e.clipboardData.getData('text').split('');

    const newInputValues = [...inputValues];

    for (let i = 0; i < size - 1; i++) {
      const currentInpueValueIndex = index + i;

      if (currentInpueValueIndex <= size - 1) {
        newInputValues[currentInpueValueIndex] = pastedCode[i];
      }
    }

    setInputValues(newInputValues);
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <>
      {inputValues.map((data, index) => {
        return (
          <div
            key={`code-input-${index}`}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <label htmlFor={`code-input-${index}`}>
              <ScreenReaderText>
                Enter code number at position {index + 1}
              </ScreenReaderText>
            </label>
            <input
              className="jw-lib-code-input"
              type="text"
              name="code"
              data-testid="code-input"
              id={`code-input-${index}`}
              placeholder={placeholder}
              maxLength={1}
              value={data}
              onPaste={(e) => handlePaste(e, index)}
              onChange={(e) => handleChange(e, index)}
              onFocus={(e) => e.target.select()}
            />
          </div>
        );
      })}
    </>
  );
};
