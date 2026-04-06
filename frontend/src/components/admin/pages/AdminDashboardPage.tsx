import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Mail, Loader2 } from 'lucide-react';
import { fetchAdminStats } from '@/api/admin';
import type { AdminStats } from '@/api/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await fetchAdminStats();
        if (!cancelled) {
          setStats(s);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-body text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading dashboard…
      </div>
    );
  }

  if (error || !stats) {
    return <p className="font-body text-destructive">{error ?? 'No data'}</p>;
  }

  const cards = [
    { label: 'Open jobs', value: stats.jobs, icon: Briefcase, to: '/admin/jobs' },
    { label: 'Applications', value: stats.applications, icon: FileText, to: '/admin/applications' },
    { label: 'Contact messages', value: stats.messages, icon: Mail, to: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mb-8 font-body text-sm text-muted-foreground">Overview of careers and inbox activity.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-glow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
              <Icon className="h-5 w-5 text-primary/80 transition-transform group-hover:scale-110" />
            </div>
            <p className="font-display text-3xl font-bold text-foreground">{value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
