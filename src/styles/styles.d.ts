// import original module declarations
import { primaryFont, typeScale } from './typography';

import 'styled-components';

export interface ThemeInterface {
  colors: {
    primaryColor: string;
    primaryHoverColor: string;
    primaryActiveColor: string;
    textColorOnPrimary: string;
    textColor: string;
    textColorInverted: string;
    disabled: string;
    textOnDisabled: string;
    formElementBackground: string;
    textOnFormElementBackground: string;
    status: {
      warningColor: string;
      warningColorHover: string;
      warningColorActive: string;
      errorColor: string;
      errorColorHover: string;
      errorColorActive: string;
      successColor: string;
      successColorHover: string;
      successColorActive: string;
    };
  };
  primaryFont: typeof primaryFont;
  typeScale: typeof typeScale;
}

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ThemeInterface {}
}
