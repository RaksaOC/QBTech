import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Pencil, Trash2, Users } from 'lucide-react';
import { createAdminJob, deleteAdminJob, fetchAdminJobs, updateAdminJob } from '@/api/admin';
import type { Job } from '@/api/types';

const emptyForm = {
  name: '',
  description: '',
  department: '',
  timeType: 'Full-time',
  location: '',
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoadError(null);
    try {
      const rows = await fetchAdminJobs();
      setJobs(rows);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startEdit(job: Job) {
    setEditingId(job.id);
    setForm({
      name: job.name,
      description: job.description,
      department: job.department,
      timeType: job.timeType,
      location: job.location ?? '',
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      if (editingId !== null) {
        await updateAdminJob(editingId, {
          name: form.name,
          description: form.description,
          department: form.department,
          timeType: form.timeType,
          location: form.location.trim() || null,
        });
      } else {
        await createAdminJob({
          name: form.name,
          description: form.description,
          department: form.department,
          timeType: form.timeType,
          location: form.location.trim() || null,
        });
      }
      cancelEdit();
      await load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: number) {
    if (!window.confirm('Delete this job? Applications stay in the database but lose the job link.')) {
      return;
    }
    setLoadError(null);
    try {
      await deleteAdminJob(id);
      await load();
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-body text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading jobs…
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Jobs</h1>
      <p className="mb-6 font-body text-sm text-muted-foreground">Create and manage open roles shown on the careers page.</p>
      {loadError && <p className="mb-4 font-body text-sm text-destructive">{loadError}</p>}

      <form onSubmit={onSubmit} className="mb-10 rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">{editingId !== null ? 'Edit job' : 'New job'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
            Department
            <input
              required
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
            Time
            <input
              required
              placeholder="e.g. Full-time"
              value={form.timeType}
              onChange={(e) => setForm({ ...form, timeType: e.target.value })}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
            Location
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          <label className="md:col-span-2 flex flex-col gap-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
            Description
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="resize-none rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
        </div>
        {saveError && <p className="mt-3 font-body text-sm text-destructive">{saveError}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={saving}
            className="gradient-btn inline-flex items-center gap-2 rounded-sm px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {editingId !== null ? 'Save changes' : 'Create job'}
          </button>
          {editingId !== null && (
            <button type="button" onClick={cancelEdit} className="rounded-sm border border-border px-5 py-2 font-body text-sm text-foreground hover:bg-muted/40">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-3 font-semibold text-muted-foreground">Role</th>
              <th className="p-3 font-semibold text-muted-foreground">Dept</th>
              <th className="p-3 font-semibold text-muted-foreground">Time</th>
              <th className="p-3 font-semibold text-muted-foreground">Location</th>
              <th className="p-3 font-semibold text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b border-border/60 hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{j.name}</td>
                <td className="p-3 text-muted-foreground">{j.department}</td>
                <td className="p-3 text-muted-foreground">{j.timeType}</td>
                <td className="p-3 text-muted-foreground">{j.location ?? '—'}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      to={`/admin/jobs/${j.id}/applications`}
                      className="inline-flex rounded p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                      title="Applications"
                    >
                      <Users className="h-4 w-4" />
                    </Link>
                    <button type="button" className="inline-flex rounded p-2 text-muted-foreground hover:bg-muted hover:text-primary" title="Edit" onClick={() => startEdit(j)}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" className="inline-flex rounded p-2 text-muted-foreground hover:bg-muted hover:text-destructive" title="Delete" onClick={() => onDelete(j.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No jobs yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
