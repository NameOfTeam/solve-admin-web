import '@emotion/react';

declare module '@emotion/react' {
  interface Theme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      bold: number;
    };
  }
}
