export const remToPx = 10;
export const pxToRem = 1 / remToPx;

export const BREAKPOINT_NAME = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
};

export const breakpoint = {
  [BREAKPOINT_NAME.DESKTOP]: 120,
  [BREAKPOINT_NAME.TABLET]: 76.8,
  [BREAKPOINT_NAME.MOBILE]: 36,
};

export const maxWidth = breakpoint[BREAKPOINT_NAME.DESKTOP];

export const responsive = {
  [BREAKPOINT_NAME.TABLET]: `@media (max-width: ${
    breakpoint[BREAKPOINT_NAME.DESKTOP] * remToPx - 1
  }px) and (min-width: ${breakpoint[BREAKPOINT_NAME.TABLET] * remToPx}px)`,

  [BREAKPOINT_NAME.MOBILE]: `@media (max-width: ${
    breakpoint[BREAKPOINT_NAME.TABLET] * remToPx - 1
  }px)`,
};

export const grid = {
  column: 12,
  gutter: 2.4,
  rowGap: 6.4,
};

export const fontSize = {
  h1: 4.8,
  h2: 4,
  h3: 2.8,
  h4: 2.4,
  h5: 2,
  h6: 1.6,
  large: 1.8,
  normal: 1.6,
  small: 1.4,
  xsmall: 1.3,
};

export const border = {
  level1: 0.1,
  level2: 0.2,
};

export const fontFamily = {
  kor: 'Noto Sans KR',
  eng: 'Playfair Display',
};

export const space = {
  level1: 0.4,
  level2: 0.8,
  level3: 1.2,
  level4: 1.6,
  level5: 2.4,
  level6: 2.8,
  level7: 3.2,
  level8: 3.6,
  level9: 4,
};

export const fontWeight = {
  light: 300,
  regular: 400,
  bold: 700,
  black: 900,
};

export const component = {
  header: {
    height: 5.6,
    topTransition: 'transition: top 0.3s ease;',
  },
  table: {
    itemPadding: space.level5,
  },
};

export const transition = {
  button: 'transition: all 0.15s ease-out;',
};
