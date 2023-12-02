import React from 'react';
import CreateDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import App from '@/App';
import { theme } from '@/styles';

const root = document.getElementById('root');

if (!root) throw new Error('root를 찾을 수 없습니다.');

const appRoot = CreateDOM.createRoot(root);

appRoot.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
