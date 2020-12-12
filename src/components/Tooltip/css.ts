import styled from 'styled-components';
import { Position, Coords, Number } from './types';

export const Container = styled.div<{ preferredPosition: Position }>`
  position: relative;

  padding-left: ${({ preferredPosition }) =>
    preferredPosition === 'left' ? '8px' : 0};
`;

const getContentPosition = (
  coords: Coords,
  contentWidth: Number,
  tooltipLabelWidth: Number,
  preferredPosition?: Position
): string => {
  // Above
  if (preferredPosition === 'above') {
    return `
      top: ${coords.top}px; 
      transform: translateY(-100%); 
      padding-bottom: 8px;
    `;
    // Left
  } else if (preferredPosition === 'left' && coords.left && contentWidth) {
    return `
      top: ${coords.top}px; 
      left: ${coords.left - contentWidth}px;
    `;
    // Right
  } else if (preferredPosition === 'right') {
    return `
      top: ${coords.top}px; 
      left: ${
        coords.left && tooltipLabelWidth && coords.left + tooltipLabelWidth
      }px;
      padding-left: 8px;
    `;
  }
  // Below
  return `
    top: ${coords.bottom}px; 
    padding-top: 8px;
  `;
};

export const Content = styled.div<{
  preferredPosition?: Position;
  coords: Coords;
  contentWidth: number | undefined;
  tooltipLabelWidth: Number;
}>`

  *, & * {
    box-sizing: border-box;
  }

  background: transparent;
  position: absolute;

  left: ${({ preferredPosition, coords }) =>
    preferredPosition === 'above' || preferredPosition === 'below'
      ? `${coords.left}px`
      : null};

  ${({ coords, preferredPosition, contentWidth, tooltipLabelWidth }) =>
    getContentPosition(
      coords,
      contentWidth,
      tooltipLabelWidth,
      preferredPosition
    )}

  border-radius: ${({ theme }) => theme.borderRadius};
`;
