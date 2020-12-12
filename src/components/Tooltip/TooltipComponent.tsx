
import React, { useRef, useState } from 'react';
import { Container, Content } from './css';
import Portal from '../Portal/Portal';
import { Coords, Position, Number } from './types';
import { useTooltip } from './TooltipContainer';

interface ITooltipContent {
  preferredPosition?: Position
  closeTooltip: () => void;
  coords: Coords;
  tooltipContent: React.ReactElement;
  tooltipLabelWidth: Number;
}

const TooltipContent =
  ({
    tooltipLabelWidth,
    tooltipContent,
    preferredPosition = 'below',
    closeTooltip,
    coords
  }: ITooltipContent): JSX.Element => {
    const [width, setWidth] = useState<Number>(0)
    const childrenRef = useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
      // Grab the width of the tooltip content being passed in as tooltipContent
      setWidth(childrenRef?.current?.clientWidth)
    }, [])

    return (
      <Content
        preferredPosition={preferredPosition}
        onMouseLeave={closeTooltip}
        coords={coords}
        role='tooltip'
        aria-hidden={true}
        data-testid='tooltip-content-container'
        contentWidth={width}
        tooltipLabelWidth={tooltipLabelWidth}
      >

        {React.cloneElement(tooltipContent, {
          id: 'tooltip-content',
          ref: childrenRef
        })}
      </Content>
    );
  };

interface ITooltipComponent {
  children: React.ReactElement;
  preferredPosition?: Position;
  tooltipContent: React.ReactElement;
}

const TooltipComponent =
  ({
    children,
    preferredPosition = 'below',
    tooltipContent,
  }: ITooltipComponent): JSX.Element => {
    const { showTooltip, openTooltip, closeTooltip, coords, setCoords } = useTooltip();
    const [childWidth, setChildWidth] = useState<Number>()
    const tooltipContainerRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLElement>(null);

    React.useLayoutEffect(() => {
      // Grab the width of the tooltip children AKA the elements being labelled.
      setChildWidth(childrenRef?.current?.clientWidth);
    }, [])

    const handleOpenTooltip = () => {
      const rect = tooltipContainerRef.current?.getBoundingClientRect();

      setCoords({
        top: rect && rect.y + window.scrollY,
        left: rect && rect.x,
        bottom: rect && rect.bottom + window.scrollY,
        right: rect && rect.right,
      });

      openTooltip();
    };

    return (
      <Container
        data-testid='tooltip-container'
        onMouseLeave={closeTooltip}
        onMouseOver={handleOpenTooltip}
        ref={tooltipContainerRef}
        className='container'
        preferredPosition={preferredPosition}
      >
        {
          showTooltip &&
          <Portal portalId='tooltip-portal'>
            <TooltipContent
              preferredPosition={preferredPosition}
              closeTooltip={closeTooltip}
              coords={coords}
              tooltipContent={tooltipContent}
              tooltipLabelWidth={childWidth}
            />
          </Portal>
        }

        {React.cloneElement(children, {
          onFocus: () => handleOpenTooltip(),
          onBlur: () => closeTooltip(),
          'aria-describedby': 'tooltip-content',
          ref: childrenRef
        })}
      </Container>
    );
  };

export default TooltipComponent;
