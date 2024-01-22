import CreateDOM from 'react-dom/client';

import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { RecoilRoot } from 'recoil';

import { GlobalStyles, theme } from './styles';

import App from '@/App';

const queryClient = new QueryClient();

const root = document.getElementById('root');

if (!root) throw new Error('root를 찾을 수 없습니다.');

const appRoot = CreateDOM.createRoot(root);

appRoot.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>,
);
