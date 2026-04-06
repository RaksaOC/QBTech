import { apiFetch, apiJson, apiVoid } from './client';
import type { AdminStats, Job, MessageRow } from './types';

export function fetchAdminStats() {
  return apiJson<AdminStats>('/api/admin/stats', { auth: true });
}

export function fetchAdminJobs() {
  return apiJson<Job[]>('/api/admin/jobs', { auth: true });
}

export function createAdminJob(body: {
  name: string;
  description: string;
  department: string;
  timeType: string;
  location?: string | null;
}) {
  return apiJson<Job>('/api/admin/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    auth: true,
  });
}

export function updateAdminJob(
  id: number,
  body: Partial<{
    name: string;
    description: string;
    department: string;
    timeType: string;
    location: string | null;
  }>
) {
  return apiJson<Job>(`/api/admin/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    auth: true,
  });
}

export function deleteAdminJob(id: number) {
  return apiVoid(`/api/admin/jobs/${id}`, { method: 'DELETE', auth: true });
}

export function fetchAdminMessages(kind?: 'contact' | 'application') {
  const q = kind ? `?kind=${encodeURIComponent(kind)}` : '';
  return apiJson<MessageRow[]>(`/api/admin/messages${q}`, { auth: true });
}

export function fetchAdminApplications() {
  return apiJson<MessageRow[]>('/api/admin/applications', { auth: true });
}

export function fetchApplicationsForJob(jobId: number) {
  return apiJson<MessageRow[]>(`/api/admin/jobs/${jobId}/applications`, { auth: true });
}

export function deleteAdminMessage(id: number) {
  return apiVoid(`/api/admin/messages/${id}`, { method: 'DELETE', auth: true });
}

export async function downloadResumeBlob(messageId: number): Promise<Blob> {
  const res = await apiFetch(`/api/admin/messages/${messageId}/resume`, { auth: true });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? res.statusText);
  }
  return res.blob();
}
