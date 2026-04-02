import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '@/pages/admin/LoginPage';
import { useAuthStore } from '@/store/authStore';

// Client Pages
import HomePage from '@/pages/client/HomePage';
import AboutPage from '@/pages/client/AboutPage';
import ServicesPage from '@/pages/client/ServicesPage';
import ProjectsPage from '@/pages/client/ProjectsPage';
import CareersPage from '@/pages/client/CareersPage';
import ContactPage from '@/pages/client/ContactPage';
import NotFoundPage from '@/pages/client/NotFoundPage';

// Admin Pages
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage';
import AdminClientsPage from '@/pages/admin/AdminClientsPage';
import AdminMessagesPage from '@/pages/admin/AdminMessagesPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

export default function AppRouter() {
  // Use Zustand auth state natively
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Routes>
      {/* Client Application Routes */}
      <Route path="/" element={<ClientLayout />}>
        {/* We slot the HomePage right into the root index route */}
        <Route index element={<HomePage />} /> 
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
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
        <Route path="messages" element={<AdminMessagesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
      
      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
