import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '@/pages/admin/LoginPage';
import { useAuthStore } from '@/store/authStore';

// Admin Pages
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage';
import AdminClientsPage from '@/pages/admin/AdminClientsPage';
import AdminStatusTrackerPage from '@/pages/admin/AdminStatusTrackerPage';
import AdminMessagesPage from '@/pages/admin/AdminMessagesPage';

// Simple Coming Soon Component (You can move this to a separate file later)
const ComingSoon = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50 text-center px-4">
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Website </h1>
      <p className="text-gray-600">Under Construction </p>
    </div>
  </div>
);

export default function AppRouter() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Routes>
      {/* Client Application Routes - Hidden for now */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ComingSoon />} />
        {/* 
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} /> 
        */}
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Application Routes (Protected) */}
      <Route 
        path="/admin" 
        element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="clients" element={<AdminClientsPage />} />
        <Route path="status-tracker" element={<AdminStatusTrackerPage />} />
        <Route path="messages" element={<AdminMessagesPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}