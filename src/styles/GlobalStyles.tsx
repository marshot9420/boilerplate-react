import { Global, css, useTheme } from '@emotion/react';

import { styles } from '@/styles';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

        html {
          font-size: 62.5%;
        }

        body {
          margin: 0;
          font-size: 160%;
          letter-spacing: 0.05em;
          line-height: 1.7;
        }

        #root {
          min-height: 100vh;
        }

        * {
          &,
          &:before,
          &:after {
            box-sizing: border-box;
          }
        }

        body,
        button,
        input,
        textarea,
        select {
          font-family: ${styles.fontFamily.kor};
        }

        a {
          color: ${theme.color.font};
          text-decoration: none;
        }

        h1 {
          font-size: ${styles.fontSize.h1}rem;
        }

        h2 {
          font-size: ${styles.fontSize.h2}rem;
        }

        h3 {
          font-size: ${styles.fontSize.h3}rem;
        }

        h4 {
          font-size: ${styles.fontSize.h4}rem;
        }

        h5 {
          font-size: ${styles.fontSize.h5}rem;
        }

        h6 {
          font-size: ${styles.fontSize.h6}rem;
        }

        small {
          color: ${theme.color.darkGray};
          font-size: ${styles.fontSize.small}rem;
        }
      `}
    />
  );
};
