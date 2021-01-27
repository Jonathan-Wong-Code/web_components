import '../src/styles/reset.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/styles/themes';
import { GlobalStyle } from '../src/styles/GlobeStyle';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const withTheme = (Story, context) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];
