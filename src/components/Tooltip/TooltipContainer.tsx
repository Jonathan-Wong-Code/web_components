import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape/useCloseOnEscape';
import { Coords } from './types';

/*************************CONTEXT**********************************/

interface ITooltipContext {
  showTooltip: boolean;
  openTooltip: () => void;
  closeTooltip: () => void;
  setCoords: (coords: Coords) => void;
  coords: Coords;
}

const TooltipContext = createContext<ITooltipContext>({
  showTooltip: false,
  coords: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  setCoords: () => null,
  openTooltip: () => null,
  closeTooltip: () => null,
});

export const useTooltip = (): ITooltipContext => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Must use tooltip components inside the tooltip container');
  }

  return context;
};

/*************************CONTAINER**********************************/
interface ITooltipContainer {
  children: React.ReactElement;
}

export const TooltipContainer = ({
  children,
}: ITooltipContainer): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState<Coords>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  const openTooltip = useCallback(() => setShowTooltip(true), []);
  const closeTooltip = useCallback(() => setShowTooltip(false), []);
  const showTooltipValue = useMemo(() => showTooltip, [showTooltip]);

  useCloseOnEscape(showTooltipValue, closeTooltip);

  const value = useMemo(
    () => ({ showTooltip, openTooltip, closeTooltip, coords, setCoords }),
    [showTooltip, closeTooltip, openTooltip, coords]
  );

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

export default TooltipContainer;
