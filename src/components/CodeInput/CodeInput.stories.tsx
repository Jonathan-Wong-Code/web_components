import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { CodeInput } from './CodeInput';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

// Style by using the class name in the css selector.
const Form = styled.form`
  display: flex;
  gap: 4px;

 & .jw-lib-code-input {
  padding: 8px;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 8px;
 }
`;

export default {
  title: 'Forms/CodeInput',
  component: CodeInput,
} as Meta;

export const Default = (): JSX.Element => {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    action(code)()
  }, [code])

  // Style by using the class name in the css selector.
  //   const Form = styled.form`
  //   display: flex;
  //   gap: 4px;

  //  & .jw-lib-code-input {
  //   padding: 8px;
  //   width: 24px;
  //   height: 24px;
  //   text-align: center;
  //   border-radius: 8px;
  //  }
  // `;

  const onChange = (code: string) => {
    setCode(code);
  }

  return (
    <Form>
      <CodeInput size={5} onChange={onChange} defaultValue={12345} placeholder='x' />
    </Form>
  )
}