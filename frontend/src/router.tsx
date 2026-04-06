import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/components/pages/home/HomePage';
import AboutPage from '@/components/pages/about/AboutPage';
import CareersPage from '@/components/pages/careers/CareersPage';
import JobApplyPage from '@/components/pages/careers/JobApplyPage';
import AdminRoot from '@/components/admin/AdminRoot';
import AdminLoginPage from '@/components/admin/AdminLoginPage';
import ProtectedAdminLayout from '@/components/admin/ProtectedAdminLayout';
import AdminDashboardPage from '@/components/admin/pages/AdminDashboardPage';
import AdminJobsPage from '@/components/admin/pages/AdminJobsPage';
import AdminApplicationsPage from '@/components/admin/pages/AdminApplicationsPage';
import AdminMessagesPage from '@/components/admin/pages/AdminMessagesPage';
import AdminJobApplicationsPage from '@/components/admin/pages/AdminJobApplicationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'careers/apply/:jobId', element: <JobApplyPage /> },
    ],
  },
  {
    path: 'admin',
    element: <AdminRoot />,
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: <ProtectedAdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'jobs', element: <AdminJobsPage /> },
          { path: 'jobs/:jobId/applications', element: <AdminJobApplicationsPage /> },
          { path: 'applications', element: <AdminApplicationsPage /> },
          { path: 'messages', element: <AdminMessagesPage /> },
        ],
      },
    ],
  },
]);
