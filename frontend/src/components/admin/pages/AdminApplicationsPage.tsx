import { useCallback, useEffect, useState } from 'react';
import { Loader2, Trash2, Download } from 'lucide-react';
import { deleteAdminMessage, downloadResumeBlob, fetchAdminApplications, fetchAdminJobs } from '@/api/admin';
import type { Job, MessageRow } from '@/api/types';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminApplicationsPage() {
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [apps, jobList] = await Promise.all([fetchAdminApplications(), fetchAdminJobs()]);
      setRows(apps);
      setJobs(jobList);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function jobTitle(id: number | null) {
    if (id == null) {
      return '—';
    }
    return jobs.find((j) => j.id === id)?.name ?? `#${id}`;
  }

  async function onDelete(id: number) {
    if (!window.confirm('Delete this application?')) {
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      await deleteAdminMessage(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusyId(null);
    }
  }

  async function onDownload(id: number) {
    setBusyId(id);
    setError(null);
    try {
      const blob = await downloadResumeBlob(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${id}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed');
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-body text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading applications…
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Applications</h1>
      <p className="mb-6 font-body text-sm text-muted-foreground">Job applications submitted from the careers flow.</p>
      {error && <p className="mb-4 font-body text-sm text-destructive">{error}</p>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[800px] border-collapse text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-3 font-semibold text-muted-foreground">Date</th>
              <th className="p-3 font-semibold text-muted-foreground">Email</th>
              <th className="p-3 font-semibold text-muted-foreground">Name</th>
              <th className="p-3 font-semibold text-muted-foreground">Job</th>
              <th className="p-3 font-semibold text-muted-foreground">Message</th>
              <th className="p-3 font-semibold text-muted-foreground">Resume</th>
              <th className="p-3 font-semibold text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-b border-border/60 align-top hover:bg-muted/20">
                <td className="p-3 text-muted-foreground whitespace-nowrap">{formatDate(m.createdAt)}</td>
                <td className="p-3 text-foreground">{m.email}</td>
                <td className="p-3 text-muted-foreground">{m.name ?? '—'}</td>
                <td className="p-3 text-muted-foreground">{jobTitle(m.jobId)}</td>
                <td className="p-3 max-w-xs text-muted-foreground">
                  <span className="line-clamp-3">{m.body}</span>
                </td>
                <td className="p-3">
                  {m.resumePath ? (
                    <button
                      type="button"
                      disabled={busyId === m.id}
                      onClick={() => onDownload(m.id)}
                      className="inline-flex items-center gap-1 text-primary hover:underline disabled:opacity-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <button
                    type="button"
                    disabled={busyId === m.id}
                    onClick={() => onDelete(m.id)}
                    className="inline-flex rounded p-2 text-muted-foreground hover:bg-muted hover:text-destructive disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
