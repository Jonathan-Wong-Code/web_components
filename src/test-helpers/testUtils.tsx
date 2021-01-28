import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { modernaBaseTheme } from '../styles/themes';

interface IRenderProps {
  children?: React.ReactNode;
}

const renderWithBaseProviders = ({ children }: IRenderProps): JSX.Element => {
  return <ThemeProvider theme={modernaBaseTheme}>{children}</ThemeProvider>;
};

// Use for testing basic-components and things don't need Redux/React-query
export const renderBaseProviders = (ui: React.ReactElement): RenderResult =>
  render(ui, { wrapper: renderWithBaseProviders });
