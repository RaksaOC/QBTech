import { Navigate, Outlet } from 'react-router-dom';
import { getAdminToken } from '@/api/client';
import AdminSidebar from './AdminSidebar';

export default function ProtectedAdminLayout() {
  const token = getAdminToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="min-h-screen flex-1 overflow-auto border-l border-border bg-card/20 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
