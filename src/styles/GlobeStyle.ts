// For use in React storybook.

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
  font-size: 1rem;
}

body {
  line-height: 1.5;
  margin: 0;
}

a,
a:visited,
a:hover {
  text-decoration: none;
  color: inherit;
}

img {
  display: block;
  width: 100%;
}

`;
