import styled from 'styled-components';
import { Position, Coords } from './types';

const tooltipWidth = 250;

export const Container = styled.span`
  position: relative;
`;

const getContentPosition = (coords: Coords, preferredPosition?: Position):string => {
  if(preferredPosition === 'above') {
    return `top: ${coords.top}px; transform: translateY(-100%);`;
  } else if(preferredPosition === 'left') {
    return `
      top: ${coords.top}px; 
      left: ${coords.left - tooltipWidth}px;
    `;
  } else if(preferredPosition === 'right') {
    return `
      top: ${coords.top}px; 
      right: ${coords.left + tooltipWidth}px;
    `;
  }

  return `top: ${coords.bottom}px;`;
};

export const Content = styled.div<{preferredPosition?: Position, coords: Coords}>`
  background: transparent;
  position: absolute;

  left: ${({ preferredPosition, coords}) => 
    preferredPosition === 'above' || preferredPosition === 'below' ? `${coords.left}px` : null};

  ${({ coords, preferredPosition }) => getContentPosition(coords, preferredPosition)}
  border-radius: ${({ theme }) => theme.borderRadius};
  width: ${tooltipWidth}px;
  padding: ${({ preferredPosition }) => preferredPosition === 'left' || preferredPosition ==='right' ? '0' : '8px 0'};
  margin-
`;

export const P = styled.p`
  margin: 0;
  padding: 16px;
`
