import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';

export default {
  title: 'Hooks/useLocalStorage',
} as Meta;

export const UseLocalStorage = (): JSX.Element => {
  //@ts-ignore
  const [name, setName] = useLocalStorage('name', '');

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Enter in your name! It will saved in local storage!</p>
      <p>The name is {name} Try typing and refresh it to see it work!</p>
    </>
  );
};
