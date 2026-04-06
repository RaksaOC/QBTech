import { apiJson } from './client';
import type { Job } from './types';

export function fetchJobs() {
  return apiJson<Job[]>('/api/jobs');
}

export function fetchJob(id: number) {
  return apiJson<Job>(`/api/jobs/${id}`);
}
