import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/client/Navbar';
import { Footer } from '@/components/client/Footer';
import { Toaster } from '@/components/ui/Toaster';

const ClientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-brand/30">
      <Navbar />
      
      {/* Main Content using Outlet for nested routes */}
      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ClientLayout;
