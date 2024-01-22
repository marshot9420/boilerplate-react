import { css } from '@emotion/react';

import { styles } from '@/styles';

import { responsive } from './variables';

export const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));

  ${responsive.TABLET} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  ${responsive.MOBILE} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const innerWrapper = (colGap = styles.grid.gutter) => css`
  width: ${styles.maxWidth}rem;
  padding: 0 ${colGap / 2}rem;
  margin: 0 auto;
`;

export const gridSection = (
  cols = styles.grid.column,
  rowGap = styles.grid.rowGap,
  colGap = styles.grid.gutter,
) => css`
  ${innerWrapper(colGap)};

  display: grid;
  grid-template-columns: repeat(${cols}, minmax(0, 1fr));
  row-gap: ${rowGap}rem;
  column-gap: ${colGap}rem;
`;
