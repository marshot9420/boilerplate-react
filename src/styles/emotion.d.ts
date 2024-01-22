import '@emotion/react';
import { Theme as CustomTheme } from './themes';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
