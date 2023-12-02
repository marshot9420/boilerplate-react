const color = {
  black: '#000000',
  white: '#ffffff',
  gray: '#767676',
  lightGray: '#BDBDBD',
  red: '#ff0000',
};

export const theme = {
  color: {
    font: color.black,
    reverseFont: color.white,
    error: color.red,
  },
};

export type Theme = typeof theme;
