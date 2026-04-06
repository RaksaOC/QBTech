import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Trash2, Download } from 'lucide-react';
import { deleteAdminMessage, downloadResumeBlob, fetchApplicationsForJob } from '@/api/admin';
import { fetchJob } from '@/api/jobs';
import type { Job, MessageRow } from '@/api/types';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminJobApplicationsPage() {
  const { jobId: jobIdParam } = useParams();
  const jobId = Number(jobIdParam);
  const [job, setJob] = useState<Job | null>(null);
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    if (!Number.isFinite(jobId)) {
      setError('Invalid job');
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const [j, apps] = await Promise.all([fetchJob(jobId), fetchApplicationsForJob(jobId)]);
      setJob(j);
      setRows(apps);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    void load();
  }, [load]);

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

  if (!Number.isFinite(jobId)) {
    return <p className="font-body text-destructive">Invalid job id.</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-body text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading…
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/jobs" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        All jobs
      </Link>
      <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Applications</h1>
      <p className="mb-6 font-body text-sm text-muted-foreground">
        {job ? (
          <>
            Role: <span className="text-foreground">{job.name}</span>
          </>
        ) : (
          'Job not found'
        )}
      </p>
      {error && <p className="mb-4 font-body text-sm text-destructive">{error}</p>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-3 font-semibold text-muted-foreground">Date</th>
              <th className="p-3 font-semibold text-muted-foreground">Email</th>
              <th className="p-3 font-semibold text-muted-foreground">Name</th>
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
                <td className="p-3 max-w-sm text-muted-foreground">
                  <span className="line-clamp-4 whitespace-pre-wrap">{m.body}</span>
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
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No applications for this job yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
