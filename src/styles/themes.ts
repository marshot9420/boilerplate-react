const color = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#767676',
  dark: '#333',
  lightGray: '#BDBDBD',
  darkGray: '#767676',
  dimGray: '#EDEDEF',
  dimBeige: '#F9F9F7',

  red: '#FF0000',

  coral: '#F55353',

  mediumSeaGreen: '#3CB371',
  hexGold: '#FFD700',
};

export const theme = {
  color: {
    primary: color.coral,

    font: color.black,
    fontReverse: color.white,
    reverseFont: color.white,
    error: color.red,
    background: color.white,
    surface: color.dimBeige,

    lightGray: color.lightGray,
    gray: color.gray,
    darkGray: color.darkGray,
    white: color.white,

    layoutBorderColor: color.gray,

    buttonActive: color.dark,
    buttonActiveReverse: color.dimGray,

    black: color.black,

    inputBorder: color.lightGray,

    userActive: color.mediumSeaGreen,
    userPending: color.lightGray,
    userDeniend: color.red,
    userInActive: color.black,
    userWithDrawal: color.hexGold,
  },
};

export type Theme = typeof theme;
