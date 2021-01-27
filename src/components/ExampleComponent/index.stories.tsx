import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TestComponent, IComponent } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Component',
  component: TestComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
} as Meta;

export const Template: Story<IComponent> = (args) => {
  return <TestComponent {...args} onClick={action('hello!')} />;
};

const Example = Template.bind({});

Example.args = {
  name: 'jon',
  backgroundColor: 'blue',
  color: 'white',
};
