import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Mail, LogOut } from 'lucide-react';
import { setAdminToken } from '@/api/client';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-md px-3 py-2 font-body text-sm transition-colors',
    isActive ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
  ].join(' ');

export default function AdminSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-4 py-5">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-sidebar-primary">Admin</p>
        <p className="mt-1 font-body text-xs text-sidebar-foreground/60">QBTech</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/jobs" className={linkClass}>
          <Briefcase className="h-4 w-4" />
          Jobs
        </NavLink>
        <NavLink to="/admin/applications" className={linkClass}>
          <FileText className="h-4 w-4" />
          Applications
        </NavLink>
        <NavLink to="/admin/messages" className={linkClass}>
          <Mail className="h-4 w-4" />
          Messages
        </NavLink>
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-body text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-destructive"
          onClick={() => {
            setAdminToken(null);
            window.location.href = '/admin/login';
          }}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
