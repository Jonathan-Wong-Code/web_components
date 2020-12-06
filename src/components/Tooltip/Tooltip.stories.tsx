import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Tooltip, { ITooltip } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as Meta;

const Template: Story<ITooltip> = (args) => (
  <>
    <div style={{ width: 300, height:1000, display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: '100px'}}>
        <Tooltip {...args}>
          <div>
            <p style={{ margin: 0 }}>Hover me hover me hover me over me hover me hover me</p>
          </div>
        </Tooltip>
      </div>
    </div>
  </>
);

export const Default = Template.bind({});
export const FromBelow = Template.bind({});
export const FromAbove = Template.bind({});
export const FromLeft = Template.bind({});
export const FromRight = Template.bind({});

Default.args = {
  tooltipContent: 
  <div style={{ background: 'grey'}}>
    <p style={{ margin: 0}}>This is the tooltip component. It Defaults to appearing from below</p>
  </div>
};

FromBelow.args = {
  tooltipContent: 
    <div style={{ background: 'grey' }}>
      <p style={{ margin: 0 }}>This is how it looks when you set preferredPosition explicitly to below.</p>,
    </div>,
  preferredPosition: 'below'
};

FromAbove.args = {
  preferredPosition: 'above',
  tooltipContent: 
    <div style={{ background: 'grey' }}>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </div>
};

FromLeft.args = {
  preferredPosition: 'left',
  tooltipContent:
    <div style={{ background: 'grey' }}>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </div>
};

FromRight.args = {
  preferredPosition: 'right',
  tooltipContent:
    <div style={{ background: 'red' }}>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </div>
};
