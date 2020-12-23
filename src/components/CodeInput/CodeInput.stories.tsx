import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { CodeInput } from './CodeInput';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Forms/CodeInput',
  component: CodeInput,
} as Meta;

export const Default = (): JSX.Element => {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    console.log(code);
  }, [code])

  const onChange = (code: string) => {
    setCode(code);
  }

  return (
    <CodeInput size={5} onChange={onChange} defaultValue='12345' placeholder='x' />
  )
}