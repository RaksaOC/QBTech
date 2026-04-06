import type { MessageRow } from './types';

export type SubmitMessageInput = {
  email: string;
  name?: string;
  message: string;
  jobId?: number | null;
  resume?: File | null;
};

export async function submitMessage(input: SubmitMessageInput): Promise<MessageRow> {
  const fd = new FormData();
  fd.set('email', input.email);
  if (input.name) {
    fd.set('name', input.name);
  }
  fd.set('message', input.message);
  if (input.jobId != null && input.jobId !== undefined) {
    fd.set('jobId', String(input.jobId));
  }
  if (input.resume) {
    fd.set('resume', input.resume);
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/messages`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? res.statusText);
  }
  return res.json() as Promise<MessageRow>;
}
