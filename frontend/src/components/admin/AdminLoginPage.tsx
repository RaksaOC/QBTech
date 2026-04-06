import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { login } from '@/api/auth';
import { getAdminToken, setAdminToken } from '@/api/client';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(email, password);
      setAdminToken(res.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-glow-sm">
        <h1 className="mb-6 font-display text-2xl font-bold text-foreground">Admin sign in</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="admin-email" className="mb-1 block font-body text-xs uppercase tracking-wider text-muted-foreground">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-input bg-background px-4 py-2.5 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block font-body text-xs uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border border-input bg-background px-4 py-2.5 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {error && <p className="font-body text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="gradient-btn flex items-center justify-center gap-2 rounded-sm py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
