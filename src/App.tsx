import React from 'react';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster position="top-center" />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
