import React from 'react';
import styled from 'styled-components';

const Div = styled.div<{ backgroundColor: string; color: string }>`
  background-color: blue;
  color: white;

  // This is how we should be using the theme as a prop in styled-components
  border: 1px solid red;
`;

export interface IComponent {
  name?: string;
  backgroundColor?: string;
  color?: string;
  onClick: () => void;
}

export const Component = ({
  name = 'Jim',
  backgroundColor = 'blue',
  color = 'white',
  onClick,
}: IComponent): JSX.Element => {
  return (
    <>
      <Div
        backgroundColor={backgroundColor}
        color={color}
        data-testid='component'
      >
        {name}
      </Div>
      <button onClick={onClick}>Click me</button>
    </>
  );
};
