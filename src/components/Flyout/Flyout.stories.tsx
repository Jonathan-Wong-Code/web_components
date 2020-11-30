import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Flyout, IFlyout } from './Flyout';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

const InnerFlyout = styled.div`
  background: #384040;
  border: 1px solid black;
  color: #fafafa;
  width: 100%;
  font-size: 16px;
  padding: 16px;
  line-height: 1.4;
  box-shadow: 5px 5px 100px rgba(0,0,0,.5);

  @media (min-width: 768px) {
    width: 500px;
  }
`;

export default {
  title: 'Components/Flyout',
  component: Flyout,
} as Meta;

const FlyInFromLeft: Story<IFlyout> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openFlyout = () => {
    setIsOpen(true);
  };

  const closeFlyout = () =>{ 
    action('closing flyout')(); 
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openFlyout}>open me</button>
      <Flyout
        isOpen={isOpen}
        onClose={() => closeFlyout()}
        slideFrom='left'
        shadowSizeOffset={100}
      >
        <InnerFlyout>
          <h2>Innerflyout</h2>
          <p> Use the slideFrom prop to tell it which side to side in from.</p>
          <p> It can take a custom transition animation to control how the flyout comes out defaults to: .3s all ease</p>
          <p> If you are using a box-shadow, use the shadowSizeOffset prop so that the flyout can properly take it into account when offsetting itself off of the screen.</p>
          <button onClick={closeFlyout}>Close me</button>
        </InnerFlyout>
      </Flyout>
    </>
  );
};

export const FlyingInFromLeft = FlyInFromLeft.bind({});

// ************************************************************************ //

const FlyInFromRight: Story<IFlyout> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openFlyout = () => setIsOpen(true);
  const closeFlyout = () => {
    action('closing flyout')();
    setIsOpen(false);
  };

  return ( 
    <>
      <button onClick={openFlyout}>open me</button>
      <Flyout
        isOpen={isOpen}
        onClose={closeFlyout}
        slideFrom='right'
        transitionAnimation='all .2s linear'
        shadowSizeOffset={100}
      >
        <InnerFlyout>
          <h2>Innerflyout</h2>
          <p> Use the slideFrom prop to tell it which side to side in from.</p>
          <p> It can take a custom transition animation to control how the flyout comes out defaults to: .3s all ease</p>
          <p> If you are using a box-shadow, use the shadowSizeOffset prop so that the flyout can properly take it into account when offsetting itself off of the screen.</p>
          <button onClick={closeFlyout}>Close me</button>
        </InnerFlyout>
      </Flyout>
    </>
  );
};

export const FlyingInFromRight = FlyInFromRight.bind({});


