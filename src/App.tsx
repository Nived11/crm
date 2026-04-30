import React from 'react';
import AppRouter from './routes/AppRouter';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <>
     <Toaster position="top-center" />
      <AppRouter />
    </>
     
  );
}

export default App;
