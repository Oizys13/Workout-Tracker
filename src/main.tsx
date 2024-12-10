import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { LatestQueryProvider } from './lib/LatestQueryContest';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LatestQueryProvider>
    <App />
    </LatestQueryProvider>
  </StrictMode>
);