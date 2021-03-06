import React from 'react';

import TooltipContainer from './TooltipContainer';
import TooltipComponent from './TooltipComponent';
import { Position } from './types';

export interface ITooltip {
  children: React.ReactElement;
  preferredPosition?: Position;
  tooltipContent: React.ReactElement;
}

const ToolTip = ({
  children,
  preferredPosition = 'below',
  tooltipContent,
}: ITooltip): JSX.Element => {
  return (
    <TooltipContainer>
      <TooltipComponent
        preferredPosition={preferredPosition}
        tooltipContent={tooltipContent}
      >
        {children}
      </TooltipComponent>
    </TooltipContainer>
  );
};

export default ToolTip;
