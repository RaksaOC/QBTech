const base = import.meta.env.VITE_API_URL ?? '';

const TOKEN_KEY = 'qbtech_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch(
  path: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<Response> {
  const { auth, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (auth) {
    const t = getAdminToken();
    if (t) {
      headers.set('Authorization', `Bearer ${t}`);
    }
  }
  const res = await fetch(`${base}${path}`, { ...rest, headers });
  return res;
}

export async function apiJson<T>(path: string, init?: RequestInit & { auth?: boolean }): Promise<T> {
  const res = await apiFetch(path, init);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, body.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function apiVoid(path: string, init?: RequestInit & { auth?: boolean }): Promise<void> {
  const res = await apiFetch(path, init);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, body.error ?? res.statusText);
  }
}
