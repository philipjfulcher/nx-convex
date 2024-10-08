import { ConvexAuthProvider } from '@convex-dev/auth/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { ConvexReactClient } from 'convex/react';
// import "./index.css";

import App from './app/App';
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <ConvexAuthProvider client={convex}>
        <App />
      </ConvexAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
