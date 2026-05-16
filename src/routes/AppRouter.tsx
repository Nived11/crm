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
import AdminRecyclebinPage from '@/pages/admin/AdminRecyclebinPage';

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
      </Route>

      {/* Auth Routes (Protected from already logged-in users) */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage />} 
      />

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
        <Route path="recycle-bin" element={<AdminRecyclebinPage />} /> 
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}