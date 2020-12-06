
import React, { useRef } from 'react';
import { Container, Content } from './css';
import Portal from '../Portal/Portal';
import { Coords, Position } from './types';
import { useTooltip } from './TooltipContainer';

interface ITooltipContent {
  preferredPosition?: Position
  closeTooltip: () => void;
  coords: Coords;
  tooltipContent: React.ReactNode;

}

const TooltipContent =
  ({
    tooltipContent,
    preferredPosition = 'below',
    closeTooltip,
    coords
  }: ITooltipContent): JSX.Element => {
    return (
      <Content
        preferredPosition={preferredPosition}
        onMouseLeave={closeTooltip}
        coords={coords}
        role='tooltip'
        aria-hidden={true}
        data-testid='tooltip-content-container'
      >
        {tooltipContent}
      </Content>
    );
  };

interface ITooltipComponent {
  children: React.ReactElement;
  preferredPosition?: Position;
  tooltipContent: React.ReactNode;
}

const TooltipComponent =
  ({
    children,
    preferredPosition = 'below',
    tooltipContent,
  }: ITooltipComponent): JSX.Element => {
    const { showTooltip, openTooltip, closeTooltip, coords, setCoords } = useTooltip();
    const tooltipContainerRef = useRef<HTMLElement>(null);

    const handleOpenTooltip = () => {
      const rect = tooltipContainerRef.current?.getBoundingClientRect();
      console.log(rect);
      setCoords({
        top: rect && rect.y + window.scrollY,
        left: rect && rect.x,
        bottom: rect && rect.bottom + window.scrollY,
        right: rect && rect.right,
        width: rect && rect.width,
        height: rect && rect.height,
      });

      openTooltip();
    };

    return (
      <Container
        onMouseLeave={closeTooltip}
        onMouseOver={handleOpenTooltip}
        ref={tooltipContainerRef} 
        className='container'
      >
        {
          showTooltip &&
          <Portal portalId='tooltip-portal'>
            <TooltipContent
              preferredPosition={preferredPosition}
              closeTooltip={closeTooltip}
              coords={coords}
              tooltipContent={tooltipContent}
            />
          </Portal>
        }

        {React.cloneElement(children, {
          onFocus: () => handleOpenTooltip(),
          onBlur: () => closeTooltip(),
          'aria-describedby': 'tooltip-content'
        })}
      </Container>
    );
  };

export default TooltipComponent;
