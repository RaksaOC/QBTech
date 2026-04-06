import { apiJson } from './client';
import type { LoginResponse } from './types';

export function login(email: string, password: string) {
  return apiJson<LoginResponse>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}
