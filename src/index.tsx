import React from 'react';
import CreateDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

const root = document.getElementById('root');

if (!root) throw new Error('root를 찾을 수 없습니다.');

const appRoot = CreateDOM.createRoot(root);

appRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
