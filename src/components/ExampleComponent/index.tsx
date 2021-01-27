import React from 'react';
import styled from 'styled-components';
import Pineapple from '../icons/Pineapple';
const Div = styled.div<{ backgroundColor: string; color: string }>`
  background-color: ${({ theme }) => theme.colors.primaryColor};
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

export const TestComponent = ({
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
        data-testid="component"
      >
        {name}
      </Div>
      <Pineapple height={32} />
      <button onClick={onClick}>Click me</button>
    </>
  );
};
