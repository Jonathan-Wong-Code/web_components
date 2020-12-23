import React from 'react';

interface ICodeInput {
  size: number;
  defaultValue?: string;
  placeholder?: string;
  onChange: (code: string) => void;
}

export const CodeInput = ({ size = 5, defaultValue, placeholder, onChange }: ICodeInput) => {

  const defaultValueArray = defaultValue?.split('');

  const [inputValues, setInputValues] = React.useState(defaultValueArray ? defaultValueArray : new Array(size).fill(''));

  React.useEffect(() => {
    onChange(inputValues.join(''));
  }, [inputValues, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const element = e.target;
    const newInputValue = e.target.value;
    if (isNaN(Number(newInputValue))) return;
    setInputValues(prevState => prevState.map((currentInputValue, i) => i === index ? newInputValue : currentInputValue))

    if (element.nextSibling) (element.nextSibling as HTMLElement).focus();
  }

  return (
    <>
      {
        inputValues.map((data, index) => {
          return (
            <input
              className='codeInput'
              type='text'
              name='code'
              placeholder={placeholder}
              defaultValue={defaultValueArray ? defaultValueArray[index] : undefined}
              maxLength={1}
              onChange={e => handleChange(e, index)}
              onFocus={e => e.target.select()}
            />
          )
        })
      }
    </>
  )
}