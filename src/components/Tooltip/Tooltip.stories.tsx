import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Tooltip, { ITooltip } from './Tooltip';
import styled from 'styled-components';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as Meta;

const TooltipContent = styled.div`
  width: 250px;
  background: grey;
`

const Template: Story<ITooltip> = (args) => {
  return (
    <>
      <div style={{ width: 300, height: 1000, display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '100px' }}>
          <Tooltip {...args}>
            <div>
              <p style={{ margin: 0 }}>Tooltip Component that adheres to: </p>
              <a href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html">WCAG standards</a>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export const Default = Template.bind({});
export const FromBelow = Template.bind({});
export const FromAbove = Template.bind({});
export const FromLeft = Template.bind({});
export const FromRight = Template.bind({});

Default.args = {
  tooltipContent:
    <TooltipContent>
      <p style={{ margin: 0 }}>This is the tooltip component. It Defaults to appearing from below</p>
    </TooltipContent>
};

FromBelow.args = {
  tooltipContent:
    <TooltipContent>
      <p style={{ margin: 0 }}>This is how it looks when you set preferredPosition explicitly to below.</p>,
    </TooltipContent>,
  preferredPosition: 'below'
};

FromAbove.args = {
  preferredPosition: 'above',
  tooltipContent:
    <TooltipContent>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </TooltipContent>
};

FromLeft.args = {
  preferredPosition: 'left',
  tooltipContent:
    <TooltipContent>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </TooltipContent>
};

FromRight.args = {
  preferredPosition: 'right',
  tooltipContent:
    <TooltipContent>
      <p style={{ margin: 0 }}>This is some content. This is some content. This is some content. This is some content</p>
    </TooltipContent>
};
