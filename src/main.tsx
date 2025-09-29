import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import { App } from './App.tsx';
import { GlobalStyles } from './components/GlobalStyles.ts';
import { queryClient } from './clientApi/client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
